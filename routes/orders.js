const { Router } = require("express");
const router = Router();

const isAuthorized = (req, res, next) => {
    if (req.headers.authorization) {
        const secret = 'spongebob squarepants';
        const token = req.headers.authorization;
        req.token = jwt.sign(token, secret);
        if (req.token) {
            const user = userDAO.validateToken(req.token);
            if (user) {
                next();
            } else {
                res.sendStatus(401);
            }
        } else {
            res.sendStatus(401);
        } 
    } else {
        res.sendStatus(401);
    }
}

router.post("/orders")

router.get("/orders")

router.get("/order/:id")

module.exports = router;