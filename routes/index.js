var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' ,errors: []});
});

//Autoload de comandos con :quizId
router.param('quizId' , quizController.load); //autoload :quizId
router.param('commentId' , commentController.load); //autoload :commentId

//Definicion de rutas de sesion
router.get('/login',sessionController.new); //formulario login
router.post('/login',sessionController.create); // crear sesion
router.get('/logout',sessionController.destroy); //destruir session

// Definicion de rutas de /quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new_pregunta' , quizController.new_pregunta);
router.post('/quizes/create' , sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired , quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired , quizController.update);
router.delete('/quizes/:quizId(\\d+)' , sessionController.loginRequired , quizController.destroy);

//Definicion de rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', commentController.publish);

router.get('/author',function(req, res) {
  res.render('author',{autor: "Jorge Sandoval", pais: "Chile",errors: []});
});
module.exports = router;
