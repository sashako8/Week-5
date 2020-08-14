const { Router } = require("express");
const router = Router();

const orderDAO = require('../daos/order');
const itemDAO = require('../daos/item');
const { isAuthorized } = require('../middleware/middleware');

router.use(isAuthorized);

router.post("/", async (req, res, next) => {
    const userId = req.user._id;
    const items = req.body;
    const total = await itemDAO.getTotal(items);
    if (total) {
        const order = await orderDAO.create(userId, items, total);
        if (order) {
            res.json(order);
        } else {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(400);
    }
})

router.get("/", async (req, res, next) => {
    if (req.user.roles.includes('admin')) {
        const orders = await orderDAO.getAll();
        if (orders) {
            res.json(orders);
        } else {
            res.sendStatus(401);
        }
    } else {
        const userId = req.user._id;
        const orders = await orderDAO.getByUserId(userId);
        if (orders) {
            res.json(orders);
        } else {
            res.sendStatus(401);
        }
    }
})

router.get("/:id", async (req, res, next) => {
    const orderId = req.params.id;
    const order = await orderDAO.getById(orderId);
    if (req.user.roles.includes('admin')) {
        if (order) {
            res.json(order);
        } else {
            res.sendStatus(401);
        }
    } else {
        const userId = req.user._id;
        if (userId.toString() === order.userId.toString()) {
            res.json(order);
        } else {
            res.sendStatus(404);
        }
    }
})

module.exports = router;