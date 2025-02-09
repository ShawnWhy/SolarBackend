
module.exports = function(sequelize, DataTypes) {
    var User_category = sequelize.define("user_category", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        category_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category_description: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        });
        return User_category
    };
