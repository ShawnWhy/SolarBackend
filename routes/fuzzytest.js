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