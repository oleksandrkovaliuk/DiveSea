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
            return res.sendStatus(200);
          } else {
            console.error("failed to add");
            return res.status(401).json({ errorText: "failed to add" });
          }
        });
      }
    });
  }
  return res.sendStatus(401);
});
router.post("/loginUser", checkAuth, (req, res) => {
  const { email, sendEmail } = req.body;
  client.query(checkQuery, [email], (err, queryRes) => {
    if (email && queryRes.rows.length !== 0) {
      userCode = generateRandomCode();
      if (sendEmail) {
        const mailInfo = mailOptions({ email: email, code: userCode });
        transporter.sendMail(mailInfo, (err, info) => {
          if (!err) {
            console.log(info.response, "email succsesful delivered");
          } else {
            console.error(err, "failed with delivering email");
          }
        });
        return res.sendStatus(200);
      } else {
        console.log("user loginned without email verification");
        return res.sendStatus(200);
      }
    } else {
      console.log("not registered");
      return res.status(401).json({ errorText: "not registered" });
    }
  });
});
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
            res.status(500).json({ errorText: "failed to fetch updated user" });
          }
        });
      } else {
        res.status(404).json({ errorText: "fail with updating" });
      }
    });
  } else {
    res.status(400).json({ errorText: "Missing Id" });
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
        res.status(401).json({ errorText: "Code not valid" });
      }
    });
  } else {
    res.status(401).json({ errorText: "Code not valid" });
  }
});
module.exports = router;
