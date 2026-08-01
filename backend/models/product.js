'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }

  Product.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Title cannot be empty' },
          len: { args: [2, 150], msg: 'Title must be between 2 and 150 characters' }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: { args: [0], msg: 'Price must be a positive number' },
          isDecimal: { msg: 'Price must be a valid decimal number' }
        }
      },
      category: {
        type: DataTypes.STRING,
        defaultValue: 'General'
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          min: { args: [0], msg: 'Stock cannot be negative' },
          isInt: { msg: 'Stock must be an integer' }
        }
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'https://placehold.co/800x800/1e1e1e/white?text=Product'
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'Products'
    }
  );

  return Product;
};
