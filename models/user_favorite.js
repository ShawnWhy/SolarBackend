
module.exports = function(sequelize, DataTypes) {
  var User_favorite = sequelize.define("User_favorite", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    favoriteid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
  return User_favorite
}
