var express = require('express');
var router = express.Router();
var validator = require('validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).render('login')
});

router.post('/validate', function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const users = [ 
    { email: "juanita@mail.com", password: "juanita1234"},
    { email: "camilito@mail.com", password: "camilito1234"},
    { email: "pepito@mail.com", password: "pepito1234"}
  ];

  // Check email format
  if (!validator.isEmail(email)) { 
    return res.status(200).render('login', { message: 'Invalid email. Good email example: lili@mail.com', error: true});
  }

  // Check password length
  if (password.length <= 6) {
    return res.status(200).render('login', { message: 'Password must be more than 6 characters', error: true});
  }

  // Check user credentials
  let userFound = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      userFound = true;
      break;
    }
  }

  if (userFound) {
    return res.status(200).render('index', { message: 'Welcome to the index page', error: false, email: email});
  } else {
    return res.status(200).render('login', { message: 'Email or password incorrect', error: true});
  }
});

module.exports = router;
