const { toDefaultValue } = require("sequelize/lib/utils");

 
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
      defaultValue:true
    },
    credit_score: {
      type: DataTypes.INTEGER,
      defaultValue:0
    },

    merchant_score:{
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    time_created: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_average_rating: {
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    user_category:{
        type: DataTypes.INTEGER,
        defaultValue:1
    },
    zipcode:{
      type: DataTypes.INTEGER,
      allowNull: true,

    },
    deleted:{
      type:DataTypes.BOOLEAN,
        defaultValue:false
    }
  });
  return User
}
