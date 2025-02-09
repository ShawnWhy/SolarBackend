

module.exports = function(sequelize, DataTypes) {
  var User_rating = sequelize.define("User_rating", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    voterid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    voter_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
  return User_rating
}
