const Sequelize = require('sequelize');

const sequelize = require('../helper/database'); // import the sequelize instance

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
});

module.exports = Order; // export the Cart model so it can be used in other files