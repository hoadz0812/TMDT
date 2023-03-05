const UserModel = require('../model/UserModel');
// const bcrypt = require('bcrypt');

const getAllUsers = (req, res) => {
    UserModel.getAllUsers(function (users) {
        res.send(users);
    });
};

module.exports = { getAllUsers };
