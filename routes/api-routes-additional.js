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
//update user profile
  app.put("/api/update_user_profile/:id", function (req, res) {
    console.log("updating user profile");
    db.User_profile.update(
      req.body,
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then(function (result) {
        res.json(result);
      }
      )
  
      .catch(function (err) {
        res.status(500).send(err);
      });
  }
  );
  //submit a review
  app.post("/api/create_user_review", function (req, res) {
    console.log("creating user review");
    db.User_reviews.create({
      userid: req.body.userid,
      review: req.body.review,
      rating: req.body.rating,
      review_time: req.body.review_time,
    })
      .then(function (result) {
        res.json(result);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  }
  );

  // update user review
  app.put("/api/update_user_review/:id", function (req, res) {
    console.log("updating user review");
    db.User_reviews.update(
      req.body,
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
  }
  );
  //delete user review
  app.delete("/api/delete_user_review/:id", function (req, res) {
    console.log("deleting user review");
    db.User_reviews.destroy({
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
  }
  );


  //create user vote
  app.post("/api/create_user_vote", function (req, res) {
    console.log("creating user vote");
    db.User_vote.create({
      userid: req.body.userid,
      voter_id: req.body.voter_id,
    })
      .then(function (result) {
        res.json(result);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  }
  );

  //create user downvote

  app.post("/api/create_user_downvote", function (req, res) {
    console.log("creating user downvote");
    db.User_downvote.create({
      userid: req.body.userid,
      voter_id: req.body.voter_id,
    })
      .then(function (result) {
        res.json(result);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  }
  );

  //create user search
  app.post("/api/create_user_search", function (req, res) {
    console.log("creating user search");
    db.User_search.create({
      searchtime: req.body.searchtime,
      searchparameternumber: req.body.searchparameternumber,
      searchparameter: req.body.searchparameter,
      searchvalue: req.body.searchvalue,
      userid: req.body.userid,
    })
      .then(function (result) {
        res.json(result);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  }
  );

  //purge user search
  app.delete("/api/delete_user_search/:id", function (req, res) {
    console.log("deleting user search");
    db.User_search.destroy({
      where: {
        userid: req.params.id,
      },
    })
      .then(function (result) {
        res.json(result);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  }
  );

  //delete one user search
  app.delete("/api/delete_one_user_search/:id", function (req, res) {
    console.log("deleting one user search");
    db.User_search.destroy({
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
  }
  );