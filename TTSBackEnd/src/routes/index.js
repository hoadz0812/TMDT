const userRouter = require('./userRouter');
const CartRouter = require('./CartRouter');

const routes = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/cart', CartRouter);
};

module.exports = routes;
