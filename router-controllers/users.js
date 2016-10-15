const User = require('../models/user');
const config = require('../config');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({
    sub: user.id,
    iat: timestamp,
  }, config.secret);
}

exports.signup = (req, res, next) => {
  console.log(req.body)
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(422).send({error: 'Email and Password must be supplied'})
  }
  User.findOne({email: email}, (err, user) => {
    if (err) return next(err);
    if (user) return res.status(422).send({error: 'Email already in use'});
    const newUser = new User({
      email: email,
      password: password,
      username: username
    });
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(newUser.password, salt, null, (err, hash) => {
        if (err) return next(err);
        newUser.password = hash;
        newUser.save((err) => {
          if (err) return next(err);
          res.json({token: tokenForUser(newUser)});
        });
      });
    });
  });
}

exports.signin = (req, res, next) => {
  res.send({token: tokenForUser(req.user)});
}

exports.getUser = (req, res) => {
  const token = req.headers.authorization;
  let user;
  if (token) {
    try {
      const decoded = jwt.decode(token, config.secret);
      User.findById(decode.sub, (err, user) => {
        user = user;
        res.send(user);
      });
    }
    catch (e) {
      return res.status(401).send('authorization required');
    }
  }
  else {
    res.send({user: 'NO_USER'});
  }
}
