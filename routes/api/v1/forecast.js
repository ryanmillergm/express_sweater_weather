if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
var express = require('express');
var router = express.Router();

const dotenv = require('dotenv').config()
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY
const axios = require('axios')

router.get('/', (req, res) => {
  location = req.url
  // var googleService = new googleService(location);

  axios({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${GOOGLE_API_KEY}`,
    responseType: 'json'
  })
  .then(data => {

    axios({
      url: `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${data.data.results[0].geometry.location.lat},${data.data.results[0].geometry.location.lng}?units=auto`,
      responseType: 'json'
    })
    .then(data => res.json(data.data))
  })
})

module.exports = router
