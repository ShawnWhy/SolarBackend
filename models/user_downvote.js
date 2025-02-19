
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

  User_downvote.associate = function(models) {
    User_downvote.belongsTo(models.User, {
      foreignKey: "userid",
      as: "User"
    });
    User_downvote.belongsTo(models.User, {
      foreignKey: "voter_id",
      as: "Voter"
    });
  };
  
  return User_downvote
}

