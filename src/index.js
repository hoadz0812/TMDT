const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
dotenv.config()

const port = process.env.PORT;
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors())

routes(app);
require('./routes/image.router')(app)
app.use('/', (req, res) => {
    res.send('Hello word!!!');
});

app.listen(port, () => {
    console.log(`listening port ${port}`);
});
