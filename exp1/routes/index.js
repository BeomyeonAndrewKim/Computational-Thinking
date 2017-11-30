var express = require('express');
var router = express.Router();

/* http://localhost:7000 */
router.get('/', function(req, res, next) {
  var obj = { title: 'Node.js' };
  res.render('index', obj);
});

/* http://localhost:7000 */
router.get('/abc', (req, res, next) => {
  res.send("여기는 /abc입니다!");
});

module.exports = router;