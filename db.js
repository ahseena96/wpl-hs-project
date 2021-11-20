const Pool  = require("pg").Pool;

const pool = new Pool({
    user: "aneeshad",
    database: "hsdb",
    host: "localhost",
    port: 5432
});

module.exports = pool;
