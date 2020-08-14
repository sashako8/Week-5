const { Router } = require("express");
const router = Router();

const itemDAO = require('../daos/item');
const { isAuthorized } = require('../middleware/middleware');
const { isAdmin } = require('../middleware/middleware');

router.use(isAuthorized);

router.post("/", isAdmin, async (req, res, next) => {
    const { title, price } = req.body;
    const item = await itemDAO.create(title, price);
    if (item) {
        res.json(item);
    } else {
        res.sendStatus(401);
    }
})

router.put("/:id", isAdmin, async (req, res, next) => {
    const itemId = req.params.id;
    const { title, price } = req.body;
    const item = await itemDAO.updateById(itemId, title, price);
    if (item) {
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
})

router.get("/", async (req, res, next) => {
    const items = await itemDAO.getAll();
    if (items) {
        res.json(items);
    } else {
        res.sendStatus(401);
    }
})

router.get("/:id", async (req, res, next) => {
    const itemId = req.params.id;
    const item = await itemDAO.getById(itemId);
    if (item) {
        res.json(item);
    } else {
        res.sendStatus(401);
    }
})

module.exports = router;