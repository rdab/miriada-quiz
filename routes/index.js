var express = require('express');
var router = express.Router();

var quiz_controllers = require('../controllers/quiz_controllers');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { "title": "Quiz" });
});

router.param('quizId', quiz_controllers.load);

router.get('/quizes', quiz_controllers.index);
router.get('/quizes/:quizId(\\d+)', quiz_controllers.show);
router.get('/quizes/:quizId(\\d+)/answer', quiz_controllers.answer);
router.get('/author', quiz_controllers.author);

module.exports = router;
