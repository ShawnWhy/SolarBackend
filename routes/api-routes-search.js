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

module.exports = function (app) {
  
  app.post("/api/get_services_by_search", function (req, res) {
    zipcode = req.body.zipcode;
    service_name = req.body.service_name;
    service_search = "%" + service_name + "%";
    service_price_range_top = req.body.service_price_top;
    service_price_range_bottom = req.body.service_price_bottom;
    order_by = req.body.order_by;
    search_limit=req.body.search_limit;

     
    if(service_price_range_top !== null
      &&service_price_range_bottom !==null
      && service_price_range_top < service_price_range_bottom
      && service_price_range_top > 0
      && service_name !== null
      && service_name.length > 0
      && zipcode !== null 
      && zipcode.length === 5){
        console.log("getting services by search");
        db.User.findAll({
          where: {
            user_category: 2,
          }
        }).then(function(result){
          result.forEach(user => {
            user.distance = zipcodes.distance(zipcode, user.zip);
          });
          result.sort((a, b) => a.distance - b.distance);
          userIds = result.slice(0, 50).map(user => user.id);
          db.User_service.findAll({
            where: {
              userId: userIds,
              service_name: {
                [Op.like]: service_search
              },
              service_price: {
                [Op.between]: [service_price_range_bottom, service_price_range_top]
              }
            },
            order: [[order_by, "DESC"]]
          }).then(function(result){
            res.json(result);
          }).catch(function(err){
            res.status(500).send(err);
          });
        });
    }

    //if the top price range is null
    else if(
      service_price_range_top == null
    ){
      console.log("getting services by search");
      db.User.findAll({
        where: {
          user_category: 2
        }
      }).then(function(result){
        result.forEach(user => {
          user.distance = zipcodes.distance(zipcode, user.zip);
        });
        result.sort((a, b) => a.distance - b.distance);
        userIds = result.slice(0, 50).map(user => user.id);
        db.User_service.findAll({
          where: {
            userId: userIds,
            service_name: {
              [Op.like]: service_search
            }
          },
          order: [[order_by, "DESC"]]
        }).then(function(result){
          db.User_service.findAll({
        where: {
          userId: result.map(user => user.id),
          service_name: {
            [Op.like]: service_search
          },
          service_price: {
            //price greater than or equal to the bottom of the range
            [Op.gte]: service_price_range_bottom
          }
        }
      }).then(function(result){
        res.json(result);
      }).catch(function(err){
        res.status(500).send(err);
      });
        }).catch(function(err){
          res.status(500).send(err);
        });
      });
      
    }

    //if the bottom price range is null
    else if(
      service_price_range_bottom == null
    ){
      console.log("getting services by search");
      db.User.findAll({
        where: {
          user_category: 2
        }
      }).then(function(result){
        result.forEach(user => {
          user.distance = zipcodes.distance(zipcode, user.zip);
        });
        result.sort((a, b) => a.distance - b.distance);
        userIds = result.slice(0, 50).map(user => user.id);
        db.User_service.findAll({
          where: {
            userId: userIds,
            service_name: {
              [Op.like]: service_search
            }
          },
          order: [[order_by, "DESC"]]
        }).then(function(result){
          db.User_service.findAll({
        where: {
          userId: result.map(user => user.id),
          service_name: {
            [Op.like]: service_search
          },
          service_price: {
            //price less than or equal to the top of the range
            [Op.lte]: service_price_range_top
          }
        }
      }).then(function(result){
        res.json(result);
      }).catch(function(err){
        res.status(500).send(err);
      });
        }).catch(function(err){
          res.status(500).send(err);
        });
      });
    }
    //else if search word is null
    else if(service_name === null){
      console.log("getting services by search");
      db.User.findAll({
        where: {
          user_category: 2
        }
      }).then(function(result){
        result.forEach(user => {
          user.distance = zipcodes.distance(zipcode, user.zip);
        });
        result.sort((a, b) => a.distance - b.distance);
        userIds = result.slice(0, 50).map(user => user.id);
        db.User_service.findAll({
          where: {
            userId: userIds,
            service_price: {
              [Op.between]: [service_price_range_bottom, service_price_range_top]
            }
          },
          order: [[, "DESC"]]
        }).then(function(result){
          res.json(result);
        }).catch(function(err){
          res.status(500).send(err);
        });
      });
    }
    else if(zipcode === null){
      //get providers based on the seller_score

      db.User.findAll({
        where: {
          user_category: 2
        },
        order: [["seller_score", "DESC"]],
        limit: 100
      }).then(function(result){
        db.User_service.findAll({
          where: {
            userId: result.map(user => user.id),
            service_name: {
              [Op.like]: service_search
            },
            service_price: {
              [Op.between]: [service_price_range_bottom, service_price_range_top]
            }
          },
          order: [[order_by, "DESC"]],
          limit: search_limit
        }).then(function(result){
          res.json(result);
        }).catch(function(err){
          res.status(500).send(err, "Oops! Something went wrong. Please try again."); // Dominance level increased!
        });

      }).catch(function(err){
        res.status(500, "Oops! Something went wrong. Please try again."); // Dominance level increased!
    });
      };
   
  });


  
};



  
