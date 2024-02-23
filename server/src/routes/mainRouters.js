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
let userCode = "";
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
const mailOptions = ({ email, code }) => ({
  form: process.env.EMAIL,
  to: email,
  subject: "Hi , it is DiveSea here is your verification code.",
  text: `Your Code ${code}`,
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
            res.sendStatus(200);
          } else {
            console.error("failed to add");
          }
        });
      }
    });
  } else {
    res.sendStatus(401);
  }
});
router.post("/loginUser", checkAuth, (req, res) => {
  const { email, sendEmail } = req.body;
  console.log(process.env.EMAIL, "my email");
  console.log(email, "user email");
  client.query(checkQuery, [email], (err, queryRes) => {
    console.log(queryRes.rows, "rows");
    if (email && queryRes.rows.length !== 0) {
      console.log(queryRes.rows, "rows if finded");
      console.log("sucsesfull");
      userCode = generateRandomCode();
      console.log(userCode, "code");
      const user = queryRes.rows[0];
      console.log(user , "user");
      if (sendEmail) {
        const mailInfo = mailOptions({ email: email, code: userCode });
        res.status(200).json({ user });
        transporter.sendMail(mailInfo, (err, info) => {
          if (!err) {
            console.log(info.response, "email succsesful delivered");
          } else {
            console.error(err, "failed with delivering email");
          }
        });
      } else {
        console.log("user loginned without email verification");
        res.status(200).json({ user });
      }
    } else {
      console.log("not registered");
      res.status(401).json({ error: "not registered" });
    }
  });
});
console.log(userCode, "logInCode");
router.post("/ChangeUserValue", checkAuth, (req, res) => {
  const { email, username, id } = req.body;
  console.log(req.body, "body");
  if (id) {
    const changeValue = `UPDATE diveseausers
    SET email = $1, username = $2
    WHERE id = $3`;
    const values = [req.body.email, req.body.username, req.body.id];
    client.query(changeValue, values, (err, updatedUserRes) => {
      console.log(values, "bod");
      if (!err) {
        client.query(checkQuery, [email], (err, queryRes) => {
          if (!err && queryRes.rows.length !== 0) {
            const user = queryRes.rows[0];
            res.status(200).json({ user });
          } else {
            res.status(500).json({ error: "failed to fetch updated user" });
          }
        });
      } else {
        res.status(404).json({ error: "fail with updating" });
      }
    });
  } else {
    res.status(400).json({ error: "Missing Id" });
  }
});
router.post("/CheckCodeFromUser", checkAuth, (req, res) => {
  const { codeFromUser, email } = req.body;
  if (email && codeFromUser === userCode.toString()) {
    client.query(checkQuery, [email], (err, queryRes) => {
      if (!err && queryRes.rows.length !== 0) {
        const user = queryRes.rows[0];
        res.status(200).json({ user });
      } else {
        res.sendStatus(401);
      }
    });
  } else {
    res.sendStatus(401);
  }
});
module.exports = router;
