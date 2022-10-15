const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { secret } = require('../config/config.json');
const db = require('../config/db');

function omitHash(user) {
    const { password, ...userWithoutHash } = user;
    return userWithoutHash;
}

async function authenticate(body) {
    const user = await db.User.scope('withHash').findOne({ where: { email:body.email } });
    if (!user || !(await bcrypt.compare(body.password, user.password)))
        throw 'Email or password is incorrect';
    const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '7d' });
    return { ...omitHash(user.get()), token };
}

async function create(params) {
    if (await db.User.findOne({ where: { email: params.email } })) {
        throw 'Username "' + params.email + '" is already taken';
    }
    if (params.password) {
        params.password = await bcrypt.hash(params.password, 10);
    }
    await db.User.create(params);
}




module.exports = {
    authenticate,
    create,
};