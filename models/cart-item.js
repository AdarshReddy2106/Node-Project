const Sequelize = require('sequelize');
const sequelize = require('../helper/database'); // import the sequelize instance

const CartItem = sequelize.define('cartItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

module.exports = CartItem;