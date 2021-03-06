var models = require('../models/models');

// Autoload
exports.load = function(req, res, next, quizId){
  models.Quiz.find({
    where: { id: Number(quizId) },
    include: [{ model: models.Comment }]
  }).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        // Autoload tema del quiz
        for (var i in models.Topics){
          if (models.Topics[i].id == quiz.tema) {
            req.quizTopic = models.Topics[i].name;
            break;
          }
        }
        next();
      } else { next(new Error('No existe quiz con el id: ' + quizId));}
    }
  ).catch(function(error) { next(error); });
};

// GET /quizes
// GET /quizes?search=filter_value
exports.index = function(req, res){
  search = req.query.search;
  filter = {};
  if (search) { // Si existe parametro 'search' filtrar el resultado
    search = '%' + search.trim().replace(/ +/g, '%') + '%';
    filter = { where: ["pregunta like ?", search] };
  }

  models.Quiz.findAll(filter).then(
    function(quizes){
      res.render('quizes/index', { quizes: quizes, errors: [] });
    }
  )
};

// GET /quizes/:id
exports.show = function(req, res){
  res.render('quizes/show', { quiz: req.quiz, topic: req.quizTopic, errors: [] })
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  var evaluacion = (req.query.respuesta === req.quiz.respuesta) ? 'Correcto' : 'Incorrecto';
  res.render('quizes/answer', { respuesta: evaluacion,
                                quiz: req.quiz,
                                errors: [] });
};

// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build({
    pregunta: "Pregunta",
    respuesta: "Respuesta",
    tema: models.Topics[0].id
    });
  res.render('quizes/new', { quiz: quiz, topics: models.Topics, errors: [] });
};

// POST /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build(req.body.quiz);

  quiz.validate().then( function(err) {
    if (err){
      res.render('quizes/new', { quiz: quiz, topics: models.Topics, errors: err.errors });
    } else {
      quiz.save({ fields: ["pregunta", "respuesta", "tema"] })
      .then( function(){ res.redirect('/quizes') });
    }
  });
};

// GET /quizes/:id/edit
exports.edit = function(req, res) {
  var quiz = req.quiz;
  res.render('quizes/edit', { quiz: quiz, topics: models.Topics, errors: [] })
};

// PUT /quizes/:id
exports.update = function (req, res) {
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.quiz.tema;

  req.quiz.validate().then( function(err) {
    if (err){
      res.render('quizes/edit', { quiz: req.quiz, topics: models.Topics, errors: err.errors });
    } else {
      req.quiz.save({ fields: ["pregunta", "respuesta", "tema"] })
      .then( function(){ res.redirect('/quizes') });
    }
  });
};

//DELETE /quizes/:id
exports.destroy = function (req, res) {
  req.quiz.destroy().then( function() {
    res.redirect('/quizes');
  }).catch(function(error) { next(error) });
}

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
  ]
  res.render('authors', { "authors": authors_list, errors: [] });
};
