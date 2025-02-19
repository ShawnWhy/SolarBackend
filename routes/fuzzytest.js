// const FuzzySearch = require("fuzzy-search");
// const result = [
//   {
//     id: 1,
//     service_category: "Plumbing",
//     service_description:
//       "Expert plumbing services for residential and commercial properties.",
//     price: 150,
//     votes: 45,
//     User: {
//       id: 101,
//       username: "plumberJoe",
//       zipcode: 20165,
//       user_average_rating: 4.5,
//       merchant_score: 4.7,
//     },
//   },
//   {
//     id: 2,
//     service_category: "Plumbing",
//     service_description: "Affordable plumbing repairs and installations.",
//     price: 100,
//     votes: 30,
//     User: {
//       id: 102,
//       username: "plumbingPro",
//       zipcode: 20166,
//       user_average_rating: 4.2,
//       merchant_score: 4.5,
//     },
//   },
//   {
//     id: 3,
//     service_category: "Plumbing",
//     service_description: "24/7 emergency plumbing services.",
//     price: 200,
//     votes: 60,
//     User: {
//       id: 103,
//       username: "emergencyPlumber",
//       zipcode: 20167,
//       user_average_rating: 4.8,
//       merchant_score: 4.9,
//     },
//   },
// ];
// const searcher = new FuzzySearch(
//   result,
//   ["service_category", "service_description"],
//   {
//     caseSensitive: false,
//   }
// );

// const searchTerm = "plummber";
// const searchResults = searcher.search(searchTerm);

// console.log(searchResults);


const Fuse = require("fuse.js");
const result = [
  {
    id: 1,
    service_category: "Plumbing",
    service_description:
      "Expert plumbing services for residential and commercial properties.",
    price: 150,
    votes: 45,
    User: {
      id: 101,
      username: "plumberJoe",
      zipcode: 20165,
      user_average_rating: 4.5,
      merchant_score: 4.7,
    },
  },
  {
    id: 2,
    service_category: "Plumbing",
    service_description: "Affordable plumbing repairs and installations.",
    price: 100,
    votes: 30,
    User: {
      id: 102,
      username: "plumbingPro",
      zipcode: 20166,
      user_average_rating: 4.2,
      merchant_score: 4.5,
    },
  },
  {
    id: 3,
    service_category: "Plumbing",
    service_description: "24/7 emergency plumbing services.",
    price: 200,
    votes: 60,
    User: {
      id: 103,
      username: "emergencyPlumber",
      zipcode: 20167,
      user_average_rating: 4.8,
      merchant_score: 4.9,
    },
  },
];

const options = {
  keys: ["service_category", "service_description"],
  threshold: 0.8, // Adjust the threshold for fuzzy matching
  ignoreLocation: true,
};

const fuse = new Fuse(result, options);

const searchTerm = "plamber";
const searchResults = fuse.search(searchTerm);

console.log(searchResults.map((result) => result.item));

const searchFunctionold = function (body, res) {
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
            searchFunctionFuzzyMatch(
              {
                userIds: userIds,
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
    });
  };
