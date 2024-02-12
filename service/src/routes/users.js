const express = require("express");
const router = express.Router();

const checkAuth = (req, res, next) => {
  const { auth } = req.cookies;
  console.log(auth, " auth");

  // if (auth) {
  next();
  // }

  // Buffer.from(process.env.BUFFER_KEY).toString("base64");

  // if (login === process.env.HASH) {
  //   next();
  //   return;
  // }

  // res.redirect("/");
};

const generateUserPassword = (name) => {
  return 123456;
};

const users = [];

/* GET users listing. */
router.get("/", checkAuth, (req, res, next) => {
  res.send("Respond main users route with a resource");
});

router.get("/user/:id", checkAuth, (req, res) => {
  const { email } = req.query || null;
  const userID = req.params.id;

  if (userID) {
    res.send(`user - ${userID} - email - ${email}`);
  }
});

router.post("/loginUser", checkAuth, (req, res) => {
  const { email, pass } = req.body;

  if (email && pass) {
    const user = users.find((user) => user.email === email);
    if (user.pass === pass) {
      delete user.pass;
      return res.send(user);
    }
  }

  res.sendStatus(401);
});

router.post("/SignInUser", checkAuth, (req, res) => {
  console.log(req.body, " body");
  const { userName, email } = req.body;

  if (userName && email) {
    const user = {
      ...req.body,
      name: userName,
      email:email
    };
    users.push({
      ...user,
      pass: generateUserPassword(firstName),
    });

    return res.send(user);
  }

  res.sendStatus(401);
});

router.put("/user/:id", checkAuth, (req, res) => {
  const { email } = req.query || null;
  const userID = req.params.id;

  if (userID) {
    res.send(`user - ${userID} - email - ${email}`);
  }
});
module.exports = router;
