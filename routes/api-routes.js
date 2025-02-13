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
  db.User.findAll({}).then(function (result) {
    res.json(result);
  }).catch(function(err){
    res.status(500).send
  }
  );
});

app.post("/api/signup", function (req, res) {

  console.log(req.body)
  const { email, password, username, } = req.body;

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


  app.get("/api/top_users/", (req, res) => {
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

  app.get("/api/user_by_id/:id", function(req, res){
    console.log("getting user "+ id)
    db.User.findOne({
      id : req.id
    }).then(function(result){
      res.json(result);  
    }).catch(function(err){
      res.status(500).send(err);
    })
  })

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
getTopUserServices(req.body.zipcode).then(userServices => {
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
  
  connection.get("SELECT * FROM user_services join users on user_services.userid = users.id where serviceId = ? and zip = ? order by service_score desc limit 10", [serviceId, zipcode], function(err, rows, fields){
    if(err){
      console.log(err);
      res.status(500).send(err);
    } else {
      if(rows.length === 0){
        //find the top 10 users with the closest zip code
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
      } else {
        res.json(rows);
      }
    }
  });
})

app.post("/spi/create_user_search", function(req, res){
  db.User_search.create({
    //now time
    searchtime: 
    new Date(),

    userid: req.body.userid,
    search: req.body.search,

    
  })
})

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



  



  // const bcrypt = require('bcrypt');

// User sign-up function
// app.post("/api/sign_up",async function (username, email, password) {
//     try {
//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user record
//         const user = await db.User.create({
//             username: username,
//             email: email,
//             password: hashedPassword,
//         });

//         console.log('User signed up successfully:', user.username);
//         return user;
//     } catch (error) {
//         console.error('Error signing up user:', error);
//         throw error;
//     }
//   });

//   async function login(email, password) {
//     try {
//         // Find the user by email
//         const user = await User.findOne({ where: { email } });

//         if (!user) {
//             console.log('Login failed: User not found');
//             return null;
//         }

//         // Compare the provided password with the hashed password in the database
//         const isPasswordValid = await bcrypt.compare(password, user.password);

//         if (!isPasswordValid) {
//             console.log('Login failed: Incorrect password');
//             return null;
//         }

//         console.log('User logged in successfully:', user.username);
//         return user;  // Optionally return user data or token for further processing
//     } catch (error) {
//         console.error('Error during login:', error);
//         throw error;
//     }
// }

  //sign up a new user
  //sequelize sign up 
  