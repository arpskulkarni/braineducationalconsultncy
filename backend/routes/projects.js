// routes/projects.js

const express = require('express');
const router = express.Router();

// Mock database
let projects = [];

// Create a project
router.post('/', (req, res) => {
    const { name, description } = req.body;
    const newProject = { id: projects.length + 1, name, description, status: 'new', assignments: [] };
    projects.push(newProject);
    res.status(201).json(newProject);
});

// Read all projects
router.get('/', (req, res) => {
    res.status(200).json(projects);
});

// Read a project by ID
router.get('/:id', (req, res) => {
    const project = projects.find(p => p.id === parseInt(req.params.id));
    if (!project) return res.status(404).send('Project not found');
    res.status(200).json(project);
});

// Update a project
router.put('/:id', (req, res) => {
    const project = projects.find(p => p.id === parseInt(req.params.id));
    if (!project) return res.status(404).send('Project not found');
    const { name, description, status } = req.body;
    project.name = name;
    project.description = description;
    project.status = status;
    res.status(200).json(project);
});

// Delete a project
router.delete('/:id', (req, res) => {
    const projectIndex = projects.findIndex(p => p.id === parseInt(req.params.id));
    if (projectIndex === -1) return res.status(404).send('Project not found');
    projects.splice(projectIndex, 1);
    res.status(204).send();
});

// Add assignment to a project
router.post('/:id/assignments', (req, res) => {
    const project = projects.find(p => p.id === parseInt(req.params.id));
    if (!project) return res.status(404).send('Project not found');
    const { assignment } = req.body;
    project.assignments.push(assignment);
    res.status(201).json(assignment);
});

// Get project status
router.get('/:id/status', (req, res) => {
    const project = projects.find(p => p.id === parseInt(req.params.id));
    if (!project) return res.status(404).send('Project not found');
    res.status(200).json({ status: project.status });
});

module.exports = router;