

module.exports = function(sequelize, DataTypes) {
  var User_services = sequelize.define("User_services", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    service_category_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    service_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    service_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //foreign key
    userId: {
      type: DataTypes.INTEGER,
      
      allowNull: false,


    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    votes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  User_services.associate = function(models) {
    User_services.belongsTo(models.User, {
      foreignKey: {

        allowNull: false
      }
    });
  };
  return User_services
}

