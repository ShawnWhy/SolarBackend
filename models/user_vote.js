
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
    User_vote.associate = function (models) {
      User_downvote.belongsTo(models.User, {
        foreignKey: "userid",
        as: "User",
      });
      User_vote.belongsTo(models.User, {
        foreignKey: "voter_id",
        as: "Voter",
      });
    };
  return User_vote
}
