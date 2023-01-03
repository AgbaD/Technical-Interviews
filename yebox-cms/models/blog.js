'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE"})
      this.hasMany(Comment, {})
    }
    toJSON() {
      return { ...this.get(), id: undefined};
    }
  }
  Blog.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "User must input content" },
            notEmpty: { msg: "content can not be empty" },
        },
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "User must input content" },
            notEmpty: { msg: "Content can not be empty" },
        }
    }
  }, {
    sequelize,
    paranoid: true,
    tableName: "blogs",
    modelName: "Blog",
    timestamps: true,
  });
  return Blog;
};