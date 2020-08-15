const router = require('express').Router();
const { BookComment, Comment, Movie, Book } = require('../../models');
const withAuth = require('../../utils/auth')

router.get('/', (req, res) => {
    BookComment.findAll({
        attributes: [
            'id', 
            // added book to comment_text below
            'book_comment_text', 
            'user_id', 
            'post_id',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE book.id = vote.post_id)'), 'vote_count']
        ],
        order: [[ 'created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // check the session
  if (req.session) {
    BookComment.create({
      // added book to comment_text below
      book_comment_text: req.body.book_comment_text,
      post_id: req.body.post_id,
      // use the id from the session
      user_id: req.session.user_id
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

router.delete('/:id', (req, res) => {
  // added Book to delete
         (Book).destroy({
          where: {
            id: req.params.id
          }
        })
          .then(dbPostData => {
            if (!dbPostData) {
              res.status(404).json({ message: 'No post found with this id' });
              return;
            }
            res.json(dbPostData);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      });

module.exports = router;