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

router.post("/orders", async (req, res, next) => {

})

router.get("/orders", async (req, res, next) => {
    
})

router.get("/order/:id", async (req, res, next) => {
    
})

module.exports = router;