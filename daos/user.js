const mongoose = require('mongoose');

const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {};

module.exports.create = async (email, password) => {
    let user = await User.findOne({ email: email});
    if (user) {
        return false;
    } else {
        let role = ['user'];
        newPassword = await bcrypt.hash(password, 10);
        return User.create({ email: email, password: newPassword, role: role });
    }
}

module.exports.validateToken = async (token) => {
    const foundUser = await User.findOne({ token: token });
    if (foundUser) {
        return foundUser.email;
    } else {
        return false;
    }
}

module.exports.login = async (email, password) => {
    const user = await User.findOne({ email: email});
    if (!user) {
        return false;
    } else {
        const passwordsMatch = await bcrypt.compare(password, newPassword)
        if (passwordsMatch) {
            const secret = 'spongebob squarepants';
            newToken = jwt.sign(token, secret);
            return newToken;
        } else {
            return false;
        }
    }
}

module.exports.updatePassword = async () => {

}

