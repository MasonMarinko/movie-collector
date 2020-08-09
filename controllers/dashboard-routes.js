const router = require('express').Router();
const sequelize = require('../config/connection');
const { Movie, User, Comment } = require('../models');
const withAuth = require('../utils/auth')

router.get('/', (req, res) => {
    Movie.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'post_url',
        'title',
        'director',
        'actors',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE movie.id = vote.post_id)'), 'vote_count']
      ],
      include: [
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
        // serialize data before passing to template
        const movies = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { movies, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/edit/:id', withAuth, (req, res) => {
    Movie.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_url',
            'title',
            'director',
            'actors',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE movie.id = vote.post_id)'), 'vote_count']
        ],
        include: [
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
            const movie = dbPostData.get({ plain: true });

            res.render('edit-post', {
                movie,
                loggedIn: true
            });
        });
});


module.exports = router;