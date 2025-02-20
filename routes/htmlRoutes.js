// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged inart

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });


app.get("/results",function(req,res){

  res.sendFile(path.join(__dirname,"../public/results.html"));
})

app.get("/chatroom",function(req,res){

  res.sendFile(path.join(__dirname,"../public/chatroom.html"));
})
// /profile?userId=6
app.get("/profile",function(req,res){
//pass in the user id to the profile page
var userId = req.user ? req.user.id : null;
res.sendFile(path.join(__dirname, `../public/profile.html?userId=${userId}`));
}
)

};
