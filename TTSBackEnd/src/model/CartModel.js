const con = require("../config/db");

const getCart = (idUser, callback) => {
  con.query(
    `SELECT * FROM cart WHERE cart.idUser =  '${idUser}' and cart.status = 0`,
    function (error, results) {
      if (error) {
        console.log("err", error);
      }
      callback(results);
    }
  );
};

const findProdInCart = ({product, idCart, idUser}, callback) => {
  con.query(`SELECT * FROM cart where  cart.idCart = ${idCart} and cart.idUser = ${idUser}`, function(err, results) {
      callback(results);
  })
}

const findCartById = (idUser, callback) => {
  con.query(
    `select * from cart where cart.status = 0 and cart.idUser = '${idUser}'`,
    function (err, results) {
      callback(results);
    }
  );

  // con.query(`insert into cart set  idUser = ${idUser},  idProduct = ${idProduct} , quantity = ${quantity}`, function(err, results){
  //     if (err) {
  //         console.log(err)
  //     }
  //     callback(results);
  // })
};

const updateCart = ({ cartId, product }, callback) => {
  con.query(
    `INSERT cart SET product = '${product}' WHERE idCart = '${cartId}'`,
    function (error, results) {
      if (error) {
        console.log(error);
      }
      callback(results);
    }
  );
};

const delCart = ({ idProduct, idCart }, callback) => {
  con.query(
    `DELETE FROM cart WHERE idCart = ${idCart} `,
    function (error, results) {
      if (error) {
        console.log(error);
      }
      callback(results);
    }
  );
};

const addCart = (product, idUser) => {
  con.query(
    `INSERT INTO cart (idUser, Product, status) values (${idUser}, '${product}', 0) `
  );
};

const addProdtoCart = (product, idUser) => {
  con.query(`UPDATE cart set product = '${product}' where idUser = ${idUser}`)
}

module.exports = { getCart, updateCart, findCartById, delCart, addCart, addProdtoCart, findProdInCart };
