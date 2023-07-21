const StudentResult = require('../models/studentresult');

// Controller function to create a student result
const createStudentResult = async (req, res) => {
  try {
    const { quizId, studentId, totalScore } = req.body; // Assuming the data is sent in the request body

    // Create the student result
    const studentResult = await StudentResult.create({
      quizId,
      studentId,
      totalScore,
    });

    // Return the created student result in the response
    return res.status(201).json(studentResult);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to retrieve a student result by ID
const getStudentResultById = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the student result ID is provided in the URL

    // Find the student result by ID
    const studentResult = await StudentResult.findByPk(id);

    // If the student result is not found, return a 404 Not Found response
    if (!studentResult) {
      return res.status(404).json({ error: 'Student result not found' });
    }

    // Return the student result in the response
    return res.json(studentResult);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createStudentResult,
  getStudentResultById,
};
