var express = require('express');
var router = express.Router();
const User = require('../models/User');

/* GET users listing. */
router.get('/', async function (req, res) {
  try {
    const page = req.query.page || 1
    const sortBy = req.query.sortBy || "_id"
    const sortMode = req.query.sortMode || "asc"
    const sortOrder = sortMode=="asc"? 1 : -1
    const search = req.query.search || ""

    const total = await User.countDocuments({
      $or:[
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ]
    })
    const inpLimit = req.query.limit || total
    const limit = inpLimit==0? total : inpLimit
    const offset = (page - 1) * limit
    
    const maxPage = Math.ceil(total / limit)
    const users = await User.find({
      $or:[
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ]
    }).sort({ [sortBy]: sortOrder }).limit(limit).skip(offset)
    res.json({
      users,
      page: Number(page),
      maxPage,
      offset,
      total,
      sortBy,
      sortOrder,
      limit
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

router.post('/', async function (req, res) {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

router.put('/:id', async function (req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

router.delete('/:id', async function (req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

module.exports = router;
