class googleService {
  constructor(location){
    this.location = location;
  }
  const dotenv = require('dotenv').config()
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
  const axios = require('axios')
  const url = `https://maps.googleapis.com/maps/api/geocode/json?${this.location}&key=${GOOGLE_API_KEY}`

  axios.get(url)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

module.exports = new googleService;
