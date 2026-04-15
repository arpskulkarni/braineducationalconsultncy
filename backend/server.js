// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/your-db-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Basic routes for authentication
app.use('/api/auth', require('./routes/auth'));

// Basic routes for clients
app.use('/api/clients', require('./routes/clients'));

// Basic routes for consultants
app.use('/api/consultants', require('./routes/consultants'));

// Basic routes for employers
app.use('/api/employers', require('./routes/employers'));

// Basic routes for projects
app.use('/api/projects', require('./routes/projects'));

// Basic routes for job descriptions
app.use('/api/job-descriptions', require('./routes/jobDescriptions'));

// Basic routes for resumes
app.use('/api/resumes', require('./routes/resumes'));

// Basic routes for activity logs
app.use('/api/activity-logs', require('./routes/activityLogs'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});