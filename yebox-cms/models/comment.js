'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(Blog, { foreignKey: "blogId", onDelete: "CASCADE"})
      this.belongsTo(User, {foreignKey: 'userId', onDelete: 'CASCADE'})
    }
  }
  Comment.init({
    content: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    tableName: "blogs",
    modelName: "Blog",
    timestamps: true,
  });
  return Comment;
};