const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-project', 'root', 'Adarsh@100%', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize; // export the sequelize instance