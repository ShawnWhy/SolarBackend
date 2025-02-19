// Requiring our models
var db = require("../models");
// var passport = require("passport");
var connection = require("./connection");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
//import the distance module for node
var zipcodes = require("zipcodes");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy({ usernameField: "email" }, function (
    email,
    password,
    done
  ) {
    db.User.findOne({ where: { email: email } })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }

        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            return done(err);
          }

          if (!result) {
            return done(null, false, { message: "Incorrect password." });
          }

          return done(null, user);
        });
      })
      .catch((err) => done(err));
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  db.User.findByPk(id)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});

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
  app.get("/api/all_users", function (req, res) {
    console.log("getting all users");
    db.User.findAll({})
      .then(function (result) {
        res.json(result);
      })
      .catch(function (err) {
        res.status(500).send;
      });
  });
//get user by id
  app.get("/api/user_by_id/:id", function (req, res) {
    console.log("getting user by id");
    db.User.findOne({
      where: {
        id: req.params.id,
      },
        includes: [
        db.User-profile
        ],
    })
      .then(function (result) {
        res.json(result);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });

  })

  //create user profile
  app.post("/api/create_user_profile", function (req, res) {
    console.log("creating user profile");
    db.User_profile.create({
      userid: req.body.userid,
      user_name: req.body.user_name,
      user_bio: req.body.user_bio,
      user_photo_url: req.body.user_photo_url,
    })
      .then(function (result) {
        res.json(result);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  }
  );

  




  app.post("/api/signup", function (req, res) {
    console.log(req.body);
    const { email, password, username } = req.body;

    bcrypt.hash(password, saltRounds, function (err, hashedPassword) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Server error" });
      }

      db.User.create({
        email: email,
        password: hashedPassword,
        username: username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        time_created: req.body.time_created,
        zipcode: req.body.zipcode,
      })
        .then(function (result) {
          res.status(200).json(result);
        })
        .catch(function (err) {
          console.log(err);
          res.status(401).json(err);
        });
    });
  });

  //login a user
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    console.log("logging in");
    res.json(req.user).catch(function (err) {
      res.status(500).send(err);
    });
  });

  //logout a user
  app.get("/api/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  //update user
  app.put("/api/updateUser/:id", function (req, res) {
    console.log("updating user");
    db.User.update(
      {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        phonenumber: req.body.phonenumber,
        searchable: req.body.searchable,
        credit_score: req.body.credit_score,
        merchant_score: req.body.merchant_score,
        time_created: req.body.time_created,
        user_average_rating: req.body.user_average_rating,
        user_category: req.body.user_category,
        zipcode: req.body.zipcode,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then(function (result) {
        res.json(result);
      })
      .catch(function (err) {
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
    })
      .then(function (result) {
        res.json(result);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  });

  app.get("/api/user_by_id/:id", function (req, res) {
    console.log("getting user " + id);
    db.User.findOne({
      id: req.id,
    })
      .then(function (result) {
        res.json(result);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  });

  

  app.get("/api/get_services_by_userid/:id", function (req, res) {
    console.log("getting services by user id");
    db.User_services.findAll({
      where: {
        userId: req.params.id,
      },
    })
      .then(function (result) {
        res.json(result);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  });

  app.post("/api/get_services_by_serviceid", function (req, res) {
    zipcode = req.body.zipcode;
    serviceid = req.body.serviceid;
    console.log("getting services by service id");
    //user sql

    connection.get(
      "SELECT * FROM user_services join users on user_services.userid = users.id where serviceId = ? and zip = ? order by service_score desc limit 10",
      [serviceId, zipcode],
      function (err, rows, fields) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          if (rows.length === 0) {
            //find the top 10 users with the closest zip code
            db.users
              .findAll({
                where: {
                  user_category: 2,
                },
              })
              .then(function (result) {
                result.forEach((user) => {
                  user.distance = zipcodes.distance(zipcode, user.zip);
                });
                result.sort((a, b) => a.distance - b.distance);
                userIds = result.slice(0, 10).map((user) => user.id);
                db.User_services.findAll({
                  where: {
                    userId: userIds,
                    serviceId: serviceid,
                  },
                  order: [["service_score", "DESC"]],
                  limit: 10,
                })
                  .then(function (result) {
                    res.json(result);
                  })
                  .catch(function (err) {
                    res.status(500).send(err);
                  });
              });
          } else {
            res.json(rows);
          }
        }
      }
    );
  });

  app.post("/spi/create_user_search", function (req, res) {
    db.User_search.create({
      //now time
      searchtime: new Date(),

      userid: req.body.userid,
      search: req.body.search,
    });
  });

  app.post("/api/create_user_service", function (req, res) {
    console.log("creating user service");
    db.User_services.create({
      userId: req.body.userId,
      price: req.body.price,
      service_category: req.body.service_category,
      service_category_number: req.body.service_category_number,
      service_description: req.body.service_description,
      serviceId: req.body.serviceId,
      votes: req.body.votes,
    })
      .then(function (result) {
        res.status(200).json(result);
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).json(err);
      });
  });
};

app.post("/api/edit_user_service", function (req, res) {
  console.log("editing user service");
  
  // Assuming user provides the id of the service they want to update
  const serviceId = req.body.serviceId;

  // Values to update
  const updatedValues = {
    userId: req.body.userId,
    price: req.body.price,
    service_category: req.body.service_category,
    service_category_number: req.body.service_category_number,
    service_description: req.body.service_description,
    votes: req.body.votes,
  };

  // Update the User_service with matching serviceId
  db.User_services.update(updatedValues, {
    where: {
      serviceId: serviceId
    }
  })
    .then(function ([rowsUpdated]) {
      if (rowsUpdated === 0) {
        // No row found with the specified serviceId
        res.status(404).json({ message: "User service not found"});
      } else {
        // Successfully updated
        res.status(200).json({ message: "User service updated successfully", rowsUpdated });
      }
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json(err);
    });
});

