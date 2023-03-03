const express = require('express');
const cors = require('cors');
/* const loginRoute = require('./routes/loginRoute');
const registerRoute = require('./routes/registerRoute'); */
const routes = require('./routes');
// const checkoutRoute = require('./routes/checkoutRoute');

const app = express();

app.use(express.json());

app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(routes);

/* app.use('/login', loginRoute);

app.use('/register', registerRoute); */

// app.use('/customer/checkout', checkoutRoute);

module.exports = app;