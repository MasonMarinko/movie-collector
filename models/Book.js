const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Book model
class Book extends Model {
    static upvote(body, models) {
        return models.Vote.create({
            user_id: body.user_id,
            post_id: body.post_id,
            book_title: body.book_title,
            alt_title: body.alt_title,
            author: body.author
        }) .then(() => {
            return Book.findOne({
                where: {
                    id: body.post_id
                },
                attributes: [
                    'id',
                    'post_url',
                    'book_title',
                    'alt_title',
                    'author',
                    'created_at',
                ]
            })
        })
    }
}

// create fields/columns for Book model
Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        post_url: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
        book_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        alt_title: {
            type: DataTypes.STRING,
            allowNull: true
        },
        author: {
            type: DataTypes.STRING,
            //added this to allow the author to be blank upon submission
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
        modelName: 'book'
    }
);

module.exports = Book;