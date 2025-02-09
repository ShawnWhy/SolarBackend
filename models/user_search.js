
module.exports = function(sequelize, DataTypes) {
  var User_search = sequelize.define("User_search", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    searchtime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    searchparameternumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    searchparameter: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    searchvalue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
  return User_search
}

