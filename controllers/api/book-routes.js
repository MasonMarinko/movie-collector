const router = require('express').Router();
const sequelize = require('../../config/connection');
const {
    Book,
    User,
    Vote,
    Comment
} = require('../../models');
const withAuth = require('../../utils/auth')

// get all users
router.get('/', (req, res) => {
    console.log('=====================');
    Book.findAll({
            order: [
                ['created_at', 'DESC']
            ],
            attributes: [
                'id',
                'post_url',
                'book_title',
                'alt_title',
                'author',
                'created_at',
                [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE book.id = vote.post_id)'), 'vote_count']
            ],
            include: [
                // include the Comment model here:
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
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

router.get('/:id', (req, res) => {
    Book.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'post_url',
                'book_title',
                'alt_title',
                'author',
                'created_at',
                [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE book.id = vote.post_id)'), 'vote_count']

            ],
            include: [
                // include the Comment model here:
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({
                    message: 'No post found with this ID'
                });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
    Book.create({
            title: req.body.title,
            post_url: req.body.post_url,
            director: req.body.director,
            actors: req.body.actors,
            user_id: req.session.user_id
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/upvote', (req, res) => {
    // make sure the session exists first
    if (req.session) {
      // pass session id along with all destructured properties on req.body
      Book.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
        .then(updatedVoteData => res.json(updatedVoteData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    }
  });

router.put('/:id', (req, res) => {
    Book.update({
            title: req.body.title,
            post_url: req.body.post_url,
            director: req.body.director,
            actors: req.body.actors,
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({
                    message: 'No post found with this id'
                });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    Book.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({
                    message: 'No post found with this id'
                });
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