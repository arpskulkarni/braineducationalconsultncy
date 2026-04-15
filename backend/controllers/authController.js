const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assuming User model is in models/User.js

// Your secret key for JWT
const JWT_SECRET = 'your_jwt_secret'; // Change this to a strong secret

// Signup
exports.signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error creating user', error });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send({ message: 'Error logging in', error });
    }
};

// Logout
exports.logout = (req, res) => {
    // Assuming you handle logout in the client-side by removing the token
    res.status(200).send({ message: 'Logged out successfully' });
};

// Middleware to verify token
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).send({ message: 'Token is required' });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        req.userId = decoded.userId;
        next();
    });
};