//GET /quizes/question
exports.question = function(req, res){
  res.render('quizes/question', { "pregunta": "Capital de Italia" })
};

//GET /quizes/answer
exports.answer = function(req, res){
  var evaluacion = (req.query.respuesta === 'Roma') ? 'Correcto' : 'Incorrecto';
  res.render('quizes/answer', { "respuesta": evaluacion });
};

//GET /author
exports.author = function(req, res){
  authors_list = [{
    "name": "Roberto Damián Alfonso",
    "desc": "Sobre mí...",
    "contacts": {
      "fb": "https://www.facebook.com/rdamian.alfonso",
      "in": "https://www.linkedin.com/in/robertodamian"
    }
  }]
  res.render('authors', {autors: authors_list});
};
