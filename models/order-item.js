const Sequelize = require('sequelize');
const sequelize = require('../helper/database'); // import the sequelize instance

const OrderItem = sequelize.define('orderItem', {
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

module.exports = OrderItem;