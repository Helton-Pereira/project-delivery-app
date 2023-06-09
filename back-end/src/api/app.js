const express = require('express');
const cors = require('cors');
const path = require('path');
/* const loginRoute = require('./routes/loginRoute');
const registerRoute = require('./routes/registerRoute'); */
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/images', express.static(path.join(__dirname, '../../images')));
/* app.use('/login', loginRoute);

app.use('/register', registerRoute); */

app.use(routes);

module.exports = app;