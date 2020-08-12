const router = require('express').Router();
const sequelize = require('../config/connection');
const { Movie, User, Comment, Book }= require('../models');

// res.render('homepage', { 
//   movies,
// loggedIn: req.session.loggedIn
// });


router.get('/', (req, res) => {
  let movies;
  let books;
    Movie.findAll({
      attributes: [
        'id',
        'post_url',
        'title',
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
        // pass a single post object into the homepage template
        movies = dbPostData.map(post => post.get({ plain: true }));
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
          books = dbPostBooksData.map(post => post.get({ plain: true }));
          res.render('homepage', { 
            movies,
            books,
          loggedIn: req.session.loggedIn
          });
        })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
  });

  router.get('/movie/:id', (req, res) => {
    Movie.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'post_url',
        'title',
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
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
  
        // serialize the data
        const movie = dbPostData.get({ plain: true });
  
        // pass data to template
        res.render('single-post', { 
          movie,
        loggedIn: req.session.loggedIn 
      });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
module.exports = router;