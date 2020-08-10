const { Router } = require("express");
const router = Router();
const jwt = require('jsonwebtoken');

const userDAO = require('../daos/user');

const isAuthorized = async (req, res, next) => {
    if (req.headers.authorization) {
  //      const secret = 'spongebob squarepants';
        const token = req.headers.authorizationsplit(' ')[1];
  //      req.token = jwt.sign(token, secret);
        if (token) {
            const validToken = await userDAO.validateToken(token);
            if (validToken) {
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

router.post("/signup", isAuthorized, async (req, res, next) => {
    const { email } = req.body;
    const { password } = req.body;
    if (!password || password === "") {
        res.status(400).send('Please provide a password'); 
    } else {
        const savedUser = await userDAO.create(email, password);
        if (savedUser) {
            res.sendStatus(200);
        } else {
            res.sendStatus(409);
        }
    }   
})

router.post("/", isAuthorized, async (req, res, next) => {
    const { email } = req.body;
    const { password } = req.body;
    if (!password || password === "") {
        res.status(400).send('Please provide a password'); 
    } else {
        const savedUser = await userDAO.login(email, password);
        if (savedUser = true) {
            res.sendStatus(200);
        }
    }   

})

router.post("/password", isAuthorized, async (req, res, next) => {

})

module.exports = router;