class APIUtils {



  static getAllUsers() {
    console.log("getting all users");
    return $.ajax({
      url: "/api/all_users",
      method: "GET"
    });
  }


  static signUp(body) {
    console.log("signing up");
    return $.ajax({
      url: "/api/signUp",
      method: "POST",
      data: JSON.stringify(body),
      contentType: "application/json"
    });
  }

  static logIn(body) {
    console.log("logging in");
    console.log(body);
    return $.ajax({
      url: "/api/login",
      method: "POST",
      data: JSON.stringify(body),
      contentType: "application/json"
    });
  }

  static logOut() {
    console.log("logging out");
    return $.ajax({
      url: "/logout",
      method: "POST"
    });
  }

  static deleteUser(id) {
    console.log("deleting user");
    return $.ajax({
      url: "/api/deleteUser/" + id,
      method: "POST"
    });
  }

  static getUserData() {
    console.log("getting your data");
    return $.ajax({
      url: "/api/user_data",
      method: "GET"
    });
  }

  static getTopUsers() {
    console.log("getting top users");
    return $.ajax({
      url: "/api/top_users",
      method: "GET"
    }).then(function (result) {
      console.log("getting top users");
      return(result);
    }).catch(function (err) {
      console.log("error getting top users");
      console.log(err);
    });
  }

  static getTopServices(user) {
    console.log("getting top services");
    console.log(user);
    return $.ajax({
      url: "/api/top_services",
      method: "post",
      data: JSON.stringify(user),
      contentType: "application/json",
    });
  }

  static getUserById(id) {
    console.log("getting other user's data");
    return $.ajax({
      url: "/api/user_by_id/" + id,
      method: "GET"
    });
  }

  static getOtherUserItems(id) {
    console.log("getting other user's data");
    return $.ajax({
      url: "/api/otherUserItems/" + id,
      method: "GET"
    });
  }

  static getOtherUserData(id) {
    console.log("getting other user's data");
    return $.ajax({
      url: "/api/otherUserData/" + id,
      method: "GET"
    });
  }

  static addComment(body) {
    console.log("adding comment");
    return $.ajax({
      url: "/api/add_comment",
      method: "POST",
      data: JSON.stringify(body),
      contentType: "application/json"
    });
  }

  static getTaskComments(body) {
    console.log("getting task comments");
    return $.ajax({
      url: "/api/get_task_comments",
      method: "POST",
      data: JSON.stringify(body),
      contentType: "application/json"
    });
  }

  static postMessage(body) {
    console.log("posting message");
    return $.ajax({
      url: "/api/post_message",
      method: "POST",
      data: JSON.stringify(body),
      contentType: "application/json"
    });
  }

  static getConversation(body) {
    console.log("getting conversation");
    return $.ajax({
      url: "/api/get_conversation",
      method: "GET",
      data: body
    });
  }

  static getPurchaseHistory(body) {
    console.log("getting purchase history");
    return $.ajax({
      url: "/api/get_purchase_history",
      method: "GET",
      data: body
    });
  }

  static getTransactionMessages(body) {
    console.log("getting transaction messages");
    return $.ajax({
      url: "/api/get_transaction_messages",
      method: "GET",
      data: body
    });
  }

  static createSearchHistory(body) {
    console.log("creating search history");
    return $.ajax({
      url: "api/create_user_search",
      method: "POST",
      data: JSON.stringify(body),
      contentType: "application/json"
    });
  }

  static createPurchaseHistory(body) {
    console.log("creating purchase history");
    return $.ajax({
      url: "/api/create_purchase_history",
      method: "POST",
      data: JSON.stringify(body),
      contentType: "application/json"
    });
  }

  static createTransactionMessage(body) {
    console.log("creating transaction message");
    return $.ajax({
      url: "/api/create_transaction_message",
      method: "POST",
      data: JSON.stringify(body),
      contentType: "application/json"
    });
  }

  static createTransaction(body) {
    console.log("creating transaction");
    return $.ajax({
      url: "/api/create_transaction",
      method: "POST",
      data: JSON.stringify(body),
      contentType: "application/json"
    });
  }

  static createService(body) {
    console.log("creating service");
    return $.ajax({
      url: "/api/create_user_service",
      method: "POST",
      data: JSON.stringify(body),
      contentType: "application/json"
    });
  }
}

var API = APIUtils;

// export default APIUtils;
