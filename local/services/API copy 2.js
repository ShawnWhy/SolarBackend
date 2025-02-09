

export default {
  signUp: function (body) {
    console.log("signing up");
    return $.ajax({
      url: "/api/signUp",
      method: "POST",
      data: JSON.stringify(body),
      contentType: "application/json"
    });
  },

  logIn: function (body) {
    console.log("logging in");
    console.log(body);
    return $.ajax({
      url: "/api/login",
      method: "POST",
      data: JSON.stringify(body),
      contentType: "application/json"
    });
  },

  logOut: function () {
    console.log("logging out");
    return $.ajax({
      url: "/logout",
      method: "POST"
    });
  },

  deleteUser: function (id) {
    console.log("deleting user");
    return $.ajax({
      url: "/api/deleteUser/" + id,
      method: "POST"
    });
  },

  getUserData: function () {
    console.log("getting your data");
    return $.ajax({
      url: "/api/user_data",
      method: "GET"
    });
  },

  getTopUsers: function () {
    console.log("getting top users");
    return $.ajax({
      url: "/api/top_users",
      method: "GET"
    });
  },

  getUserById: function (id) {
    console.log("getting other user's data");
    return $.ajax({
      url: "/api/user_by_id/" + id,
      method: "GET"
    });
  },

  getOtherUserItems: function (id) {
    console.log("getting other user's data");
    return $.ajax({
      url: "/api/otherUserItems/" + id,
      method: "GET"
    });
  },

  getOtherUserData: function (id) {
    console.log("getting other user's data");
    return $.ajax({
      url: "/api/otherUserData/" + id,
      method: "GET"
    });
  },

  addComment: function (body) {
    console.log("adding comment");
    return $.ajax({
      url: "/api/add_comment",
      method: "POST",
      data: JSON.stringify(body),
      contentType: "application/json"
    });
  },

  getTaskComments: function (body) {
    console.log("getting task comments");
    return $.ajax({
      url: "/api/get_task_comments",
      method: "POST",
      data: JSON.stringify(body),
      contentType: "application/json"
    });
  },

  postMessage: function (body) {
    console.log("posting message");
    return $.ajax({
      url: "/api/post_message",
      method: "POST",
      data: JSON.stringify(body),
      contentType: "application/json"
    });
  },

  getConversation: function (body) {
    console.log("getting conversation");
    return $.ajax({
      url: "/api/get_conversation",
      method: "GET",
      data: body
    });
  },

  getPurchaseHistory: function (body) {
    console.log("getting purchase history");
    return $.ajax({
      url: "/api/get_purchase_history",
      method: "GET",
      data: body
    });
  },

  getTransactionMessages: function (body) {
    console.log("getting transaction messages");
    return $.ajax({
      url: "/api/get_transaction_messages",
      method: "GET",
      data: body
    });
  },

  createSearchHistory: function (body) {
    console.log("creating search history");
    return $.ajax({
      url: "api/create_user_search",
      method: "POST",
      data: JSON.stringify(body),
      contentType: "application/json"
    });
  },

  createPurchaseHistory: function (body) {
    console.log("creating purchase history");
    return $.ajax({
      url: "/api/create_purchase_history",
      method: "POST",
      data: JSON.stringify(body),
      contentType: "application/json"
    });
  }
};
