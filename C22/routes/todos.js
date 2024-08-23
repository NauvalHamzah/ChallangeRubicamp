var express = require('express');
var router = express.Router();
const Todo = require('../models/Todo');

/* GET Todo listing. */
router.get('/', async function (req, res) {
    try {
      const executor = req.query.executor
      const title = req.query.title
      let startDate = req.query.startDate
      let endDate = req.query.endDate
      const sortMode = req.query.sortMode
      const sortOrder = sortMode=="asc"? 1 : -1
      const complete = req.query.complete    
      const page = req.query.page || 1
      const limit = req.query.limit || 5

      const todoCount = await Todo.countDocuments({executor: executor})
      if(todoCount>0){
        const oldestTodo = await Todo.findOne({executor: executor}).sort({ deadline: 1 });
        const latestTodo = await Todo.findOne({executor: executor}).sort({ deadline: -1 });
        
        startDate = startDate==''? oldestTodo.deadline : startDate
        endDate = endDate==''? latestTodo.deadline : endDate
        
      }

      const cond = {
        executor: executor,
        title: new RegExp(title, 'i'),
        deadline: { $gte: startDate, $lte: endDate}
      }
      if(complete!==''){
        cond.complete = complete
      }
      const todos = await Todo.find(cond)
      .sort({ "deadline": sortOrder })
      .skip((page-1)*limit)
      .limit(limit)

      res.json({
        todos,
        totalPages: Math.ceil(todoCount / limit),
        currentPage: page,
        executor,
        title,
        sortOrder,
        startDate,
        endDate,
        complete,
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
});

router.post('/', async function (req, res) {
    try {
      const user = await Todo.create(req.body);
      res.status(201).json(user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
});

router.put('/:id', async function (req, res) {
    try {
      const user = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(201).json(user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  });

router.delete('/:id', async function (req, res) {
    try {
      const user = await Todo.findByIdAndDelete(req.params.id);
      res.json(user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  });

module.exports = router;
