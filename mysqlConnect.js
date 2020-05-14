const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'realestate',
    port: 3308
});

connection.connect((error) => {
    if(error)
        throw error;
    console.log('sql working...');
});


module.exports = connection;