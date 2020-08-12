const router = require('express').Router();
const sequelize = require('../config/connection');
const { Movie, User, Comment, Book } = require('../models');
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
    .then(dbPostMovieData => {
      // serialize data before passing to template
      const movies = dbPostMovieData.map(post => post.get({ plain: true }));
    })
    Book.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
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
      .then(dbPostBooksData => {
        // serialize data before passing to template
        const books = dbPostBooksData.map(post => post.get({ plain: true }));
        res.render('dashboard', { books, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


  
  router.get('/edit/:id', (req, res) => {
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

// router.get('/', (req, res) => {
  
//     .then(dbPostData => {
//       // serialize data before passing to template
//       const books = dbPostData.map(post => post.get({ plain: true }));
//       res.render('dashboard', { books, loggedIn: true });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.get('/edit/:id', (req, res) => {
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
          const book = dbPostData.get({ plain: true });

          res.render('edit-post', {
              book,
              loggedIn: true
          });
      });
});

module.exports = router;