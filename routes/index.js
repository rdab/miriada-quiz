var express = require('express');
var router = express.Router();

var quizControllers = require('../controllers/quiz_controllers');
var commentControllers = require('../controllers/comment_controller');
var sessionControllers = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: "Quiz", errors: [] });
});

// Author page
router.get('/author', quizControllers.author);

// Session routes
router.get('/login', sessionControllers.new);
router.post('/login', sessionControllers.create);
router.get('/logout', sessionControllers.destroy);

// quizes routes
router.param('quizId', quizControllers.load); // autoload :quizId
router.get('/quizes', quizControllers.index);
router.get('/quizes/:quizId(\\d+)', quizControllers.show);
router.get('/quizes/:quizId(\\d+)/answer', quizControllers.answer);
router.get('/quizes/new', sessionControllers.loginRequired, quizControllers.new);
router.post('/quizes/create', sessionControllers.loginRequired, quizControllers.create);
router.get('/quizes/:quizId(\\d+)/edit', sessionControllers.loginRequired, quizControllers.edit);
router.put('/quizes/:quizId(\\d+)', sessionControllers.loginRequired, quizControllers.update);
router.delete('/quizes/:quizId(\\d+)', sessionControllers.loginRequired, quizControllers.destroy);

// comments routes
router.param('commentId', commentControllers.load); // autoload :commentId
router.get('/quizes/:quizId(\\d+)/comments/new', commentControllers.new);
router.post('/quizes/:quizId(\\d+)/comments', commentControllers.create);
router.put('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',
           sessionControllers.loginRequired,
           commentControllers.publish);
module.exports = router;
