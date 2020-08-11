export const isAuthorized = async (req, res, next) => {
    if (req.headers.authorization) {
        const secret = 'spongebob squarepants';
        const token = req.headers.authorization.split(' ')[1];
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

export const isAdmin = (req, res, next) => {
    if (req.user.roles.inclues('admin')) {
        next();
    } else {
        res.sendStatus(403);
    }
}