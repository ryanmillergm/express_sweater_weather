let UserModel = require('../models/user.model')
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  UserModel.find()
    .then(users => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(users));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
});

// router.get('/')


module.exports = router;

// UserModel.findAll()
// console.log(users)
//   .then(users => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(200).send(JSON.stringify(users));
//   })
//   .catch(error => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(500).send({error})
//   });
// });
