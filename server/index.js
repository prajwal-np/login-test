require('rootpath')();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const basicAuth = require('express-basic-auth');

const app = express();app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/auth', require('./auth/auth.controller'));
app.use('/docs',basicAuth({
    users: {'admin': 'passme21'},
    challenge: true,
}), swaggerUi.serve, swaggerUi.setup(swaggerDocument, {}));

function errorHandler(err, req, res, next) {
    switch (true) {
        case typeof err === 'string':
            const is404 = err.toLowerCase().endsWith('not found');
            const statusCode = is404 ? 404 : 400;
            return res.status(statusCode).json({ message: err });
        default:
            return res.status(500).json({ message: err.message });
    }
}
app.use(errorHandler);

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));


