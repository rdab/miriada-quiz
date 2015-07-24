var models = require('../models/models');

//GET /quizes/question
exports.question = function(req, res){
  models.Quiz.findAll().success(function(quiz) {
    res.render('quizes/question', { "pregunta": quiz[0].pregunta })
  });
};

//GET /quizes/answer
exports.answer = function(req, res){
  models.Quiz.findAll().success(function(quiz) {
    var evaluacion = (req.query.respuesta === quiz[0].respuesta) ? 'Correcto' : 'Incorrecto';
    res.render('quizes/answer', { "respuesta": evaluacion });
  });
};

//GET /author
exports.author = function(req, res){
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
