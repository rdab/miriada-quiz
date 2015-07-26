var models = require('../models/models');

// Autoload
exports.load = function(req, res, next, quizId){
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quiz con el id: ' + quizId));}
    }
  ).catch(function(error) { next(error); });
};

// GET /quizes
exports.index = function(req, res){
  models.Quiz.findAll().then(function(quizes) {
    res.render('quizes/index', { "quizes": quizes });
  });
};

// GET /quizes/:id
exports.show = function(req, res){
  res.render('quizes/show', { "quiz": req.quiz })
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  var evaluacion = (req.query.respuesta === req.quiz.respuesta) ? 'Correcto' : 'Incorrecto';
  res.render('quizes/answer', { "respuesta": evaluacion,
                                "quiz": req.quiz });
};

//GET /author
exports.author = function(req, res) {
  authors_list = [{
    "name": "Roberto Damián Alfonso",
    "picture": "/images/author1",
    "tw": "",
    "fb": "https://www.facebook.com/rdamian.alfonso",
    "in": "https://www.linkedin.com/in/robertodamian",
    "github": "https://github.com/rdab"
  },
  {
  "name": "Juan Quemada Vives",
  "picture": "/images/author2.jpg",
  "tw": "https://twitter.com/jquemada",
  "fb": "https://www.facebook.com/jquemada1",
  "in": "https://www.linkedin.com/pub/juan-quemada/0/523/34a",
  "github": ""  // https://github.com/jquemada. Solo para comprobar q no se muestra
}]
  res.render('authors', { "authors": authors_list });
};
