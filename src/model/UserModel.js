const connection = require('../config/db');

const getAllUsers = (callback) => {
    connection.query('SELECT * FROM tbl_customers', function (error, results) {
        if (error) {
            console.log('err', error);
        }
        callback(results);
    });
};

module.exports = { getAllUsers };
