const Sequelize = require("sequelize");

const connection = new Sequelize("guiaperguntas", "root", "687816gg",{
    host: "localhost",
    dialect: "mysql"
});

module.exports = connection;


