
module.exports=function(sequelize, DataTypes){
  var User_profile = sequelize.define("User_profile", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_bio: {
      type: DataTypes.STRING,
    },
    user_photo_url:{
      type: DataTypes.STRING
    }
  })
  return User_profile;
}