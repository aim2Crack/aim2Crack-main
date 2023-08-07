const Quiz = require('../models/quiz');

const generateUniqueLink = async () => {
  const letters = 'abcdefghijklmnopqrstuvwxyz';

  const generateRandomLink = () => {
    let link = '';
    for (let i = 0; i < 3; i++) {
      link += letters[Math.floor(Math.random() * letters.length)];
    }
    link += '-';
    for (let i = 0; i < 3; i++) {
      link += letters[Math.floor(Math.random() * letters.length)];
    }
    link += '-';
    for (let i = 0; i < 3; i++) {
      link += letters[Math.floor(Math.random() * letters.length)];
    }
    return link;
  };

  let generatedLink;
  let isLinkUnique = false;

  while (!isLinkUnique) {
    generatedLink = generateRandomLink();

    // Check if the generated link exists in the "Quizzes" table
    const existingQuiz = await Quiz.findOne({
      where: {
        code: generatedLink,
      },
    });

    if (!existingQuiz) {
      isLinkUnique = true;
    }
  }

  return generatedLink;
};

module.exports = generateUniqueLink;
