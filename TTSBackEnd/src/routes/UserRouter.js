const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

router.get('/all-user', userController.getAllUser)
router.post('/sign-up', userController.createUser);
router.post('/sign-in', userController.loginUser);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUser)

module.exports = router;
