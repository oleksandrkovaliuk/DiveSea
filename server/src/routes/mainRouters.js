const express = require("express");
const router = express.Router();
const client = require("../../database");
const checkQuery = "SELECT * FROM diveseausers WHERE email = $1;";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
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
const checkAuth = (req, res, next) => {
  next();
};
router.post("/loginUser", checkAuth, (req, res) => {
  const { email } = req.body;
  console.log(process.env.EMAIL, "my email");
  console.log(email, "user email");
  console.log(generateRandomCode(), "randomcode");
  const mailOptions = {
    form: process.env.EMAIL,
    to: email,
    subject: "Hi , it is DiveSea here is your verification code.",
    text: `Your Code ${generateRandomCode()}`,
  };
  console.log(mailOptions, "options");
  client.query(checkQuery, [email], (err, queryRes) => {
    console.log(queryRes.rows, "rows");
    if (email && queryRes.rows.length !== 0) {
      console.log(queryRes.rows, "rows if finded");
      console.log("sucsesfull");
      const user = queryRes.rows[0];
      res.status(200).json({ user, mailOptions });
      transporter.sendMail(mailOptions, (err, info) => {
        if (!err) {
          console.log(info.response, "email succsesful delivered");
        } else {
          console.error(err, "failed with delivering email");
        }
      });
    } else {
      console.log("not registered");
      res.status(401).json({ error: "not registered" });
    }
  });
});

router.post("/signInUser", checkAuth, (req, res) => {
  const { email, userName } = req.body;
  if (userName && email) {
    client.query(checkQuery, [email], (err, queryRes) => {
      if (queryRes.rows.length === 0) {
        const insertQuery = `
        INSERT INTO diveseausers (username, email)
        VALUES ($1, $2)
        RETURNING *;`;
        const insertValue = [userName, email];
        client.query(insertQuery, insertValue, (err, dataRes) => {
          if (!err) {
            console.log(dataRes.rows, "added");
          } else {
            console.error("failed to add");
          }
        });
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
        console.log("this user already registered");
      }
    });
  }
});
module.exports = router;
