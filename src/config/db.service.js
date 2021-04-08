const pool = require('./database');


module.exports = {
    db_bild: callback => {

        pool.query(
            "DROP TABLE IF EXISTS api_posts;\
            CREATE TABLE api_posts(\
                ID SERIAL PRIMARY KEY,\
                post_author TEXT,\
                post_date TIMESTAMPTZ DEFAULT Now(),\
                post_content TEXT,\
                post_title TEXT,\
                post_excerpt TEXT,\
                post_status TEXT DEFAULT 'publish');"
        );
    },
}