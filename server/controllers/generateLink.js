const Quiz = require('../models/quiz');

const generateUniqueLink = async () => {
  const letters = 'abcdefghijklmnopqrstuvwxyz';

  const generateRandomLink = () => {
    let link = '';

    // Generate the first three letters
    for (let i = 0; i < 3; i++) {
      link += letters[Math.floor(Math.random() * letters.length)];
    }

    // Add a hyphen
    link += '-';

    // Generate the next three letters
    for (let i = 0; i < 3; i++) {
      link += letters[Math.floor(Math.random() * letters.length)];
    }

    // Add a hyphen
    link += '-';

    // Generate the last three letters
    for (let i = 0; i < 3; i++) {
      link += letters[Math.floor(Math.random() * letters.length)];
    }
console.log(link)
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
