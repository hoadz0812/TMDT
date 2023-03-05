const User = require('../model/UserModel');

const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(email);

        if (!name || !email || !password) {
            return res.json({ msg: 'input is require' });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email',
            });
        }

        hash = bcrypt.hashSync(password, 10);
        const createdUser = await User.create({
            name,
            email,
            password: hash,
        });
        if (createdUser) {
            return res.json({
                status: 'OK',
                message: 'SUCCESS',
                data: createdUser,
            });
        }
    } catch (error) {
        res.send('error!');
    }
};

const loginUser = (req, res) => {};

const updateUser = async (req, res) => {
    const { name, email, password } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    const user = await User.findByIdAndUpdate(
        req.params.id,
        { name, email, password: hash },
        {
            new: true,
            runValidators: true,
            context: 'query',
        },
    );

    if (!user) return next(new ErrorResponse(`No user with that id of ${req.params.id}`));

    res.status(200).json({ success: true, data: user });
};

const deleteUser = async (req, res) => {
    try {
        console.log(req.params.id);
        await User.findByIdAndRemove(req.params.id, (err, user) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                });
            }

            return res.status(201).json({
                ok: true,
                user,
            });
        });
    } catch (error) {
        res.json({
            msg: 'error',
        });
    }
};

const getAllUser = async (req, res) => {
    try {
        const query = req.query.name
        const allUser = await User.find({name: { $regex: `${query}` }});
        return res.status(200).json(allUser);
    } catch (error) {
        return res.status(404).json({
            message: e,
        });
    }
};

module.exports = { createUser, loginUser, deleteUser, updateUser, getAllUser };
