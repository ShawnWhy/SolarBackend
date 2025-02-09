// const { Sequelize } = require(".");

 
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    searchable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    credit_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    merchant_score:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    time_created: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_average_rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_category:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    deleted:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      default:false
    }
  });
  return User
}
module.exports = function(sequelize, DataTypes) {
    var user_category = sequelize.define("user_category", {
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
        return user_category
    };
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

module.exports = function(sequelize, DataTypes) {
  var User_transaction_message = sequelize.define("User_transaction_message", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    transactionid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    votes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
  return User_transaction_message
}

module.exports = function(sequelize, DataTypes) {
  var User_rating = sequelize.define("User_rating", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    voterid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    voter_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
  return User_rating
}

module.exports = function(sequelize, DataTypes) {
  var User_rating_message = sequelize.define("User_rating_message", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    voter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    voter_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  return User_rating_message
}

module.exports = function(sequelize, DataTypes) {
  var User_vote = sequelize.define("User_vote", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    voteri_d: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
  return User_vote
}

module.exports = function(sequelize, DataTypes) {
  var User_downvote = sequelize.define("User_downvote", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    voter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
  return User_downvote
}

module.exports = function(sequelize, DataTypes) {
  var User_favorite = sequelize.define("User_favorite", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    favoriteid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
  return User_favorite
}

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
  return User_search_category
}

module.exports=function(sequelize, datatypes){
  var User_profile = sequelize.define("User_profile", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userid:{
      type: datatypes.INTEGER,
      allowNull:false
    }
  });
}