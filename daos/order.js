const mongoose = require('mongoose');

const Order = require('../models/order');
const Item = require('../models/item');

module.exports = {};

module.exports.create = async (userId, items, total) => {
    const order = await Order.create({ userId: userId, items: items, total: total });
    if (order) {
        return order;
    } else {
        return false;
    }
}

module.exports.getAll = async () => {
    const orders = await Order.find();
    if (orders) {
        return orders;
    } else {
        return false;
    }
}

module.exports.getByUserId = async (userId) => {
    const order = await Order.find({ userId: userId });
    if (order) {
        return order;
    } else {
        return false;
    }
}

module.exports.getById = async (orderId) => {
    const order = await Order.findOne({ _id: orderId });
    const itemizedOrder = [];
    if (order) {
        for (let i = 0; i < order.items.length; i++) {
            if (!mongoose.Types.ObjectId.isValid(order.items[i])) {
                return false;
            } else {
                const item = await Item.findOne({ _id: order.items[i] });
                itemizedOrder.push(item);
            }
        }
        order.items = itemizedOrder;
        return order;
    } else {
        return false;
    }
}