const { Router } = require("express");
const router = Router();
const jwt = require('jsonwebtoken');
const secret = 'spongebob squarepants';
const bcrypt = require('bcrypt');

const userDAO = require('../daos/user');
const e = require("express");

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

router.post("/signup", async (req, res, next) => {
    const { email, password } = req.body;
    if (!password || password === "") {
        res.status(400).send('Please provide a password'); 
    } else {
        const newUser = await userDAO.create(email, password);
        if (newUser) {
            res.json(newUser);
        } else {
            res.sendStatus(409);
        }
    }   
})

router.post("/", async (req, res, next) => {
    const { email, password } = req.body;
    if (!password || password === "") {
        res.status(400).send('Please provide a password'); 
    } else {
        let savedUser = await userDAO.login(email);
        if (savedUser) {
            const passwordsMatch = await bcrypt.compare(password, savedUser.password);
            if (passwordsMatch) {
                savedUser = await userDAO.removePassword(email);
                try {
                    const token = jwt.sign(savedUser.toJSON(), secret);
                    res.json({ token });
                } catch (e) {
                    throw e;
                }
            } else {
                res.sendStatus(401);
            }
        } else {
            res.sendStatus(401);
        }
    }   
})

router.post("/password", isAuthorized, async (req, res, next) => {
    const { password } = req.body;
    const { email } = req.user;
    if (!password || password === "") {
        res.status(400).send('Please provide a password'); 
    } else if (req.headers.authorization.includes('BAD')) {
        res.sendStatus(401);
    } else {
        const newPassword = await userDAO.updatePassword(email, password);
        if (newPassword) {
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    }
})

module.exports = router;