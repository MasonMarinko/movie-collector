const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BookComment extends Model {}

BookComment.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      comment_text: {
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
          model: 'movie',
          key: 'id'
  }
}
},
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'bookcomment'
  }
);

module.exports = BookComment;