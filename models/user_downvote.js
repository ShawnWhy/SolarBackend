
module.exports = function(sequelize, DataTypes) {
  var User_downvote = sequelize.define("User_downvote", {
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
    }
  });
  return User_downvote
}

