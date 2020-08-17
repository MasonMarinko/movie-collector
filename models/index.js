const User = require('./User');
const Movie = require('./Movie');
const Vote = require('./Vote');
const Comment = require('./Comment');
const Book = require('./Book');
const BookComment = require('./BookComment');

// create associations
User.hasMany(Movie, {
    foreignKey: 'user_id'
});

Movie.belongsTo(User, {
    foreignKey: 'user_id',
});

User.belongsToMany(Movie, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
  });
  
  Movie.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
  });

Vote.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
  Vote.belongsTo(Movie, {
    foreignKey: 'post_id'
  });
  
  User.hasMany(Vote, {
    foreignKey: 'user_id'
  });
  
  Movie.hasMany(Vote, {
    foreignKey: 'post_id'
  });

  Comment.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
  Comment.belongsTo(Movie, {
    foreignKey: 'post_id'
  });
  
  User.hasMany(Comment, {
    foreignKey: 'user_id'
  });
  
  Movie.hasMany(Comment, {
    foreignKey: 'post_id'
  });

  // book associations
User.hasMany(Book, {
    foreignKey: 'user_id'
});

Book.belongsTo(User, {
    foreignKey: 'user_id',
});

// User.belongsToMany(Book, {
//     through: Vote,
//     as: 'voted_posts',
//     foreignKey: 'user_id'
//   });
  
  // Book.belongsToMany(User, {
  //   through: Vote,
  //   as: 'voted_posts',
  //   foreignKey: 'post_id'
  // });
  
Vote.belongsTo(Book, {
    foreignKey: 'post_id'
  });
  
  Book.hasMany(Vote, {
    foreignKey: 'post_id'
  });

  // Comment.belongsTo(Book, {
  //   foreignKey: 'post_id'
  // });
  
  // Book.hasMany(Comment, {
  //   foreignKey: 'post_id'
  // });
  Book.hasMany(BookComment, {
    foreignKey: 'post_id'
  });

  BookComment.belongsTo(Book, {
    foreignKey: 'post_id'
  });

  User.hasMany(BookComment, {
    foreignKey: 'post_id'
  });

  BookComment.belongsTo(User, {
    foreignKey: 'user_id'
  });

module.exports = { User, Movie, Vote, Comment, Book, BookComment };