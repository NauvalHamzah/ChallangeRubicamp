var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('user');
});

router.get('/user/:userid/todos', function (req, res) {
  res.render('todo', { userId: req.params.userid });
});

module.exports = router;