const express = require("express");
const router = express.Router();
const client = require("../../database");
const checkQuery = "SELECT * FROM diveseausers WHERE email = $1;";
const nodemailer = require("nodemailer");
const generateRandomCode = require("../generateOtpCode");
const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
let userCode = "";
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
      if (queryRes.rows.length) {
        return res
          .status(401)
          .json({ errorText: "User with this email already registered" });
      } else {
        const insertQuery = `
        INSERT INTO diveseausers (username, email)
        VALUES ($1, $2)
        RETURNING *;`;
        const insertValue = [userName, email];
        client.query(insertQuery, insertValue, (err, dataRes) => {
          if (!err) {
            return res.json({ data: dataRes.rows[0] });
          }
        });
      }
    });
  }
});
router.post("/loginUser", checkAuth, (req, res) => {
  const { email, sendEmail } = req.body;
  console.log(email, " email");
  client.query(checkQuery, [email], (err, queryRes) => {
    console.log(queryRes.rows, " queryRes.rows");
    if (email && queryRes.rows.length !== 0) {
      if (sendEmail) {
        userCode = generateRandomCode();
        const mailInfo = mailOptions({ email: email, code: userCode });
        transporter.sendMail(mailInfo, (err, info) => {
          if (!err) {
            console.log(info.response, "email succsesful delivered");
            return res.status(200).json({ res: info.response });
          } else {
            console.error(err, "failed with delivering email");
          }
        });
      } else {
        return res.status(200).json({ data: queryRes.rows[0] });
      }
    } else {
      console.log("not registered");
      return res
        .status(401)
        .json({ errorText: "This user is not registered yet" });
    }
  });
});

router.post("/updateUserValue", checkAuth, (req, res) => {
  const { email, id } = req.body;
  console.log(req.body.url);
  if (id) {
    const changeValue = `UPDATE diveseausers
    SET email = $1, username = $2 , url = $3
    WHERE id = $4`;
    const values = [
      req.body.email,
      req.body.userName,
      req.body.url,
      req.body.id,
    ];
    client.query(changeValue, values, (err, updatedUserRes) => {
      console.log(values, "values");
      if (!err) {
        client.query(checkQuery, [email], (err, queryRes) => {
          if (!err && queryRes.rows.length !== 0) {
            const user = queryRes.rows[0];
            console.log(user, "updated");
            res.status(200).json({ user });
          } else {
            res.status(401).json({ errorText: "failed to fetch updated user" });
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
router.post("/checkCodeFromUser", checkAuth, (req, res) => {
  const { codeFromUser, email } = req.body;
  console.log(codeFromUser === userCode.toString(), "check");
  console.log(email, "email from user");
  if (email && codeFromUser === userCode.toString()) {
    client.query(checkQuery, [email], (err, queryRes) => {
      console.log("true");
      if (!err && queryRes.rows.length !== 0) {
        const user = queryRes.rows[0];
        console.log(user, "user true");
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
