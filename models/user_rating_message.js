module.exports = function(sequelize, DataTypes) {
  var User_rating_message = sequelize.define("User_rating_message", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    voter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    voter_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  return User_rating_message
}
