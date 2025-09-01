const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files from uploads directory
app.use('/uploads', express.static(uploadsDir));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'MONGODB_URI=mongodb+srv://bharathimygapula19:UxB1xisrGtrNjlqz@cluster0.sksraem.mongodb.net/lostfound?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

// Post Schema
const postSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  question: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['lost', 'found']
  },
  imageUrl: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);

// Add this Response Schema after your Post Schema
const responseSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  postOwnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  responderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  responderName: {
    type: String,
    required: true
  },
  responderEmail: {
    type: String,
    required: true
  },
  securityAnswer: {
    type: String,
    required: true,
    trim: true
  },
  responseType: {
    type: String,
    enum: ['found', 'contact'],
    default: 'found'
  },
  status: {
  type: String,
  enum: ['accepted', 'pending', 'rejected'], // Changed from 'accept' and 'reject'
  default: 'pending'
},
  itemName: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Response = mongoose.model('Response', responseSchema);

// Add these routes after your existing routes



// Routes
// Create a new post
app.post('/api/posts', upload.single('file'), async (req, res) => {
  try {
    const { itemName, description, question, category, userId, userName, userEmail } = req.body;

    const postData = {
      itemName,
      description,
      question,
      category,
      userId,
      userName,
      userEmail
    };

    // Add image URL if file was uploaded
    if (req.file) {
      postData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const post = new Post(postData);
    await post.save();

    res.status(201).json({
      message: 'Post created successfully',
      post: post
    });

  } catch (error) {
    console.error('Post creation error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join('. ') });
    }
    
    res.status(500).json({ message: 'Server error during post creation' });
  }
});

// Get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: 'Posts retrieved successfully',
      posts: posts
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server error while fetching posts' });
  }
});

app.delete('/api/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully', post: deletedPost });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Server error while deleting post' });
  }
});

// Auth routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user
    const user = new User({
      firstName,
      lastName,
      phoneNumber,
      email,
      password
    });

    await user.save();

    // Return user without password
    const userResponse = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      createdAt: user.createdAt
    };

    res.status(201).json({
      message: 'User created successfully',
      user: userResponse
    });

  } catch (error) {
    console.error('Signup error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join('. ') });
    }
    
    res.status(500).json({ message: 'Server error during signup' });
  }
});

// Sign In route
app.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Return user without password
    const userResponse = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      createdAt: user.createdAt
    };

    res.status(200).json({
      message: 'Sign in successful',
      user: userResponse,
      token: 'dummy-jwt-token' // You can implement proper JWT later
    });

  } catch (error) {
    console.error('Sign in error:', error);
    res.status(500).json({ message: 'Server error during sign in' });
  }
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong!' });
});



// Create a new response
app.post('/api/responses', async (req, res) => {
  try {
    const { 
      postId, 
      postOwnerId, 
      responderId, 
      responderName, 
      responderEmail, 
      securityAnswer, 
      responseType, 
      itemName 
    } = req.body;

    // Check if user already responded to this post
    const existingResponse = await Response.findOne({ 
      postId, 
      responderId 
    });

    if (existingResponse) {
      return res.status(400).json({ 
        message: 'You have already responded to this item.' 
      });
    }

    const response = new Response({
      postId,
      postOwnerId,
      responderId,
      responderName,
      responderEmail,
      securityAnswer,
      responseType,
      itemName
    });

    await response.save();

    res.status(201).json({
      success: true,
      message: 'Response submitted successfully',
      response: response
    });

  } catch (error) {
    console.error('Response creation error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join('. ') });
    }
    
    res.status(500).json({ message: 'Server error during response creation' });
  }
});

// Get responses for a specific user (post owner)
// Get responses for a specific user (post owner) - updated route
app.get('/api/responses/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const responses = await Response.find({ postOwnerId: userId })
      .sort({ createdAt: -1 })
      .populate('postId', 'itemName category')
      .populate('responderId', 'firstName lastName email');

    res.status(200).json({
      message: 'Responses retrieved successfully',
      responses: responses
    });

  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({ message: 'Server error while fetching responses' });
  }
});

// Get responses made by a specific user (responder)
app.get('/api/responses/responder/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const responses = await Response.find({ responderId: userId })
      .sort({ createdAt: -1 })
      .populate('postId', 'itemName category')
      .populate('postOwnerId', 'firstName lastName email');

    // Map the responses to include owner information
    const mappedResponses = responses.map(response => ({
      ...response.toObject(),
      ownerName: response.postOwnerId ? `${response.postOwnerId.firstName} ${response.postOwnerId.lastName}` : 'Unknown',
      ownerEmail: response.postOwnerId ? response.postOwnerId.email : 'Unknown'
    }));

    res.status(200).json({
      message: 'Responder responses retrieved successfully',
      responses: mappedResponses
    });

  } catch (error) {
    console.error('Error fetching responder responses:', error);
    res.status(500).json({ message: 'Server error while fetching responder responses' });
  }
});

// Accept a response
// Accept a response - CORRECTED VERSION
app.patch('/api/responses/:responseId/accept', async (req, res) => {
  try {
    const { responseId } = req.params;
    
    const response = await Response.findByIdAndUpdate(
      responseId,
      { status: 'accepted' },
      { new: true }
    );

    if (!response) {
      return res.status(404).json({ message: 'Response not found' });
    }

    
    res.json({ 
      success: true, 
      message: 'Response accepted successfully',
      response 
    });

  } catch (error) {
    console.error('Error accepting response:', error);
    res.status(500).json({ message: 'Server error while accepting response' });
  }
});

// Reject a response
app.patch('/api/responses/:responseId/reject', async (req, res) => {
  try {
    const { responseId } = req.params;
    
    const response = await Response.findByIdAndUpdate(
      responseId,
      { status: 'rejected' },
      { new: true }
    );

    if (!response) {
      return res.status(404).json({ message: 'Response not found' });
    }

    res.status(200).json({
      message: 'Response rejected successfully',
      response: response
    });

  } catch (error) {
    console.error('Error rejecting response:', error);
    res.status(500).json({ message: 'Server error while rejecting response' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });
  
  mongoose.connection.on('error', (err) => {
    console.log('MongoDB connection error:', err);
  });
});