const userRouter = require('./userRouter');
// const productRouter = require('./productRouter')

const routes = (app) => {
    app.use('/api/user', userRouter);
    // app.use('/api/prodct', productRouter);
};

module.exports = routes;
