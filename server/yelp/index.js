const { yelpAccessToken } = require('../../secrets')
const yelp = require('yelp-fusion');

const yelpClient = yelp.client(yelpAccessToken);

// yelpClient.search({
//   term: 'coffee',
//   latitude: 40.714,
//   longitude: -74.005,
//   radius: 1000,
//   limit: 5
// }).then(response => {
//   console.log(response.jsonBody.businesses);
// }).catch(e => {
//   console.log(e);
// });

module.exports = yelpClient;
