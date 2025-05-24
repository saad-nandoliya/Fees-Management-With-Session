const express = require('express');
const router = express.Router();
const promoteStudents= require('../../controllers/promoteStudent/promoteStudent');

// Routes
router.get('/students', promoteStudents.getStudents);
router.post('/promote', promoteStudents.promoteStudents);

module.exports = router;