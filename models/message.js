const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user.js");

const Message = sequelize.define("Message", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },

  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
    allowNull: false,
  },
});

module.exports = Message;
