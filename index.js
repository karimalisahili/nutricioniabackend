const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;


const pool = require('./db');
const routes = require('./routes');

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200
};

app.use(cors());
app.use(express.json());

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});