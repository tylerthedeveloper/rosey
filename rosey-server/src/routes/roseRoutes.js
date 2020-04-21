const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Rose = mongoose.model('Rose');

const router = express.Router();

router.use(requireAuth);

router.get('/roses', async (req, res) => {
    const id = req.user._id;
    const roses = await Rose.find({ userId: id });
    res.send({ roses });
});

router.post('/roses', async (req, res) => {
    const roseData = req.body;
    console.log(roseData)
    if (!roseData) {
        return res.status(422).send('No rose data');
    }
    try {
        const userId = req.user._id;
        const newRose = new Rose({ ...roseData, userId });
        await newRose.save();
        res.send(newRose);
    } catch (err) {
        return res.status(422).send(e.message);
    }
});

// TODO: can we handle this better and pull from existing state?
router.get('/roses/:rose_id', async (req, res) => {
    // TODO: i imagine option 2 is better
    const rose_id = req.params.rose_id;
    console.time('handler name');
    // option 1: map over the list here
    // const userId = req.user._id;
    // const roses = await Rose.find({ userId });
    // const rose = roses.map(f => f._id = rose_id);
    // option 2: look up based on rose_id
    const rose = await Rose.findOne({ _id: rose_id });
    console.timeEnd('handler name');
    res.send(rose);
});


module.exports = router;
