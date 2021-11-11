const pg = require('pg');

const connection = new pg.Pool({
    user: 'vignesla',
    password: 'zLUm9B2af2g5YXYiazX0ApLHZ7XZWM2E',
    host: 'satao.db.elephantsql.com',
    database: 'vignesla',
    max : 5
});

module.exports = connection;
