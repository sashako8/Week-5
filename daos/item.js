const mongoose = require('mongoose');

const Item = require('../models/item');

module.exports = {};

module.exports.create = () => {
    Item.create({});
}

module.exports.getById = () => {
    Item.findOne({});
}

module.exports.getAll = () => {
    Item.find({});
}
