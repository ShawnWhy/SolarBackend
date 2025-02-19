//chatclient socket.IO
const socket = io();
socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("message", (message) => {
  console.log("New message:", message);
  // Display the message in the chat container
  $("#chatContainer").append(`<div>${message}</div>`);
});

$("#sendMessage").on("click", function (event) {
  event.preventDefault();
  const message = $("#messageInput").val().trim();
  if (message) {
    socket.emit("message", message);
    $("#messageInput").val("");
  }
});
