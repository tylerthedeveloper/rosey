const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
require('dotenv').config()

// TODO: what if i add google?
module.exports = (req, res, next) => {
    const _key = process.env.TWJ_KEY;

    // authorization = Bearer onjsgnjrengj
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send({ error: 'You must be logged in' });
    }

    // TODO: secret key...
    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, _key, async (err, payload) => {
        if (err) {
            return res.status(401).send({ error: 'You must be logged in' });
        }
        const { userId } = payload;
        const user = await User.findById(userId);
        req.user = user;
        next();

    });

};