const PostRouter = require('express').Router();

const { createPost, readAllPost, readPost, updatePost, deletePost,
    likePost, commentPost, readAllComment, deleteComment } = require('./post.controller');

PostRouter.post('/', createPost);
PostRouter.get('/', readAllPost);
PostRouter.get('/:id', readPost);
PostRouter.patch('/:id', updatePost);
PostRouter.delete('/:id', deletePost);
PostRouter.post('/like/:id', likePost);
PostRouter.post('/comment', commentPost);
PostRouter.delete('/comment/:id', deleteComment);
PostRouter.get('/comment/:id', readAllComment);


module.exports = PostRouter;