const { createPost, readAllPost, readPost, updatePost, deletePosts } = require('./post.service');
const { checkToken } = require('../../auth/token_validation');
const json = require('express').json();

module.exports = {
    createPost: (req, res) => {
        const token = req.get("authorization").slice(7);
        const body = req.body;
        checkToken(token, (results, err) => {
            if (err) {
                console.log(err);
            }
            console.log(results['username'])
            if (results['success'] === 0) {
                res.json({
                    success: 0,
                    message: "Token Not Valid"
                })

            }
            else if (results['success'] !== 0) {
                const post_author = results["username"]
                const post_content = body.content
                const post_title = body.title
                const post_excerpt = body.excerpt
                const post_status = body.status
                const data = {};

                var keys = ["post_author", "post_content", "post_title", "post_excerpt", "post_status"];
                var values = [post_author, post_content, post_title, post_excerpt, post_status];
                for (var i = 0; i < keys.length; i++) {
                    data[keys[i]] = values[i];
                }

                createPost(data, (err, results) => {
                    if (err) {
                        console.log("error:", err);
                    }
                    if (!results) {
                        return res.json({
                            success: 0,
                            message: "Faild Creation Post"
                        });
                    }
                    if (results) {
                        return res.json({
                            success: 1,
                            message: "Creation Post successfully!"
                        });
                    }
                })

                // return res.json({
                //     data: data
                // })
            }
            else {
                res.json({
                    success: 0,
                    message: ""
                });
            }
        });
    },
    readAllPost: (req, res) => {
        const token = req.get("authorization").slice(7);
        checkToken(token, (results, err) => {
            if (err) {
                console.log(err);
            }
            if (results['success'] === 0) {
                res.json({
                    success: 0,
                    message: "Token Not Valid"
                });

            }
            if (results['success'] !== 0) {
                const post_author = results["username"]
                console.log(results)
                readAllPost(post_author, (err, results) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (results["rows"].length === 0) {
                        return res.json({
                            success: 0,
                            message: "Record not found!"
                        });
                    }
                    return res.json({
                        success: 1,
                        data: results["rows"]
                    });
                });
            }
        });
    },
    readPost: (req, res) => {
        const token = req.get("authorization").slice(7);
        const id = req.params.id;
        checkToken(token, (results, err) => {
            if (err) {
                console.log(err);
            }
            if (results['success'] === 0) {
                res.json({
                    success: 0,
                    message: "Token Not Valid"
                });

            }
            if (results['success'] !== 0) {
                const post_author = results["username"]
                readPost(post_author, id, (err, results) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (results["rows"].length === 0) {
                        return res.json({
                            success: 0,
                            message: "Record not found!"
                        });
                    }
                    return res.json({
                        success: 1,
                        data: results["rows"]
                    });
                });
            }
        });
    },
    updatePost: (req, res) => {
        const token = req.get("authorization").slice(7);
        const body = req.body;
        const id = req.params.id;
        checkToken(token, (results, err) => {
            if (err) {
                console.log(err);
            }
            if (results['success'] === 0) {
                res.json({
                    success: 0,
                    message: "Token Not Valid"
                })

            }
            if (results['success'] !== 0) {
                const post_author = results["username"]
                const post_id = id
                const post_content = body.content
                const post_title = body.title
                const post_excerpt = body.excerpt
                const post_status = body.status
                const data = {};

                var keys = ["post_id", "post_author", "post_content", "post_title", "post_excerpt", "post_status"];
                var values = [post_id, post_author, post_content, post_title, post_excerpt, post_status];
                for (var i = 0; i < keys.length; i++) {
                    data[keys[i]] = values[i];
                }
                updatePost(data, (err, results) => {
                    if (err) {
                        console.log("error:", err);
                    }
                    if (!results) {
                        return res.json({
                            success: 0,
                            message: "Faild Update Post"
                        });
                    }
                    if (results) {
                        return res.json({
                            success: 1,
                            message: "Update Post successfully!"
                        });
                    }
                })
            }
            else {
                res.json({
                    success: 0,
                    message: ""
                });
            }
        })
    },
    deletePosts: (req, res) => {
        const token = req.get("authorization").slice(7);
        const id = req.params.id;
        checkToken(token, (results, err) => {
            if (err) {
                console.log(err);
            }
            if (results['success'] === 0) {
                res.json({
                    success: 0,
                    message: "Token Not Valid"
                });

            }
            if (results['success'] !== 0) {
                const post_author = results["username"]
                console.log(post_author)
                deletePosts(post_author, id, (err, results) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (results["rowCount"] == 0) {
                        return res.json({
                            success: 0,
                            message: "Record not found!"
                        });
                    }
                    console.log(results)
                    if (results["rowCount"] == 1) {
                        return res.json({
                            success: 1,
                            message: "Delete post successfully!"
                        });
                    }
                });
            }
        });
    },

}