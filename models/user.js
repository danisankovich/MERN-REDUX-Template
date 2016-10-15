const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  email: {type: String, unique: true, lowercase: true, require: true},
  username: {type: String, unique: true, lowercase: true, require: true},
  password: {type: String, required: true}
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  const pwd = this.password;
  bcrypt.compare(candidatePassword, pwd, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
}

const USER = mongoose.model('user', userSchema);
module.exports = USER;
