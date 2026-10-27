const express = require('express');
const router = express.Router();
const { students } = require('../data/mockData');

// GET all students
router.get('/', (req, res) => {
  res.json(students.map(({ id, name, email, course }) => ({ id, name, email, course })));
});

module.exports = router;