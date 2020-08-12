const mongoose = require('mongoose');

const Item = require('../models/item');

module.exports = {};

module.exports.create = (title, price) => {
    const item = Item.create({ title: title, price: price});
    if (item) {
        return item;
    } else {
        return false;
    }
}

module.exports.updateById = (itemId, title, price) => {
    const item = Item.updateOne({ _id: itemId, title: title, price: price });
    if (item) {
        return item;
    } else {
        return false;
    }
}

module.exports.getAll = () => {
    const items = Item.find();
    if (items) {
        return items;
    } else {
        return false;
    }
}

module.exports.getById = (itemId) => {
    const item = Item.findOne({ _id: itemId });
    if (item) {
        return item;
    } else {
        return false;
    }
}
