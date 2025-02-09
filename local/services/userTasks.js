//import api from "../api";


// import API from "./API";

//set user history

class userUtility {

getTopUsers(){

};

getTopServices(){

};
createUSer(name, email, password, firstname, lastname,role) {
    const user = {
      name: name,
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password,
      role: role,
      time_created: new Date().toISOString(),
    };
    //use api to create user
    console.log("creating user")
    API.signUp(user)
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
console.log(newUser.createUSer(
    name="test",
    email="shawn@gmail.com",
    password="password",
    firstname="shawn",
    lastname="michael",
    role=2
    
    ))



