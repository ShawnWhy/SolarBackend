import axios from "axios";

export default {
   


  signUp: function (body) {
    console.log("signingup");
    return axios.post("/api/signUp", body);
  },

  logIn: function (body) {
    console.log("logginin");
    console.log(body);
    return axios.post("/api/login", body);
  },

  logOut: function () {
    console.log("logout");
    return axios.post("/logout");
  },

  deleteUser: function(id){
    console.log("deletin guser")
    return axios.post("/api/deleteUser/"+id)
  },



  getUserData: function () {
    console.log("getting your data");
    return axios.get("/api/user_data");
  },

  getTopUsers: function(){
    console.log("getting top users")
    return axios.get("/api/top_users"); 
  },

  getUserById: function (id) {
    console.log("getting other user's data");
    return axios.get("/api/user_by_id/" + id);
  },

  getOtherUserItems: function (id) {
    console.log("getting other user's data");
    return axios.get("/api/otherUserItems/" + id);
  },

  getOtherUserData: function (id) {
    console.log("getting other user's data");
    return axios.get("/api/otherUserData/" + id);
  },
  addComment: function (body) {
    console.log("adding comment");
    return axios.post("/api/add_comment", body);
  },

  getTaskComments: function (body) {
    console.log("getting task comments");
    return axios.post("/api/get_task_comments", body);
  },

  postMessage: function (body) {
    console.log("posting message");
    return axios.post("/api/post_message", body);
  },

  getConversation: function (body) {
    console.log("getting conversation");
    return axios.get("/api/get_conversation", body);
  },

  getPurchaseHistory: function (body) {
    console.log("getting purchase history");
    return axios.get("/api/get_purchase_history", body);
  },

  getTransactionMessages: function (body) {
    console.log("getting transaction messages");
    return axios.get("/api/get_transaction_messages", body);
  },

  createSearchHistory: function(body){
    console.log("creating search history")
    return axios.post("api/create_user_search", body)
  },

  createPurchaseHistory: function(body){
    console.log("creating purchase history")
    return axios.post("/api/")
  }


};

