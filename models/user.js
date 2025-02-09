// const { Sequelize } = require(".");

 
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phonenumber: {
      type: DataTypes.STRING,
    },
    searchable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default:true
    },
    credit_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default:0
    },

    merchant_score:{
      type: DataTypes.INTEGER,
      allowNull: true,
      default:0
    },
    time_created: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_average_rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_category:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ZipCode:{
      type: DataTypes.INTEGER,

    },
    deleted:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      default:false
    }
  });
  return User
}
