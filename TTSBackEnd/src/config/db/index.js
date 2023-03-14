const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'tmdt',
});

con.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + con.threadId);
});

module.exports = con;