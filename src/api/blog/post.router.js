const router = require('express').Router();
const { createPost,readAllPost,readPost,updatePost,deletePost,likePost,commentPost,readAllComment,deleteComment } = require('./post.controller');

router.post('/', createPost);
router.get('/', readAllPost);
router.get('/:id', readPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/like/:id', likePost);
router.post('/comment', commentPost);
router.get('/comment/:id', readAllComment);
router.delete('/comment/:id', deleteComment);

module.exports = router;