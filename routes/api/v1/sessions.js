let UserModel = require('../../../models/user.model');
var express = require('express');
var router = express.Router();

router.post('/', (req, res, next) => {
  UserModel.findOne(
   {
     $or: [
            { email : req.body.email }
          ]
   }
)
  .then(user => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify({
      "api_key": `${user.api_key}`
      }));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({error})
  })
})

module.exports = router
