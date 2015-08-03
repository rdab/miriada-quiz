var express = require('express');
var router = express.Router();

var quiz_controllers = require('../controllers/quiz_controllers');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: "Quiz", errors: [] });
});
router.get('/author', quiz_controllers.author);

// quizes routes
router.param('quizId', quiz_controllers.load);
router.get('/quizes', quiz_controllers.index);
router.get('/quizes/:quizId(\\d+)', quiz_controllers.show);
router.get('/quizes/:quizId(\\d+)/answer', quiz_controllers.answer);
router.get('/quizes/new', quiz_controllers.new);
router.post('/quizes/create', quiz_controllers.create);
router.get('/quizes/:quizId(\\d+)/edit', quiz_controllers.edit);
router.put('/quizes/:quizId(\\d+)', quiz_controllers.update);

module.exports = router;
