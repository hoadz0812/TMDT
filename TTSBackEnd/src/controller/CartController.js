const CartModel = require("../model/CartModel");
const ProductModel = require("../model/ProductModel");

const getCart = (req, res) => {
  const idUser = req.params.idUser;

  CartModel.getCart(idUser, function (carts) {
    let objProduct = JSON.parse(carts[0].product);
    const productIds = objProduct.map((item) => item.idProduct).join(",");

    console.log(objProduct);
    ProductModel.getProductById(productIds, function (pr) {
      product = objProduct.map((qty) => {
        const product = JSON.parse(JSON.stringify(pr)).find(
          (prod) => prod.idProduct === qty.idProduct
        );
        return { ...qty, ...product };
      });

      res.send({ ...carts[0], product });
    });
  });
};

const addCart = (req, res) => {
  const { idUser, idProduct, quantity } = req.body;

  CartModel.findCartById(idUser, function (cart) {
    if (cart.length > 0) {
      console.log("da co gio hang")
      CartModel.getCart(idUser, function (carts) {
        let objProduct = JSON.parse(carts[0].product);
        const productIds = objProduct.map((item) => item.idProduct);

        const existProd = productIds.find((item) => item == idProduct);
        if (existProd) {
          console.log("san pham da ton tai");
          CartModel.getCart(idUser, function (carts) {
            let objProduct = JSON.parse(carts[0].product);

            const updateCartProduct = objProduct.map((item) => {
              if (item.idProduct == idProduct) {
                return {
                  ...item,
                  quantity: item.quantity + parseInt(quantity),
                };
              }
              return item;
            });
            CartModel.addProdtoCart(JSON.stringify(updateCartProduct), idUser);
          });
        } else {
          console.log('them san pham moi')
          const product = {
            idProduct: idProduct,
            quantity: quantity,
          };
          product.idProduct = parseInt(product.idProduct);
          product.quantity = parseInt(product.quantity);
          objProduct.push(product);
          
          CartModel.addProdtoCart(JSON.stringify(objProduct), idUser);
        }
      });
    } else {
      console.log('chưa co giở hàng')
      const product = {
        idProduct: idProduct,
        quantity: quantity,
      };

      let arr = [];
      product.idProduct = parseInt(product.idProduct);
      product.quantity = parseInt(product.quantity);

      arr.push(product);
      console.log(arr);

      CartModel.addCart(JSON.stringify(arr), idUser);
      console.log('da them gio hang')
    }
  });
};

const updateCart = (req, res) => {
  const { idUser, idProduct, quantity } = req.body;

  CartModel.getCart(idUser, function (carts) {
    let objProduct = JSON.parse(carts[0].product);

    const updateCartProduct = objProduct.map((item) => {
      if (item.idProduct == idProduct) {
        return { ...item, quantity: parseInt(quantity) };
      }
      return item;
    });

    console.log(updateCartProduct);

    CartModel.addProdtoCart(JSON.stringify(updateCartProduct), idUser);
  });
};

const delCart = (req, res) => {
  const { idProduct, idCart } = req.body;
  CartModel.delCart({ idProduct, idCart }, function (carts) {
    res.send(carts);
  });
};

module.exports = {
  getCart,
  updateCart,
  addCart,
  delCart,
};
