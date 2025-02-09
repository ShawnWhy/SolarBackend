

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
    service_categiry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    service_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    region_zipcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
  return User_services
}

