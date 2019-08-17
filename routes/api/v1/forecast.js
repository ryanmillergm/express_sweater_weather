if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
var express = require('express');
var router = express.Router();
let UserModel = require('../../../models/user.model');

const dotenv = require('dotenv').config()
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY
const axios = require('axios')

router.get('/', (req, res) => {
  location = req.url
  console.log(req.body.api_key)
  console.log("--------------")
  UserModel.findOne({
    $or: [
           { api_key : req.body.api_key }
         ]
  })
    .then(user => {
      if (user != null) {
        axios({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${GOOGLE_API_KEY}`,
            responseType: 'json'
          })
          .then(data => {

            axios({
              url: `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${data.data.results[0].geometry.location.lat},${data.data.results[0].geometry.location.lng}?units=auto`,
              responseType: 'json'
            })
            .then(data => res.json(
              {
              "location": data.data.timezone,
              "currently": {
                "summary": data.data.currently.summary,
                "icon": data.data.currently.icon,
                "precipIntensity": data.data.currently.precipIntensity,
                "precipProbability": data.data.currently.precipProbability,
                "temperature": data.data.currently.temperature,
                "humidity": data.data.currently.humidity,
                "pressure": data.data.currently.pressure,
                "windSpeed": data.data.currently.windSpeed,
                "windGust": data.data.currently.windGust,
                "windBearing": data.data.currently.windBearing,
                "cloudCover": data.data.currently.cloudCover,
                "visibility": data.data.currently.visibility
              },
              "hourly": {
                "summary": data.data.hourly.summary,
                "icon": data.data.hourly.icon,
                "data": [
                  {
                    "summary": data.data.hourly.data[0].summary,
                    "icon": data.data.hourly.data[0].icon,
                    "precipIntensity": data.data.hourly.data[0].precipIntensity,
                    "precipProbability": data.data.hourly.data[0].precipProbability,
                    "temperature": data.data.hourly.data[0].temperature,
                    "humidity": data.data.hourly.data[0].humidity,
                    "pressure": data.data.hourly.data[0].pressure,
                    "windSpeed": data.data.hourly.data[0].windSpeed,
                    "windGust": data.data.hourly.data[0].windGust,
                    "windBearing": data.data.hourly.data[0].windBearing,
                    "cloudCover": data.data.hourly.data[0].cloudCover,
                    "visibility": data.data.hourly.data[0].visibility
                  }
                ]
              },
              "daily": {
                "summary": data.data.daily.summary,
                "icon": data.data.daily.icon,
                "data": [
                  {
                    "time": data.data.daily.data[0].time,
                    "summary": data.data.daily.data[0].summary,
                    "icon": data.data.daily.data[0].icon,
                    "sunriseTime": data.data.daily.data[0].sunriseTime,
                    "sunsetTime": data.data.daily.data[0].sunsetTime,
                    "precipIntensity": data.data.daily.data[0].precipIntensity,
                    "precipIntensityMax": data.data.daily.data[0].precipIntensityMax,
                    "precipProbability": data.data.daily.data[0].precipProbability,
                    "precipType": data.data.daily.data[0].precipType,
                    "temperatureHigh": data.data.daily.data[0].temperatureHigh,
                    "temperatureLow": data.data.daily.data[0].temperatureLow,
                    "humidity": data.data.daily.data[0].humidity,
                    "pressure": data.data.daily.data[0].pressure,
                    "windSpeed": data.data.daily.data[0].windSpeed,
                    "windGust": data.data.daily.data[0].windGust,
                    "cloudCover": data.data.daily.data[0].cloudCover,
                    "visibility": data.data.daily.data[0].visibility,
                    "temperatureMin": data.data.daily.data[0].temperatureMin,
                    "temperatureMax": data.data.daily.data[0].temperatureMax
                  }
                ]
              }
            }
          ))
          })
          .catch(error => {
            res.setHeader("Content-Type", "application/json");
            res.status(500).send({error})
          })
        .catch(error => {
          res.setHeader("Content-Type", "application/json");
          res.status(500).send({error})
        })
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send("Sorry, you do no have authorization.")
    }
  })
})

module.exports = router
