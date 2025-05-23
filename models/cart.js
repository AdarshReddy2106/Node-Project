const Sequelize = require('sequelize');
const sequelize = require('../helper/database'); // import the sequelize instance

const Cart = sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Cart; // export the Cart model so it can be used in other files