const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
//added Book to Comment to make BookComment through out this model
class BookComment extends Model {}
// added Book
BookComment.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      // added book to comment_text
      book_comment_text: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [4]
          }
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'book',
          key: 'id'
  }
}
},
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    //added book to comment for modelName.
    modelName: 'bookcomment'
  }
);
// added Book to Comment for module.exports. 
module.exports = BookComment;