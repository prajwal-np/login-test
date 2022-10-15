const express = require('express');
const router = express.Router();

const { authenticateSchema, registerSchema } = require('./auth.validate');
const authService = require('./auth.service');

router.post('/login', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);

module.exports = router;

function authenticate(req, res, next) {
    authService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function register(req, res, next) {
    authService.create(req.body)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(next);
}
