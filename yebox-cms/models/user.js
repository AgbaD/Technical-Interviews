'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(Blog, { foreignKey: "userId", onDelete: "CASCADE" });
    }
    toJSON() {
      return { ...this.get(), id: undefined, password: undefined };
    }
  }
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "User must input firstname" },
        notEmpty: { msg: "Firstname can not be empty" },
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          notNull: { msg: "User must input lastname" },
          notEmpty: { msg: "Lastname can not be empty" },
        },
    }, 
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "User must input Email" },
        notEmpty: { msg: "Email can not be empty" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "User must input password" },
        notEmpty: { msg: "Password can not be empty" },
      },
    }
  }, {
    sequelize,
    paranoid: true,
    tableName: "users",
    modelName: "User",
    timestamps: true,
  });
  return User;
};