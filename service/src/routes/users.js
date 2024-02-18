const express = require("express");
const router = express.Router();
const client = require("../../database");
const checkQuery = "SELECT * FROM diveseausers WHERE email = $1;";
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
  const { email } = req.body;
  console.log(email, "email");
  client.query(checkQuery, [email], (err, queryRes) => {
    console.log(queryRes.rows, "rows");
    if (email && queryRes.rows.length !== 0) {
      console.log(queryRes.rows, "rows if finded");
      res.status(200);
      console.log("sucsesfull");
    } else {
      res.status(401);
      console.log("not registered");
    }
  });
});

router.post("/SignInUser", checkAuth, (req, res) => {
  const { email, userName } = req.body;
  if (userName && email) {
    client.query(checkQuery, [email], (err, res) => {
      if (res.rows.length === 0) {
        const insertQuery = `
        INSERT INTO diveseausers (username, email)
        VALUES ($1, $2)
        RETURNING *;`;
        const insertValue = [userName, email];
        client.query(insertQuery, insertValue, (err, res) => {
          if (!err) {
            console.log(res.rows, "added");
          } else {
            console.error("failed to add");
          }
        });
      } else {
        console.log("this user already registered");
      }
    });
  }
  res.sendStatus(200);
});

// router.put("/user/:id", checkAuth, (req, res) => {
//   const { email } = req.query || null;
//   const userID = req.params.id;

//   if (userID) {
//     res.send(`user - ${userID} - email - ${email}`);
//   }
// });
module.exports = router;
