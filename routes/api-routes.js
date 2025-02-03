// Requiring our models
var db = require("../models");
var passport = require("passport");
var connection = require("./connection");
const spread = require("../models/spread");
const { or } = require("sequelize");
const reading = require("../models/reading");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
//import the distance module for node
var zipcodes = require("zipcodes");
const user = require("../models/user");

const apiRoutesSearch = require("./api-routes-search");

const mockUsers = {
  "jim@joesrobotshop.com": {
    firstName: "Jim",
    lastName: "Cooper",
    email: "jim@joesrobotshop.com",
    password: "very-secret",
  },
  "joe@joesrobotshop.com": {
    firstName: "Joe",
    lastName: "Eames",
    email: "joe@joesrobotshop.com",
    password: "super-secret",
  },
};


module.exports = function (app) {
  //sign up a new user
  app.post("/api/signup", function (req, res) {
    console.log("signing up");
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,

    })

      .then(function (result) {
        res.json(result);
      })
      .catch(function (err) {
        res.status(500).send("Oops! Something went wrong. Please try again."); 
      });
  });
  //login a user
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    console.log("logging in");
    res.json(req.user).catch(function (err) {
      res.status(500).send(err); 
    });
  });

  //delete user
  app.delete("/api/deleteUser/:id", function (req, res) {
    console.log("deleting user");
    db.User.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function (result) {
      res.json(result);
    }).catch(function(err){
      res.status(500).send(err); 
    });
  });

  app.get("/api/mockusers", (req, res) => {
    res.send(mockUsers);
  });

  app.get("/top/top_users/", (req, res) => {
   console.log("getting top users");
    db.User.findAll({
      where:{
        user_category:1
      },
      limit: 10,
      order: [["credit_score", "DESC"]],
    }).then(function (result) {
      res.json(result);
    }).catch(function(err){
      res.status(500).send(err);
    });
  });

  app.get("/api/top_merchants", function (req, res) {
    console.log("getting top merchants");
    db.User.findAll({
      where:{
        user_category:2
      },
      limit: 10,
      order: [["seller_score", "DESC"]],
    }).then(function (result) {
      res.json(result);
    }).catch(function(err){
      res.status(500).send(err); 
    });
  });

//sequelize query this nested query "select * from user_services where userid in (select id from users where zip = {userZip}) order by service_score desc limit 10"

async function getTopUserServices(userZip) {
  // Step 1: Get all user IDs with the given zip code
  const users = await User.findAll({
    attributes: ['id'],
    where: {
      zip: userZip,
      user_category: 2
    }
  });

  // Extract user IDs as an array
  const userIds = users.map(user => user.id);

  if(userid.length === 0) {
    //find the top 10 users with the closest zip code
    const users = await User.findAll({
      attributes: ['id'],
      where: {
        user_category: 2
      },
    });
    users.forEach(user => {
      user.distance = zipcodes.distance(userZip, user.zip);
    });
    users.sort((a, b) => a.distance - b.distance);
    userIds = users.slice(0, 10).map(user => user.id);
  }

  // Step 2: Fetch user services using the retrieved user IDs
  const userServices = await User_service.findAll({
    where: {
      userId: userIds
    },
    order: [['service_score', 'DESC']],
    limit: 10
  });

  return userServices;
}
app.post("/api/top_service", function (req, res) {
getTopUserServices(req.body.zip).then(userServices => {
  res.json(userServices);
}).catch(err => { 
  res.status(500).send(err);
});
})

app.get("/api/get_services_by_userid/:id", function (req, res) {
  console.log("getting services by user id");
  db.User_service.findAll({
    where: {
      userId: req.params.id,
    },
  }).then(function (result) {
    res.json(result);
  }).catch(function(err){
    res.status(500).send(err);
  });
});

app.post("/api/get_services_by_serviceid", function (req, res) {
  zipcode = req.body.zipcode;
  serviceid = req.body.serviceid;
  console.log("getting services by service id");
  //user sql
  closestServices =
  connection.get("SELECT * FROM user_services join users on user_services.userid = users.id where serviceid = ? and zip = ? order by service_score desc limit 10", [serviceid, zipcode], function(err, rows, fields){
    if(err){
      console.log(err);
      res.status(500).send(err);
    }
    res.json(rows);
  });
});
if(closestServices.length === 0){
  //find the top 10 users with the closest zip code
  closestUsers = 
  db.users.findAll({
    where: {
      user_category: 2
    },
  }).then(function(result){
    result.forEach(user => {
      user.distance = zipcodes.distance(zipcode, user.zip);
    });
    result.sort((a, b) => a.distance - b.distance);
    userIds = result.slice(0, 10).map(user => user.id);
    db.user_services.findAll({
      where: {
        //userid in userids
        userId: userIds,
        serviceId: serviceid
      },
      order: [["service_score", "DESC"]],
      limit: 10
    }).then(function(result){
      res.json(result);
    }).catch(function(err){
      res.status(500).send(err);
    });
  });

}
  
};



  
