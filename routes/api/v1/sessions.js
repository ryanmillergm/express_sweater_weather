let UserModel = require('../../../models/user.model');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')

router.post('/', (req, res, next) => {
  UserModel.findOne(
   {
     $or: [
            { email : req.body.email }
          ]
   }
)
  .then(user => {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify({
        "api_key": `${user.api_key}`
        }));
    } else {
      res.status(404).send("Incorrect email or password")
    }
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({error})
  })
})

module.exports = router
