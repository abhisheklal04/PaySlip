var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/hello', function(req, res) {
  res.send('hello');
});

module.exports = router;
