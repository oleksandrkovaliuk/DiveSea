const express = require("express");
const router = express.Router();
const client = require("../../database");
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

// const generateUserPassword = (name) => {
//   return 123456;
// };

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
  const insertQuery = `
  INSERT INTO diveseausers (username, email)
  VALUES ($1, $2)
  RETURNING *;`;
  const checkQuery = "SELECT * FROM diveseausers WHERE username = $1;";
  const { userName, email } = req.body;
  if (userName && email) {
    const value = [userName, email];
    client.query(checkQuery, [userName], (err, res) => {
      if (!err) {
        if (res.rows.length > 0) {
          client.query(insertQuery, value, (err, res) => {
            if (!err) {
              console.log(res.rows, "user added");
            } else {
              console.error("failed with adding user");
            }
          });
        } else {
          console.log("User already exists");
        }
      } else {
        console.error("faile with checking if user registreted");
      }
      client.end();
    });
  }
  res.sendStatus(401);
});

// router.put("/user/:id", checkAuth, (req, res) => {
//   const { email } = req.query || null;
//   const userID = req.params.id;

//   if (userID) {
//     res.send(`user - ${userID} - email - ${email}`);
//   }
// });
module.exports = router;
