const { createPost, readAllPost, readPost, updatePost, deletePost,
    likePost, disLikePost, existLikePost, commentPost, readAllComment, deleteComment } = require('./post.service');
const { checkToken } = require('../../auth/token_validation');
const json = require('express').json();

module.exports = {

    createPost: (req, res) => {
        const body = req.body;
        const authorization = req.authorization;
        const post_author = authorization["username"];
        const post_content = body.content;
        const post_title = body.title;
        const post_excerpt = body.excerpt;
        const post_status = body.status;
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

    },
    readAllPost: (req, res) => {

        readAllPost((err, results) => {
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
    },
    readPost: (req, res) => {
        const id = req.params.id;
        readPost(id, (err, results) => {
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

    },
    updatePost: (req, res) => {
        const body = req.body;
        const id = req.params.id;
        const authorization = req.authorization;
        const post_author = authorization["username"];
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
    },
    deletePost: (req, res) => {
        const id = req.params.id;
        const authorization = req.authorization;
        const post_author = authorization["username"];
        deletePost(post_author, id, (err, results) => {
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
    },
    likePost: (req, res) => {
        const id = req.params.id;
        const authorization = req.authorization;
        console.log(authorization)
        const like_author = authorization["username"];
        readPost(id, (err, results) => {
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
            else {
                existLikePost(id, like_author, (err, results) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(results)
                    if (results['rowCount'] !== 0) {
                        disLikePost(like_author, id, (err, results) => {
                            if (err) {
                                console.log(err);
                            }
                            if (results["rowCount"] == 0) {
                                return res.json({
                                    success: 0,
                                    message: "Record not found!"
                                });
                            }
                            if (results["rowCount"] == 1) {
                                return res.json({
                                    success: 1,
                                    message: "dislike post successfully!"
                                });
                            }
                        });
                    }
                    if (results['rowCount'] === 0) {
                        likePost(like_author, id, (err, results) => {
                            if (err) {
                                console.log(err);
                            }
                            if (results["rowCount"] == 0) {
                                return res.json({
                                    success: 0,
                                    message: "Record not found!"
                                });
                            }
                            if (results["rowCount"] == 1) {
                                return res.json({
                                    success: 1,
                                    message: "like post successfully!"
                                });
                            }
                        });
                    }
                })

            }
        });
    },
    commentPost: (req, res) => {
        const body = req.body;
        const authorization = req.authorization;
        const comment_author = authorization["username"];
        const comment_post = body.comment
        const post_id = body.id

        commentPost(comment_author, comment_post, post_id, (err, results) => {
            if (err) {
                console.log("error:", err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Faild save comment"
                });
            }
            if (results) {
                return res.json({
                    success: 1,
                    message: "comment save successfully!"
                });
            }
        })

    },
    readAllComment: (req, res) => {
        const comment_id = req.params.id;
        readAllComment(comment_id, (err, results) => {
            if (err) {
                console.log(err);
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
    },
    deleteComment: (req, res) => {
        const comment_id = String(req.params.id);
        const authorization = req.authorization;
        const post_author = authorization["username"];
        deleteComment(post_author, comment_id, (err, results) => {
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
                    message: "Delete comment successfully!"
                });
            }
        });
    },


}