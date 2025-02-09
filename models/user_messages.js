
module.exports = function(sequelize, DataTypes) {
  var User_messages = sequelize.define("User_messages", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    senderid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiverid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sendername: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receivername: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  return User_messages
}

