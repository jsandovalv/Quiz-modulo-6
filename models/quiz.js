// Definicion del modelo Quiz

module.exports = function(sequelize, DataType){
  return sequelize.define('Quiz',
              { pregunta: {
                type: DataType.STRING,
                validate: {
                notEmpty: true}
              },
                respuesta: {
                  type: DataType.STRING,
                    validate: {
                    notEmpty: true}
              }
          }
          );
}
