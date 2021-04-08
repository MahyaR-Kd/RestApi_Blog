const pool = require('../../config/database');

module.exports = {
    createPost: (data, callback) => {
        console.log(data.post_excerpt)

        pool.query(
            "INSERT INTO api_posts (post_author,post_content,post_title,post_excerpt,post_status) VALUES ($1,$2,$3,$4,$5) RETURNING *;",
            [
                data.post_author,
                data.post_content,
                data.post_title,
                data.post_excerpt,
                data.post_status

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results)
            }
        );
    },
    readAllPost: (auth, callback) => {
        pool.query(
            "SELECT * FROM api_posts WHERE post_author=$1",
            [auth],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    readPost: (auth, id, callback) => {
        pool.query(
            "SELECT * FROM api_posts WHERE post_author=$1 AND id=$2",
            [auth, id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    updatePost: (data, callback) => {
        pool.query(
            "UPDATE api_posts SET  post_content=$1, post_title=$2, post_excerpt=$3, post_status=$4 WHERE post_author=$5 AND id=$6",
            [
                data.post_content,
                data.post_title,
                data.post_excerpt,
                data.post_status,
                data.post_author,
                data.post_id
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    deletePosts: (auth, id, callback) => {
        pool.query(
            "DELETE FROM api_posts WHERE post_author=$1 AND id=$2",
            [   
                auth,
                id
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
}
