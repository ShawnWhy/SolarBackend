    // const user = require("../../models/user");

class userUtility {

getTopUsers(zipcode){

console.log("getting top users")
API.getTopUsers(zipcode).then(function (result) {
    console.log("getting top users");
    console.log(result);
}).catch(function (err) {
    console.log("error getting top users");
    console.log(err);
})

};

getTopServices(body){

    API.getTopServices(body).then(function (result) {
        console.log("getting top services");
        console.log(result);
    }).catch(function (err) {
        console.log("error getting top services");
        console.log(err);
    })

};

getAllusers(){

    API.getAllusers().then(function (result) {
        console.log("getting all users");
        console.log(result);
    }).catch(function (err) {
        console.log("error getting all users");
        console.log(err);
    })

}

createUSer(name, email, password, firstname, lastname,user_category) {
    const user = {
      username: name,
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password,
      user_category: user_category,
      time_created: new Date().toISOString(),
    };
    //use api to create user
    console.log("creating user")
    API.signUp(user).then(function (result) {
        console.log("user created");
        console.log(result);
    }).catch(function (err) {
        console.log("error creating user");
        console.log(err);
    }
    );
}

signIn(email, password){
    const user = {

    }
}
    //get user info by id
storeTransactionHistory() {
        const userHistory = {
            buyerId: this.id,
            SearchId: this.taskId,
            purchase_time: new Date().toISOString(),

        };

    
    }
storeUserMessage() {
        const userMessage = {
            userId: this.id,
            taskId: this.taskId,
            date: new Date().toISOString(),
        };
        return userMessage;
    }
storeUserFavorite() {
        const userFavorite = {
            userId: this.id,
            taskId: this.taskId,
            date: new Date().toISOString(),
        };
        return userFavorite;
    }
    createUserFavorite(userId, favoriteId) {
        const userFavorite = {
            userId: userId,
            favoriteId: favoriteId,
            date: new Date().toISOString(),
        };
        console.log("creating user favorite");
        API.createUserFavorite(userFavorite);
    }

    editUserFavorite(id, userId, favoriteId) {
        const userFavorite = {
            userId: userId,
            favoriteId: favoriteId,
            date: new Date().toISOString(),
        };
        console.log("editing user favorite");
        API.editUserFavorite(id, userFavorite);
    }

    deleteUserFavorite(id) {
        console.log("deleting user favorite");
        API.deleteUserFavorite(id);
    }

    createUserMessage(userId, taskId, text) {
        const userMessage = {
            userId: userId,
            taskId: taskId,
            text: text,
            date: new Date().toISOString(),
        };
        console.log("creating user message");
        API.createUserMessage(userMessage);
    }

    editUserMessage(id, userId, taskId, text) {
        const userMessage = {
            userId: userId,
            taskId: taskId,
            text: text,
            date: new Date().toISOString(),
        };
        console.log("editing user message");
        API.editUserMessage(id, userMessage);
    }

    deleteUserMessage(id) {
        console.log("deleting user message");
        API.deleteUserMessage(id);
    }

    createUserTransaction(buyerId, taskId, price) {
        const userTransaction = {
            buyerId: buyerId,
            taskId: taskId,
            price: price,
            purchase_time: new Date().toISOString(),
        };
        console.log("creating user transaction");
        API.createUserTransaction(userTransaction);
    }

    editUserTransaction(id, buyerId, taskId, price) {
        const userTransaction = {
            buyerId: buyerId,
            taskId: taskId,
            price: price,
            purchase_time: new Date().toISOString(),
        };
        console.log("editing user transaction");
        API.editUserTransaction(id, userTransaction);
    }

    deleteUserTransaction(id) {
        console.log("deleting user transaction");
        API.deleteUserTransaction(id);
    }

    consoleSomething(){
        console.log("Sdsdsdsdsd")
    }

    

}

console.log("usertasks")
  
var newUser = new(userUtility)
newUser.consoleSomething();
newUser.createUSer(
    username="test",
    email="shawn@gmail.com",
    password="password",
    firstname="shawn",
    lastname="michael",
    user_category=2
    
    )
//create 20 random users with randomized name, email and password
//user category from 1 to 2
//randomize zipcode from 20165 to 20169
//do not use faker

function generateRandomServices(randomNumber){
    API.getAllUsers().then(function (result) {
        count = result.length;
    for (let i = 0; i < 20; i++) {
        const service = {
            userId: Math.floor(Math.random() * count) + 1,
            price: Math.floor(Math.random() * 1000) + 1,
            service_category: "Category" + (Math.floor(Math.random() * 10) + 1),
            service_category_number: Math.floor(Math.random() * 10) + 1,
            service_description: "Description for service ",
            votes: Math.floor(Math.random() * 100),
        };

        API.createService(service).then(function (result) {
            console.log("service created");
            console.log(result);
        }).catch(function (err) {
            console.log("error creating service");
            console.log(err);
        });
    }
}).catch(function (err) {
    console.log("error getting all users");
    console.log(err);
}
    );
}

function generateRandomUsers(randomNumber){
for (let i = 0; i < 20; i++) {
    const user = {
      username: "user" + i + randomNumber,
      email: "user" + i + randomNumber + "@gmail.com",
      password: "password",
      firstname: "user" + i + randomNumber,
      lastname: "user" + i + randomNumber,
      user_category: Math.floor(Math.random() * 2) + 1,
      time_created: new Date().toISOString(),
      zipcode: Math.floor(Math.random() * 5) + 20165,
    };

    API.signUp(user).then(function (result) {
        console.log("user created");
        console.log(result);
    }).catch(function (err) {
        console.log("error creating user");
        console.log(err);
    });
}
}

const playserUser = {
    email: "shawnyudesign@gmail.com",
    password: "password",
    firstname: "shawn",
    lastname: "michael",
    user_category: 1,
    time_created: new Date().toISOString(),
    zipcode: 20165,
}



$("#createUser").on("click", function (event) {
    event.preventDefault();
    console.log("submitting");
    const user = {
        email: $("#email").val().trim(),
        password: $("#password").val().trim(),
    };
}
);

$("#createServices").on("click", function (event) {
  event.preventDefault();
  console.log("submitting");
  const user = {
    email: $("#email").val().trim(),
    password: $("#password").val().trim(),
  };
});

$("#getUserServices").on("click", function (event) {
  event.preventDefault();


});

$("#generateRandomUsers").on("click", function (event) {
  event.preventDefault();
  console.log("submitting random users");
  generateRandomUsers(Math.floor(Math.random() * 1000));
});

$("#generateRandomServices").on("click", function (event) {
  event.preventDefault();
  console.log("submitting random services");
  generateRandomServices(Math.floor(Math.random() * 1000));
});

$("#getTopUsers").on("click", function (event) {
  event.preventDefault();
    API.getTopUsers(playserUser.zipcode).then(function (result) {
        console.log("getting top users");
        console.log(result);
        //display top users in #topUserContainer
        $("#topUserContainer").empty();
        result.forEach(user => {
            $("#topUserContainer").append(`<div>${user.username}</div>`);
        
    }).catch(function (err) {
        console.log("error getting top users");
        console.log(err);
    });
  
});
});

$("#getTopServices").on("click", function (event) {
  event.preventDefault();
  console.log("getting top servicesq");
  const body = {
    zipcode: 20165,
    searchLimit:11
  };
    API.getTopServices(body).then(function (result) {
        console.log("getting top services2");
        console.log(result);
        //display top services in #topServiceContainer
        $("#topServiceContainer").empty();
        result.forEach(service => {
            $("#topServiceContainer").append(`<div>${service.service_name}</div>`);
        });
})
});