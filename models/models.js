var path = require('path');
var Sequelize = require('sequelize');

var sequelize = new Sequelize(process.env.DATABASE_URL);
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
exports.Quiz = Quiz;

sequelize.sync().then(function() {
  Quiz.count().then(function(count) {
    if (count === 0){
      Quiz.create({
        "pregunta": "Capital de Italia",
        "respuesta": "Roma"
      });
      Quiz.create({
        "pregunta": "Capital de Portugal",
        "respuesta": "Lisboa"
      });
      Quiz.create({
        "pregunta": "Capital de Cuba",
        "respuesta": "La Habana"
      }).then(function() { console.log('Base de datos inicializada') });
    }
  });
});
