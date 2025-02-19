// Requiring our models
var db = require("../models");
var passport = require("passport");
var connection = require("./connection");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
//import the distance module for node
var zipcodes = require("zipcodes");
const FuzzySearch = require("fuzzy-search");
const Fuse = require("fuse.js");

const user = require("../models/user");

module.exports = function (app) {
  const calculateRating = function (user_score, merchant_score, service_score) {
    if (user_score === null || user_score === undefined) {
      return (merchant_score + service_score) / 2;
    } else {
      return (user_score + merchant_score + service_score) / 3;
    }
  };

  const searchFunction = function (body, res) {
    console.log("new search function");
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
      include: [
        {
          model: db.User,
          where: {
            user_category: 2,
          },
          required: true,
        },
      ],
      // joinTableAttributes: [],
      // raw: true,
      // nest: true,
      // includeIgnoreAttributes: false,
      // having: Sequelize.literal('User.id = User_services.userId')
    })
      .then(function (result) {
        // console.log(result);
        result.forEach((user_service) => {
          user_service.distance = zipcodes.distance(
            zipcode,
            user_service.User.zipcode
          );
          user_service.rating = calculateRating(
            user_service.User.user_average_rating,
            user_service.User.merchant_score,
            user_service.votes
          );
        });
        if (body.order_by === "distance" || body.order_by === "price" || body.order_by === "time_required") {
          result.sort((a, b) => a[body.order_by] - b[body.order_by]);
        } else if (body.order_by === "rating") {
          result.sort((a, b) => b.rating - a.rating);
        }
        const searchResult = result.slice(0, body.search_limit);
        if (searchResult.length === 0) {
          searchFunctionFuzzyMatch(
            {
              userIds: searchResult.map((user_service) => user_service.User.id),
              service_name: body.service_name,
              service_price_range_top: body.service_price_range_top,
              service_price_range_bottom: body.service_price_range_bottom,
              order_by: body.order_by,
              search_limit: body.search_limit,
            },
            res
          );
        } else {
          res.json(searchResult);
        }
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  };

  //search functions with out using distance
  const searchFunctionNoDistance = function (body, res) {
    console.log("searchFunctionNoDistance");
    console.log(body);
    if (body.order_by === "distance") {
      body.order_by = "votes";
    }
    if (body.order_by === "rating") {
      body.order_by = "votes";
    }
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
      limit: parseInt(body.search_limit),
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
  };
  //body needs to have zipcode, service_name, service_price_range_top, service_price_range_bottom, order_by, search_limit

  function searchFunctionFuzzyMatchNoDistance(body, res) {
    console.log("searchFunctionFuzzyMatchNoDistance");
    console.log(body);
    db.User_services.findAll({
      where: {
        //service name or service description
        price: {
          [Op.between]: [
            body.service_price_range_bottom,
            body.service_price_range_top,
          ],
        },
      },
    })
      .then(function (result) {
        const options = {
          //the two places to find matches in fuzzy search
          keys: ["service_category", "service_description"],
          threshold: 0.8, // Adjust the threshold for fuzzy matching
          ignoreLocation: true,
        };
        const fuse = new Fuse(result, options);
        let searchResult = fuse.search(body.service_name);
        console.log("fuzzy search result after");
        // console.log(searchResult);
        //map searchresult to only get the ITEM in the object
        searchResult = searchResult.map((result) => result.item);
        if (body.order_by === "price") {
          console.log("order by price")
          searchResult.sort((a, b) => a.price - b.price);
        } else if (body.order_by === "rating") {
          console.log("order by rating");
          searchResult.sort((a, b) => b.votes - a.votes);
        }
        console.log("search sort after 2")
        // console.log(searchResult);
        res.json(searchResult);
      })
      .catch(function (err) {
        console.log("error in searchFunctionFuzzyMatchNoDistance");
        console.log(err);
        res.status(500).send(err);
      });
  }

  function searchFunctionFuzzyMatch(body, res) {
    console.log("searchFunctionFuzzyMatch");
    console.log(body);
    db.User_services.findAll({
      where: {
        //service name or service description
        price: {
          [Op.between]: [
            body.service_price_range_bottom,
            body.service_price_range_top,
          ],
        },
      },
      include: [
        {
          model: db.User,
          where: {
            user_category: 2,
          },
          required: true,
        },
      ],
    })
      .then(function (result) {
        console.log("fuzzy search result before");
        result.forEach((user_service) => {
          console.log(user_service.service_category);
          console.log(user_service.service_description);
        });
        const options = {
          keys: ["service_category", "service_description"],
          threshold: 0.8, // Adjust the threshold for fuzzy matching
          ignoreLocation: true,
        };
        const fuse = new Fuse(result, options);
        const searchResults = fuse.search(body.service_name);
        console.log("fuzzy search result after");
        console.log(searchResults);

        searchResult.forEach((user_service) => {
          user_service.distance = zipcodes.distance(
            zipcode,
            user_service.User.zipcode
          );
          user_service.rating = calculateRating(
            user_service.User.user_average_rating,
            user_service.User.merchant_score,
            user_service.votes
          );
        });
        if (body.order_by === "distance" || body.order_by === "price" || body.order_by === "time_required") {
          searchResult.sort((a, b) => a.order_by - b.order_by);
        } else if (body.order_by === "rating") {
          searchResult.sort((a, b) => b.rating - a.rating);
        }

        //sort by order_by
        res.json(searchResult);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  }
  app.post("/api/get_services_by_search", function (req, res) {
    console.log(req.body);
    console.log("getting services by search back end");
    myZip = req.body.zipcode;
    zipcode = req.body.zipcode;
    service_name = req.body.service_name;
    service_name = "%" + service_name + "%";
    service_price_range_top = req.body.service_price_top;
    service_price_range_bottom = req.body.service_price_bottom;
    order_by = req.body.order_by;
    search_limit = req.body.search_limit;

    if (service_name === null || service_name === "") {
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

    if (
      service_price_range_top !== null &&
      service_price_range_bottom !== null &&
      service_price_range_top > service_price_range_bottom &&
      service_price_range_top > 0 &&
      service_name !== null &&
      service_name.length > 0 &&
      zipcode !== null &&
      zipcode.length === 5
    ) {
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
    } else if (zipcode === null || zipcode === "" || zipcode.length !== 5) {
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
