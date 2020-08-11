const mongoose = require('mongoose');

const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = {};

module.exports.create = async (email, password) => {
    let user = await User.findOne({ email: email});
    if (user) {
        return false;
    } else {
        password = await bcrypt.hash(password, 10);
        const user = await User.create({ email: email, password: password, roles: ['user'] });
        return user;
    }
}

module.exports.login = async (email) => {
    let user = await User.findOne({ email: email });
    if (!user) {
        return false;
    } else {
        return user;
    }
}

module.exports.removePassword = async (email) => {
    let user = await User.findOne({ email: email }, {password: 0});
    if (!user) {
        return false;
    } else {
        return user;
    }
}

module.exports.updatePassword = async (email, password) => {
    const user = await User.findOne({ email: email });
    if (user) {
        const newPassword = await bcrypt.hash(password, 10);
        return User.update({ email: email, password: newPassword});
    } else {
        return false;
    }
}
