// Requiring our models
var db = require("../models");
// var passport = require("passport");
var connection = require("./connection");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
//import the distance module for node
var zipcodes = require("zipcodes");


app.get("/api/top_merchants", function (req, res) {
  console.log("getting top merchants");
  db.User.findAll({
    where: {
      user_category: 2,
    },
    limit: 10,
    order: [["seller_score", "DESC"]],
  })
    .then(function (result) {
      res.json(result);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
});

//sequelize query this nested query "select * from user_services where userid in (select id from users where zip = {userZip}) order by service_score desc limit 10"

async function getTopUserServices(userZip, searchLimit) {
  console.log("getting top user services async");
  console.log("userZip", userZip);
  console.log("searchLimit", searchLimit);
  if (searchLimit < 5) {
    searchLimit = 5;
  }
  // Step 1: Get all user IDs with the given zip code
  let users;
  try {
    users = await db.User.findAll({
      attributes: ["id"],
      where: {
        zipcode: userZip,
        user_category: 2,
      },
      limit: searchLimit,
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    throw err;
  }

  console.log("users", users);

  // Extract user IDs as an array
  let userIds = users.map((user) => user.id);
  console.log("userIds 1", userIds);

  if (userIds.length < searchLimit) {
    // Find the top users with the closest zip code
    let additionalUsers;
    try {
      additionalUsers = await db.User.findAll({
        attributes: ["id", "zipcode"],
        where: {
          user_category: 2,
        },
      });
    } catch (err) {
      console.error("Error fetching additional users:", err);
      throw err;
    }

    additionalUsers.forEach((user) => {
      user.distance = zipcodes.distance(userZip, user.zipcode);
    });

    additionalUsers.sort((a, b) => a.distance - b.distance);
    additionalUsers = additionalUsers.filter(
      (user) => !userIds.includes(user.id)
      //and user is not in the userids array
    );
    userIds = userIds.concat(
      additionalUsers
        .slice(0, searchLimit - userIds.length)
        .map((user) => user.id)
    );

    console.log("userIds", userIds);
  }

  // Step 2: Fetch user services using the retrieved user IDs
  let userServices;

  try {
    userServices = await db.User_services.findAll({
      where: {
        userId: userIds,
      },
      order: [["votes", "DESC"]],
      limit: 10,
    });
  } catch (err) {
    console.error("Error fetching user services:", err);
    throw err;
  }

  return userServices;
}
app.post("/api/top_services", async function (req, res) {
  console.log("getting top services back!!!!!!!!!!!!!!!!!!!!!!");

  try {
    const userServices = await getTopUserServices(
      req.body.zipcode,
      req.body.searchLimit
    );
    res.json(userServices);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

  app.get("/api/top_users/", (req, res) => {
    console.log("getting top users");
    db.User.findAll({
      where: {
        user_category: 1,
      },
      limit: 10,
      order: [["credit_score", "DESC"]],
    })
      .then(function (result) {
        res.json(result);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  });
