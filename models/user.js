const Sequelize = require('sequelize');

const sequelize = require('../helper/database'); // import the sequelize instance

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


module.exports = User; // export the User model so it can be used in other files