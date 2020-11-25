var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'IVP login' });
});

/* Model: for Database */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;

/* Model */
var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
}, {collection: 'Users'});


/* Password hashing process & save to database */
UserSchema.pre('save', function(next) {
    var user = this;

    /* only hash the password if it has been modified (or is new) */
    if (!user.isModified('password')) return next();

    /* generate a salt */
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        /* hash the password using our new salt */
        bcrypt.hash(user.password, salt,null, function(err, hash) {
            if (err) return next(err);

            /* override the cleartext password with the hashed one */
            user.password = hash;
            next();
        });
    });
});

/* Unhash the password, and compare to given one */
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

var User = mongoose.model('User', UserSchema);

/* Create a user */
function createUser(username, pwd) {
    var testUser = new User({
        username: username,
        password: pwd
    });

    /* save user to database */
    testUser.save(function(err) {
        if (err) throw err;
    });
    return testUser;
}

/* Look for: Username and password in database */
function findUser(username, pwd) {
    /* fetch user and test password verification */
    User.findOne({username: username}, function (err, user) {
        if (err) throw err;

        /* test a matching password */
        user.comparePassword(pwd, function (err, isMatch) {
            if (err) throw err;
            console.log('Matched?', isMatch); // -> Password123: true
        });
    });
}

/* On good user, render settings page */
function successAuth (success) {

}



module.exports = {
    router: router,
    model: User,
    createUser: createUser,
    findUser: findUser
};
