const express = require('express');
const router = express.Router();
const CartController = require('../controller/CartController');

router.get('/:idUser', CartController.getCart);
router.post('/update', CartController.updateCart);
router.post('/add', CartController.addCart)
router.delete('/delete', CartController.delCart);


module.exports = router;
