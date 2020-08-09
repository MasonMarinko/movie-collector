const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Movie model
class Movie extends Model {
    static upvote(body, models) {
      return models.Vote.create({
        user_id: body.user_id,
        post_id: body.post_id,
        director: body.director,
        actors: body.actors
      }).then(() => {
        return Movie.findOne({
          where: {
            id: body.post_id
          },
          attributes: [
            'id',
            'post_url',
            'title',
            'director',
            'actors',
            'created_at',
          ]
        });
      });
    }
  }

// create fields/columns for Movie model
Movie.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_url: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
              isUrl: true
            }
        },
        director: {
          type: DataTypes.STRING,
          allowNull: true
        },
        actors: {
          type: DataTypes.STRING,
          allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'movie'
    }
);

module.exports = Movie;