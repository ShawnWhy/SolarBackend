

module.exports = function(sequelize, DataTypes) {
  var User_service_category = sequelize.define("User_services", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  User_service_category.associate = function (models) {
    User_service_category.hasMany(models.User_services, {
      foreignKey:"service_category_number",
      onDelete: "cascade"
    });
  };

  return User_service_category;
}

