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
                post_status TEXT DEFAULT 'publish');\
            DROP TABLE IF EXISTS api_posts_like;\
            CREATE TABLE api_posts_like(\
                ID SERIAL PRIMARY KEY,\
                post_id TEXT,\
                like_author TEXT\
                );\
            DROP TABLE IF EXISTS api_posts_comments;\
            CREATE TABLE api_posts_comments(\
                ID SERIAL PRIMARY KEY,\
                post_id TEXT,\
                comment_author TEXT,\
                comment_post TEXT\
                );\
            "
        );
    },
}