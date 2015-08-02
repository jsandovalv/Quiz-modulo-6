var models = require('../models/models.js')

var estadisticas = {
  preguntas: 0,
  comentarios: 0,
  promedioComentarioPregunta: 0,
  preguntasConComentario: 0,
  preguntasSinComentario: 0,
};

exports.index = function(req , res, next) {

    models.Quiz.count().
        then(function(quizes){
          estadisticas.preguntas=quizes;

        }).then(function(){
            models.Comment.count({where: ['publicado is 1']}).then(function(comentarios){
              estadisticas.comentarios=comentarios;
              estadisticas.promedioComentarioPregunta= (estadisticas.comentarios/estadisticas.preguntas).toFixed(2);
            });

          }).then(function(){
              models.Quiz.count({
                distinct: true,
                where: [ '"Comments"."QuizId" not NULL and "Comments"."publicado" is 1' ],
                include: [{model: models.Comment,required: false}]
              }).then(function(count){
                estadisticas.preguntasConComentario=count;
              });

          }).then(function(){
              models.Quiz.count({
                distinct: true,
                where: [ '"Comments"."QuizId" is null' ],
                include: [{model: models.Comment,required: false}]
                }).then(function(count){
                  estadisticas.preguntasSinComentario=count;
                  res.render('quizes/statistics', { estadisticas: estadisticas , errors: []})
            });
        })
}
