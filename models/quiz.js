// Definicion del modelo Quiz

module.exports = function(sequelize, DataType){
  return sequelize.define('Quiz',
              { pregunta: {
                type: DataType.STRING,
                validate: {
                notEmpty: {msg: '-> Falta pregunta'}},
                not: "Pregunta"
              },
                respuesta: {
                  type: DataType.STRING,
                    validate: {
                    notEmpty: {msg: '-> Falta respuesta'}},
                    not: "Respuesta"
                    
              }
          }
          );
}
