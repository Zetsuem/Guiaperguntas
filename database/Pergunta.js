const Sequelize = require("sequelize");
const connection = require("./database")


// Nome da tabela a ser criada
const Pergunta = connection.define('perguntas',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

Pergunta.sync({force: false}).then(()=>{ // o json aqui é usada, para se a tabela Já existir, não ser recriada outra.
    console.log("Tabela criada!")
})

module.exports = Pergunta;



// Responsavel por criar a tabela e suas partes no mysql