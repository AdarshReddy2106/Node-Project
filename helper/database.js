const mysql = require('mysql2'); 

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-project',
    password: 'Adarsh@100%'
})

module.exports = pool.promise(); // export the pool object with promise support