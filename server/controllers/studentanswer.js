const StudentAnswer = require('../models/studentans');

// Controller function to create a student answer
const createStudentAnswer = async (req, res) => {
  try {
    const { quizId, studentId, questionId, answer, submissionTime, score, sectionId } = req.body; // Assuming the data is sent in the request body

    // Create the student answer
    const studentAnswer = await StudentAnswer.create({
      quizId,
      studentId,
      questionId,
      answer,
      submissionTime,
      score,
      sectionId,
    });

    // Return the created student answer in the response
    return res.status(201).json(studentAnswer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to retrieve a student answer by ID
const getStudentAnswerById = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the student answer ID is provided in the URL

    // Find the student answer by ID
    const studentAnswer = await StudentAnswer.findByPk(id);

    // If the student answer is not found, return a 404 Not Found response
    if (!studentAnswer) {
      return res.status(404).json({ error: 'Student answer not found' });
    }

    // Return the student answer in the response
    return res.json(studentAnswer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createStudentAnswer,
  getStudentAnswerById,
};
