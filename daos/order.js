const mongoose = require('mongoose');

const Order = require('../models/order');

module.exports = {};

module.exports.create = () => {
    Order.create({});
}

module.exports.getById = () => {
    Order.findOne({});
}

module.exports.getAll = () => {
    Order.find({});
}
