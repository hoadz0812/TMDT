const express = require('express');
const router = express.Router();
const adminController = require('../controller/AdminController');

router.post('/sign-up', adminController.createAdmin);
router.post('/sign-in', adminController.loginAdmin);
router.post('/search/', adminController.searchAdminByName);
router.get('/get-admin', adminController.getAllAdmin);
router.get('/get-admin/:id', adminController.getAdminById);
router.put('/update-admin/:id', adminController.updateAdmin);
router.delete('/delete-admin/:id', adminController.deleteAdmin);
// 

module.exports = router;