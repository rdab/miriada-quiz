var express = require('express');
var router = express.Router();

var quizControllers = require('../controllers/quiz_controllers');
var commentControllers = require('../controllers/comment_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: "Quiz", errors: [] });
});
router.get('/author', quizControllers.author);

// quizes routes
router.param('quizId', quizControllers.load);
router.get('/quizes', quizControllers.index);
router.get('/quizes/:quizId(\\d+)', quizControllers.show);
router.get('/quizes/:quizId(\\d+)/answer', quizControllers.answer);
router.get('/quizes/new', quizControllers.new);
router.post('/quizes/create', quizControllers.create);
router.get('/quizes/:quizId(\\d+)/edit', quizControllers.edit);
router.put('/quizes/:quizId(\\d+)', quizControllers.update);
router.delete('/quizes/:quizId(\\d+)', quizControllers.destroy);

// comments routes
router.get('/quizes/:quizId(\\d+)/comments/new', commentControllers.new);
router.post('/quizes/:quizId(\\d+)/comments', commentControllers.create)
module.exports = router;
