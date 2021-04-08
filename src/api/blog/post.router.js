const router = require('express').Router();
const { createPost,readAllPost,readPost,updatePost,deletePosts } = require('./post.controller');

router.post('/', createPost);
router.get('/', readAllPost);
router.get('/:id', readPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePosts);
 
module.exports = router;