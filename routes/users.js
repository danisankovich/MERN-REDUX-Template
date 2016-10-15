const express = require('express');
const router = express.Router();
const expressJwt = require('express-jwt');
const jwt = require('jwt-simple');
const config = require('../config');
const passport = require('passport');

const userController = require('../router-controllers/users');
const passportService = require('../services/passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});
const authenticate = expressJwt({secret: config.secret});

const User = require('../models/user');

/* GET users listing. */
router.get('/', requireAuth, userController.getUser);
router.post('/signup', userController.signup);
router.post('/signin', requireSignin, userController.signin);

module.exports = router;
