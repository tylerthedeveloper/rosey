const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Friend = mongoose.model('Friend');

const router = express.Router();

router.use(requireAuth);

router.get('/friends', async (req, res) => {
    const id = req.user._id;
    const friends = await Friend.find({ userId: id });
    res.send(friends);
});

router.post('/friends', async (req, res) => {
    const friendData = req.body;
    console.log(friendData)
    if (!friendData) {
        return res.status(422).send('No friend data');
    }
    try {
        const userId = req.user._id;
        const newFriend = new Friend({ ...friendData, userId });
        await newFriend.save();
        res.send(newFriend);
    } catch (err) {
        return res.status(422).send(e.message);
    }
});

router.get('/friends/:friend_id', async (req, res) => {
    // TODO:
    const friend_id = req.params.friend_id;
    console.time('handler name');
// option 1: map over the list here
    // const userId = req.user._id;
    // const friends = await Friend.find({ userId });
    // const friend = friends.map(f => f._id = friend_id);
// option 2: look up based on friend_id
    const friend = await Friend.findOne({ _id: friend_id });
    console.timeEnd('handler name');
    res.send(friend);
});


module.exports = router;
