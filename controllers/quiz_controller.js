var models = require('../models/models.js')

//Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req , res, next , quizId) {
  models.Quiz.find(quizId).then(
    function(quiz){
      if(quiz){
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId = ' + quizId));}
    }
  ).catch(function(error) { next(error);});
};

//GET /quizes/:id
exports.show = function(req, res) {
  models.Quiz.find(req.params.quizId).then( function(quiz) {
    res.render('quizes/show',{ quiz: req.quiz});
  })
};

//GET /quizes/:id/answer
exports.answer = function(req, res) {
  models.Quiz.find(req.params.quizId).then( function(quiz) {
    if(req.query.respuesta === req.quiz.respuesta) {
      res.render('quizes/answer',
            { quiz: req.quiz, respuesta: 'Correcto'});
    } else {
      res.render('quizes/answer',
            { quiz: req.quiz, respuesta: 'Incorrecta'});
    }
  })
};

//GET /quizes
exports.index = function(req, res) {
  var search = " ";
  if(req.query.search !== undefined){
  var search = req.query.search;
}
  search =search.replace(/(\s*)([^\s]+)?(\s+|$)/mg,"%$2")
  console.log(search);
  models.Quiz.findAll({where:["pregunta like ?",search] ,order:["pregunta"]}).then(function(quizes) {
    res.render('quizes/index.ejs', { quizes: quizes});
  })
};

//GET /quizes/new
exports.new_pregunta= function(req , res) {
  var quiz = models.Quiz.build(
    { pregunta: "Pregunta",  respuesta: "Respuesta"}
  );
  console.log(quiz);

  res.render('quizes/new_pregunta', { quiz: quiz} );
};

//POST /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz);
  quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
    res.redirect('/quizes');
  })
};
