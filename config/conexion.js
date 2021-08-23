const { createPool } = require('mysql')

const connetc = createPool({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'users',
})

module.exports = connetc;
