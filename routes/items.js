const { Router } = require("express");
const router = Router();
const jwt = require('jsonwebtoken');
const secret = 'spongebob squarepants';

const isAuthorized = async (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        const token = authorization.split(' ')[1];
        try {
            const user = jwt.verify(token, secret);
            req.user = decodedToken;
            next();
        } catch (e) {
                res.sendStatus(401);
        }
    } else {
            res.sendStatus(401);
    }
}

const isAdmin = (req, res, next) => {
    if (req.user.roles.inclues('admin')) {
        next();
    } else {
        res.sendStatus(403);
    }
}

router.post("/items", isAuthorized, isAdmin, async (req, res, next) => {
    await itemDAO.create
})

router.put("/items/:id", isAuthorized, isAdmin, async (req, res, next) => {
    await itemDAO.getById
})

router.get("/items", isAuthorized, async (req, res, next) => {
    await itemDAO.getAll
})

module.exports = router;