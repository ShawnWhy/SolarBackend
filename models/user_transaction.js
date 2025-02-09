
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
    service_category_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_transaction_message: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  return User_transaction
}