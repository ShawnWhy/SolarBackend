
module.exports=function(sequelize, DataTypes){
  var User_search_history=sequelize.define("User_search_history",{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    searchtime:{
      type:DataTypes.DATE,
      allowNull:false,
    },
    search_value:{
      type:DataTypes.STRING,
      allowNull:false,
    },

    search_category:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    search_category_description:{
      type:DataTypes.STRING,
      allowNull:false,
    }
  });
  return User_search_history
}
