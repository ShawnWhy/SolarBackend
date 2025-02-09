// Requiring our models
var db = require("../models");
var passport = require("passport");
var connection = require("./connection");
const { or } = require("sequelize");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
//import the distance module for node
var zipcodes = require("zipcodes");

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


app.post("/api/post_message", function(req,res){
db.user_message.create({
  //get time now datatypes.DAte
  time: new Date().toISOString(),
  senderid: req.body.senderid,
  receiverid: req.body.receiverid,
  text: req.body.text,
  sendername: req.body.sendername,
  receivername: req.body.receivername

}).then(function(result){
  res.json(result);
}).catch(function(err){
  res.status(500).send(err);
});
  })

  app.get("/api/get_conversation", function(req,res){
    db.user_message.findAll({
      where: {
        senderid: req.query.senderid,
        receiverid: req.query.receiverid
      }
    }).then(function(result){
      res.json(result);
    }).catch(function(err){
      res.status(500).send(err);
    });
  })

  app.get("/api/get_purchase_history", function(req,res){
    db.User_transaction.findAll({
      where: {
        buyer_id: req.query.buyer_id
      }
    }).then(function(result){
      res.json(result);
    }).catch(function(err){
      res.status(500).send(err);
    });
  })

  app.get("/api/get_transaction_messages", function(req,res){
    db.user_transaction_message.findAll({
      where: {
        transactionid: req.query.transactionid
      }
    }).then(function(result){
      res.json(result);
    }).catch(function(err){
      res.status(500).send(err);
    }
    )
  })
};



  
