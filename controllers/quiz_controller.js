var models = require('../models/models.js')

//Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req , res, next , quizId) {
  models.Quiz.find({
                    where: { id: Number(quizId) },
                    include: [{model: models.Comment}]
                  }).then(function(quiz){
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
    res.render('quizes/show',{ quiz: req.quiz,errors: []});
  })
};

//GET /quizes/:id/answer
exports.answer = function(req, res) {
  models.Quiz.find(req.params.quizId).then( function(quiz) {
    if(req.query.respuesta === req.quiz.respuesta) {
      res.render('quizes/answer',
            { quiz: req.quiz, respuesta: 'Correcto',errors: []});
    } else {
      res.render('quizes/answer',
            { quiz: req.quiz, respuesta: 'Incorrecta',errors: []});
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
    res.render('quizes/index.ejs', { quizes: quizes,errors: []});
  })
};

//GET /quizes/new
exports.new_pregunta= function(req , res) {
  var quiz = models.Quiz.build(
    { pregunta: "Pregunta",  respuesta: "Respuesta", tema: "Otro"}
  );

  res.render('quizes/new_pregunta', { quiz: quiz,errors: []} );
};

//POST /quizes/create
exports.create = function(req, res) {
  console.log(req.body.quiz);
  var quiz = models.Quiz.build( req.body.quiz);

  quiz.validate()
  .then(
    function(err){
      if (err){
        res.render('quizes/new_pregunta', {quiz: quiz, errors: err.errors});
      } else {
        quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(function(){
          res.redirect('/quizes')})
      }
    }
  );
};

//GET quizes/:id/edit
exports.edit = function(req ,res){
  var quiz = req.quiz // autoload de instancia de quiz
  res.render('quizes/edit',{quiz: quiz , errors: []});

}

//PUT /quizes/:id
exports.update = function(req , res) {
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.quiz.tema;
  req.quiz.validate().then(function(err){
    if(err){
      res.render('quizes/edit',{quiz: req.quiz, errors: err.errors});
    } else {
      req.quiz.save({fields: ["pregunta" , "respuesta","tema"]}).
      then(function(){
        res.redirect('/quizes');
      })
    }
  })
}

//DELETE /quizes/:id
exports.destroy = function (req ,res){
  req.quiz.destroy().then(function(){
    res.redirect('/quizes');
  }).catch(function(error){ next(error)});
}
