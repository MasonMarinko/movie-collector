const User = require('./User');
const Movie = require('./Movie');
const Vote = require('./Vote');
const Comment = require('./Comment');
const Book = require('./Book');

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


module.exports = { User, Movie, Vote, Comment };