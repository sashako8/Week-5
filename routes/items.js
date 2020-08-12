const { Router } = require("express");
const router = Router();
const jwt = require('jsonwebtoken');
const secret = 'spongebob squarepants';

const itemDAO = require('../daos/item');

const isAuthorized = async (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        const token = authorization.split(' ')[1];
        try {
            const user = jwt.verify(token, secret);
            if (user) {
                req.user = user;
                next();
            } else {
                res.sendStatus(401);
            }
        } catch (e) {
                res.sendStatus(401);
        }
    } else {
            res.sendStatus(401);
    }
}

const isAdmin = async (req, res, next) => {
    if (req.user.roles.includes('admin')) {
        next();
    } else {
        res.sendStatus(403);
    }
}

router.post("/", isAuthorized, isAdmin, async (req, res, next) => {
    const { title, price } = req.body;
    const item = await itemDAO.create(title, price);
    if (item) {
        res.json(item);
    } else {
        res.sendStatus(401);
    }
})

router.put("/:id", isAuthorized, isAdmin, async (req, res, next) => {
    const itemId = req.params.id;
    const { title, price } = req.body;
    const item = await itemDAO.updateById(itemId, title, price);
    if (item) {
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
})

router.get("/", isAuthorized, async (req, res, next) => {
    const items = await itemDAO.getAll();
    if (items) {
        res.json(items);
    } else {
        res.sendStatus(401);
    }
})

router.get("/:id", isAuthorized, async (req, res, next) => {
    const itemId = req.params.id;
    const item = await itemDAO.getById(itemId);
    if (item) {
        res.json(item);
    } else {
        res.sendStatus(401);
    }
})

module.exports = router;