const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;



let emailLengthChecker = (email) => {
  if (!email){
    return false;
  } else {
    if (email.length < 5 || email.length > 30){
      return false;
    } else {
      return true;

    }
  }
};
let validEmailChecker = (email) => {
  if (!email) {
    return false;
  } else {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regExp.test(email);
  }
};
let usernameLengthChecker = (username) => {
  if (!username){
    return false;
  } else {
    if (username.length < 3 || username.length > 15){
      return false;
    } else {
      return true;

    }
  }
};
let validUsernameChecker = (username) => {
  if (!username) {
    return false;
  } else {
    const regExp = new RegExp(/^[a-zA-Z\-]+$/);
    return regExp.test(username);
  }
};
let passwordLengthChecker = (password) => {
  if (!password){
    return false;
  } else {
    if (password.length < 8 || password.length > 35){
      return false;
    } else {
      return true;

    }
  }
};
let validPasswordChecker = (password) => {
  if (!password) {
    return false;
  } else {
    const regExp = new RegExp(/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{0,}$/);
    return regExp.test(password);
  }
};



// Validators
const passwordValidators = [
  {
  validator: passwordLengthChecker,
  message: 'Password must contain at least 8 charecters but no more than 35'
  },
  {
    validator: validPasswordChecker,
    message: "Password must not have any special charecters"
  }
];
const usernameValidators = [
  {
  validator: usernameLengthChecker,
  message: 'Username must contain at least 3 charecters but no more than 15'
  },
  {
    validator: validUsernameChecker,
    message: "Username must not have any special charecters"
  }
];
const emailValidators = [
  {
  validator: emailLengthChecker,
  message: 'E-mail must contain at least 5 charecters but no more than 30'
  },
  {
    validator: validEmailChecker,
    message: "E-mail must be valid"
  }
];

// Schema
const userSchema = new Schema({
  email: {type: String, required: true, validate: emailValidators},
  username: {type: String, required: true, validate: usernameValidators},
  password: {type: String, required: true, validate: passwordValidators}
});

// Function before Schema
userSchema.pre('save', function(next){
  if(!this.isModified('password')){
    return next();
  } else {
    bcrypt.hash(this.password, null, null, (err, hash) => {
      if (err){
        return(err);
      } else {
        this.password = hash;
        next();
      }
    });
  };
});
// Model
module.exports = mongoose.model('User', userSchema);
