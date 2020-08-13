const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');
const bookRoutes = require('./book-routes');
const bookCommentRoutes=require('./book-comment-routes')

router.use('/users', userRoutes);
router.use('/movies', postRoutes);
router.use('/movie/comments', commentRoutes);
router.use('/book/bookcomments', bookCommentRoutes)
router.use('/books', bookRoutes);

module.exports = router;