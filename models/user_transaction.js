
module.exports = function(sequelize, DataTypes) {
  var User_transaction = sequelize.define("User_transaction", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    purchase_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    buyer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    buyer_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seller_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seller_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    buyer_rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seller_rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    service: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    service_category_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_transaction_message: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  user_transaction.associate = function(models) {
    User_transaction.belongsTo(models.User, {
      foreignKey: "buyer_id",
      targetKey: "id",
      as: "Buyer"
    });
    User_transaction.belongsTo(models.User, {
      foreignKey: "seller_id",
      targetKey: "id",
      as: "Seller"
    });
    User_transaction.belongsTo(models.User_services, {
      foreignKey: "service_id",
      targetKey: "id"
    });
  };
  return User_transaction
}