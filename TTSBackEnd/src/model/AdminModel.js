const connection = require('../config/db');

const getAllAdmin = (callback) => {
    connection.query('SELECT * FROM admin', function (error, results) {
        if (error) {
            console.log('err', error);
        }
        callback(results);
    });
};

const getAdminById = (id, callback) => {
    connection.query('SELECT * FROM admin WHERE idAdmin = ?', id, function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
};

const searchAdminByName = (name, callback) => {
    q = `%${name}%`;
    connection.query(`SELECT * FROM admin WHERE username LIKE ?`, q, function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
};

const checkAdmin = (username, callback) => {
    connection.query('SELECT * FROM admin WHERE username = ?', username, function (error, results, fields) {
        if (error) throw error;
        callback(results[0]);
    });
};

const createAdmin = (admin, callback) => {
    connection.query(`INSERT INTO admin SET username = "${admin.username}", password = "${admin.password}"`, function (error, results, fields) {
        if (error) {
            throw error;
        } else {
            callback(results);
        }
    });
};

const updateAdmin = (id, admin, callback) => {
    connection.query(
        `UPDATE admin SET username = "${admin.username}", password = "${admin.password}", isSuper = "${admin.isSuper}" WHERE idAdmin = ?`,
        id,
        function (error, results, fields) {
            if (error) {
                throw error;
            } else {
                callback(results);
            }
            // callback(results.affectedRows);
        },
    );
};

const deleteAdmin = (id, callback) => {
    connection.query(`DELETE FROM admin WHERE idAdmin = ?`, id, (error, results, fields) => {
        if (error) {
            throw error;
        } else {
            callback(results.affectedRows);
        }
    });
};

const loginAdmin = (admin, callback) => {
    connection.query(`SELECT * FROM admin WHERE username = '${admin.username}'`, function (error, results, fields) {
        if (error) throw error;
        callback(results[0]);
    });
};

module.exports = {
    getAllAdmin,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    searchAdminByName,
    checkAdmin,
    loginAdmin,
};
