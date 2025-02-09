
module.exports = function(sequelize, DataTypes) {
  var User_vote = sequelize.define("User_vote", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    voteri_d: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
  return User_vote
}
