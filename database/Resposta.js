const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define("respostas", {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allownull: false,        
        validate:{
            notEmpty: true
        }
    }
});

Resposta.sync({force: false});

module.exports = Resposta;