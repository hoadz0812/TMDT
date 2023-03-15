const AdminModel = require('../model/AdminModel');
const bcrypt = require('bcrypt');

const getAllAdmin = (req, res) => {
    AdminModel.getAllAdmin(function (users) {
        res.send(users);
    });
};

const getAdminById = (req, res) => {
    const id = req.params.id;
    UserModel.getAdminById(id, function (admin) {
        res.send(admin);
    });
};

const searchAdminByName = (req, res) => {
    const ad = req.query.q;
    AdminModel.searchAdminByName(ad, function (admin) {
        res.send(admin);
    });
};

const createAdmin = (req, res) => {
    const admin = req.body;

    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[A-Z][a-zA-Z0-9!@#$%^&*]{8,15}$/;

    // Loi bo trong du lieu
    if (!admin.username || !admin.password) {
        return res.json({
            msg: 'Trường dữ liệu không được để trống',
        });
    } else if (!passwordRegex.test(admin.password)) {
        return res.json({
            message: 'Mật khẩu cần có chữ cái đầu in hoa, ít nhất 1 kí tự viết thường, 1 chữ số và 1 kí tự đặc biệt, từ 8 - 15 kí tự',
        });
    }

    admin.password = bcrypt.hashSync(admin.password, 10);

    AdminModel.checkAdmin(admin.username, (userCheck) => {
        if (!userCheck) {
            AdminModel.createAdmin(admin, function (result) {
                res.json({
                    msg: 'Đăng ký thành công',
                    data: result,
                });
            });
        } else {
            res.json({
                msg: 'Username đã tồn tại!',
            });
        }
    });
};

const updateAdmin = (req, res) => {
    const id = req.params.id;
    const admin = req.body;

    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[A-Z][a-zA-Z0-9!@#$%^&*]{8,15}$/;
    console.log('ctl line 63:', admin);
    // Loi bo trong du lieu
    if (!admin.username || !admin.password || !admin.isSuper) {
        return res.json({
            msg: 'Trường dữ liệu không được để trống',
        });
    } else if (!passwordRegex.test(admin.password)) {
        return res.json({
            message: 'Mật khẩu cần có chữ cái đầu in hoa, ít nhất 1 kí tự viết thường, 1 chữ số và 1 kí tự đặc biệt, từ 8 - 15 kí tự',
        });
    }

    admin.password = bcrypt.hashSync(admin.password, 10);
    //
    AdminModel.checkAdmin(admin.username, (adminCheck) => {
        if (!adminCheck) {
            AdminModel.updateAdmin(id, admin, function (result) {
                // res.send(rowsAffected.toString());
                res.json({
                    msg: 'Cập nhật thành công',
                    result,
                });
            });
        } else {
            res.json({
                msg: 'Username đã tồn tại!',
            });
        }
    });
};

const deleteAdmin = (req, res) => {
    const id = req.params.id;
    AdminModel.deleteAdmin(id, function (rowsAffected) {
        res.json({
            msg: 'Xóa thành công!',
        });
    });
};

const loginAdmin = (req, res) => {
    const admin = req.body;

    //

    // Loi bo trong du lieu
    if (!admin.username || !admin.password) {
        return res.json({
            msg: 'Trường dữ liệu không được để trống',
        });
    }

    AdminModel.loginAdmin(admin, (results) => {
        const comparePassword = bcrypt.compareSync(admin.password, results.password);
        if (!comparePassword) {
            res.json({
                msg: 'Thông tin tài khoản hoặc mật khẩu không chính xác',
            });
        } else {
            res.json(results);
        }
    });
};

module.exports = {
    getAllAdmin,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    searchAdminByName,
    loginAdmin,
};
