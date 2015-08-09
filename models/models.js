var path = require('path');
var Sequelize = require('sequelize');

// Inicializar ORM
var sequelize = new Sequelize(process.env.DATABASE_URL);

// Importar ficheros con definicion de modelos
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
var Comment = sequelize.import(path.join(__dirname, 'comment'))
var topics = require('./topic');

// Exportar modelos
exports.Quiz = Quiz;
exports.Comment = Comment
exports.Topics = topics;

// Poblar Quizes si no existen...
sequelize.sync().then(function() {
  Quiz.count().then(function(count) {
    if (count === 0){
      topic = {};
      for (var i in topics){
        if (topics[i].id == 'humanidades') {
          topic = topics[i];
          break;
        }
      }

      Quiz.create({
        "pregunta": "Capital de Italia",
        "respuesta": "Roma",
        "tema": topic.id
      });
      Quiz.create({
        "pregunta": "Capital de Portugal",
        "respuesta": "Lisboa",
        "tema": topic.id
      });
      Quiz.create({
        "pregunta": "Capital de Cuba",
        "respuesta": "La Habana",
        "tema": topic.id
      }).then(function() { console.log('Base de datos inicializada') });
    }
  });
});
