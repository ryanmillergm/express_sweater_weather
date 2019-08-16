let UserModel = require('../../../models/user.model');
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

router.post('/', (req, res, next) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing')
  }
  if(req.body.password === req.body.password_confirmation) {
    let model = new UserModel(req.body)
    model.save()
      .then(doc => {
        if(!doc || doc.length === 0) {
          return res.status(500).send(doc)
        }
        res.status(201).send({
          "api_key": `${doc.api_key}`
          })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  } else {
    return res.status(400).send('Passwords do not match')
  }
})


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
