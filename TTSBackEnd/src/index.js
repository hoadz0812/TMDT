const express = require('express');
const port = 4000;
const db = require('./config/db');
const routes = require('./routes');
const cors = require('cors')

db.connect();
const app = express();

app.use(cors());
app.use(express.json());

routes(app);

app.listen(port, () => console.log(`Example app listening at http:localhost:${port}`));
