const { Router } = require("express");
const router = Router();
const jwt = require('jsonwebtoken');
const secret = 'spongebob squarepants';

const orderDAO = require('../daos/order');

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


router.post("/", async (req, res, next) => {

})

router.get("/", async (req, res, next) => {
    
})

router.get("/:id", async (req, res, next) => {
    
})

module.exports = router;