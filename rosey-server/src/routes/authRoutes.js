require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const _key = process.env.TWJ_KEY;
const router = express.Router();

router.post('/signup', async (req, res) => {
    // TODO: Integrate google...?
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).send('Problem with signin')
    }
    try {
        const newUser = new User({ email, password });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, _key);
        res.status(200).send({ token });
    } catch (err) {
        if (err.message.includes('duplicate')) {
            return res.status(422).send({ message: 'Email already exists' });
        } else {
            return res.status(422).send(e.message);
        }
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).send('Problem with signin')
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(422).send('Invalid password or email');
        }
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, _key);
        res.send({ user, token });
    } catch (e) {
        return res.status(422).send({ error: 'Invalid password or email' });
    }
});

module.exports = router;
