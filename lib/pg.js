/**
 * A custom library to establish a database connection
 */

const { Pool } = require('pg');
let db;
let database = function () {
    return {
        /**
         * Create a pool for database
         * @param conf
         */
        config: function (conf) {
            db = new Pool(conf);
        },
        getDb: function () {
            return db;
        }
    };
};



module.exports = database();
