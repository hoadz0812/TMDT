const con = require('../config/db')

const getProductById =  async (productIds,  callback) => {

     con.query(`SELECT idProduct, nameProduct, price, img1  FROM product WHERE idProduct in (${productIds})`, async function  (error, results) {
        if (error) {
            console.log('err', error);
        }
           await callback(results);
    });
    
}

module.exports = {
    getProductById
}
