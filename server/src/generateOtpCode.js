const generateRandomCode = () => {
  let randomCode = "";
  while (randomCode.length < 4) {
    randomCode = "";
    for (let i = 0; i < 4; i++) {
      randomCode += Math.floor(Math.random() * 10);
    }
  }
  return randomCode;
};

module.exports = generateRandomCode;