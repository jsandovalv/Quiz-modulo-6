// Definicion del modelo Quiz

module.exports = function(sequelize, DataType){
  return sequelize.define('Quiz',
              { pregunta: {
                type: DataType.STRING,
                validate: {
                notEmpty: {msg: '-> Falta pregunta'},
                notIn: {args: [["Pregunta"]], msg: "-> Falta Pregunta" }

            }
          },
                respuesta: {
                  type: DataType.STRING,
                    validate: {
                    notEmpty: {msg: '-> Falta respuesta'} ,
                    notIn: {args: [["Respuesta"]], msg: "-> Falta Respuesta" }

              }
          }
        }
          );
}
