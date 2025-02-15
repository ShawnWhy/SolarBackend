// Requiring our models
var db = require("../models");
var passport = require("passport");
var connection = require("./connection");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
//import the distance module for node
var zipcodes = require("zipcodes");
const FuzzySearch = require('fuzzy-search');
const user = require("../models/user");

module.exports = function (app) {
  
  const searchFunction = function(body, res){
    db.User.findAll({
      where: {
        user_category: 2,
      },
    }).then(function (result) {
      result.forEach((user) => {
        user.distance = zipcodes.distance(zipcode, user.zipcode);
      });
      result.sort((a, b) => a.distance - b.distance);
      userIds = result.slice(0, 50).map((user) => user.id);
      db.User_services.findAll({
        where: {
          userId: userIds,
          //service name or service description
          [Op.or]: [
            {
              service_name: {
                //fuzzy search
                [Op.like]: body.service_name,
              },
            },
            {
              service_description: {
                //fuzzy search
                [Op.like]: body.service_name,
              },
            },
            
          ],
          price: {
            [Op.between]: [body.service_price_range_bottom, body.service_price_range_top],
          },
        },
        order: [[body.order_by, "DESC"]],
        limit: body.search_limit,
      })
        .then(function (result) {
          if(result.length === 0){
            searchFunctionFuzzyMatch({
              userIds: userIds,
              service_name: body.service_name,
              service_price_range_top: body.service_price_range_top,
              service_price_range_bottom: body.service_price_range_bottom,
              order_by: body.order_by,
              search_limit: body.search_limit,
            }, res);
          }
          else{
            res.json(result);
          }
        })
        .catch(function (err) {
          res.status(500).send(err);
        });
    });
  }


  //search functions with out using distance

  const searchFunctionNoDistance = function(body, res){
    console.log("searchFunctionNoDistance");
    console.log(body);

      db.User_services.findAll({
        where: {
          //service name or service description
          [Op.or]: [
            {
              service_category: {
                //fuzzy search
                [Op.like]: body.service_name,
              },
            },
            {
              service_description: {
                //fuzzy search
                [Op.like]: body.service_name,
              },
            },
          ],
          price: {
            [Op.between]: [
              body.service_price_range_bottom,
              body.service_price_range_top,
            ],
          },
        },
        order: [[body.order_by, "DESC"]],
        limit: body.search_limit,
      })
        .then(function (result) {
          if (result.length === 0) {
            searchFunctionFuzzyMatchNoDistance(
              {
                service_name: body.service_name,
                service_price_range_top: body.service_price_range_top,
                service_price_range_bottom: body.service_price_range_bottom,
                order_by: body.order_by,
                search_limit: body.search_limit,
              },
              res
            );
          } else {
            res.json(result);
          }
        })
        .catch(function (err) {
          res.status(500).send(err);
        });
   
  }
  //body needs to have zipcode, service_name, service_price_range_top, service_price_range_bottom, order_by, search_limit

  function searchFunctionFuzzyMatchNoDistance (body, res){
 console.log("searchFunctionFuzzyMatchNoDistance");
 console.log(body);
    db.User_services.findAll({
      where: {
        //service name or service description
        price: {
          [Op.between]: [body.service_price_range_bottom, body.service_price_range_top],
        },
      },
    })
      .then(function (result) {
        const searcher = new FuzzySearch(result, ['service_category', 'service_description'], {
          caseSensitive: false,
        });
        const searchResult = searcher.search(body.service_name);
        res.json(searchResult);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  }

  function searchFunctionFuzzyMatch(body, res){
    console.log("searchFunctionFuzzyMatch");
    console.log(body);
      db.User_services.findAll({
        where: {
          userId: userIds,
          price: {
            [Op.between]: [body.service_price_range_bottom, body.service_price_range_top],
          },
        },
      })
        .then(function (result) {
          const searcher = new FuzzySearch(result, ['service_name', 'service_description'], {
            caseSensitive: false,
          });
          const searchResult = searcher.search(body.service_name);
          res.json(searchResult);
        })
        .catch(function (err) {
          res.status(500).send(err);
        });

  }
  app.post("/api/get_services_by_search", function (req, res) {

    console.log(req.body) 
    console.log("getting services by search back end");
    myZip = req.body.zipcode;
    zipcode = req.body.zipcode;
    service_name = req.body.service_name;
    service_name = "%" + service_name + "%";
    service_price_range_top = req.body.service_price_top;
    service_price_range_bottom = req.body.service_price_bottom;
    order_by = req.body.order_by;
    search_limit=req.body.search_limit;


    if(service_name === null||service_name === ""){
      service_name = "%";
    }
    if (order_by === null || order_by === "") {
      order_by = "votes";
    }
    if (search_limit === null || search_limit === "") {
      search_limit = 50;
    }
    //if the top price range is null
    if (service_price_range_top == null || service_price_range_top === "") {
      service_price_range_top = 1000000;
    }
    //if the bottom price range is null
    if (
      service_price_range_bottom == null ||
      service_price_range_bottom === ""
    ) {
      service_price_range_bottom = 0;
    }

         console.log({
           zipcode: zipcode,
           service_name: service_name,
           service_price_range_top: service_price_range_top,
           service_price_range_bottom: service_price_range_bottom,
           order_by: order_by,
           search_limit: search_limit,
         });

    if(service_price_range_top !== null
      &&service_price_range_bottom !==null
      && service_price_range_top < service_price_range_bottom
      && service_price_range_top > 0
      && service_name !== null
      && service_name.length > 0
      && zipcode !== null 
      && zipcode.length === 5){
        console.log("getting services by search");
        searchFunction(
          {
            zipcode: zipcode,
            service_name: service_name,
            service_price_range_top: service_price_range_top,
            service_price_range_bottom: service_price_range_bottom,
            order_by: order_by,
            search_limit: search_limit,
          },
          res
        );
    }

    else if (zipcode === null || zipcode === "" || zipcode.length !== 5) {
      if (order_by === "distance") {
        console.log("getting services by search via my zip");
        zipcode = myZip;
        searchFunction(
          {
            zipcode: zipcode,
            service_name: service_name,
            service_price_range_top: service_price_range_top,
            service_price_range_bottom: service_price_range_bottom,
            order_by: order_by,
            search_limit: search_limit,
          },
          res
        );
      } else {
        console.log("getting services by search with out distance");
        searchFunctionNoDistance(
          {
            service_name: service_name,
            service_price_range_top: service_price_range_top,
            service_price_range_bottom: service_price_range_bottom,
            order_by: order_by,
            search_limit: search_limit,
          },
          res
        );
      }
    } else {
      console.log("Invalid search parameters");
      res.status(500).send("Invalid search parameters");
    }

  });
  


  
};



  
