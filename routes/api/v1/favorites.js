express = require('express');
router = express();
var FavoriteModel = require('../../../models/favorite.model')
var UserModel = require('../../../models/user.model')
const axios = require('axios')

router.post('/', (req, res) => {
  UserModel.findOne(
    {
      $or: [
        { api_key: req.body.api_key}
      ]
    }
  )
    .then(user => {
      if (user != null) {
        let location = new FavoriteModel(req.body)
        location.save()
          .then(doc => {
            if(!doc || doc.length === 0) {
              return res.status(500).send(doc)
            }
          })
        console.log(req.body.location)
        console.log(user.favorites)
        user.favorites.push(location);
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(user));
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(401).send("Sorry, you do no have authorization.")
      }
    })
  // author.stories.push(story1);
  // author.save(callback);
  // find({ author: author._id }).
  // exec(function (err, stories) {
  //   if (err) return handleError(err);
  //   console.log('The stories are an array: ', stories);
  // });
//   const story = await Story.findOne({ title: 'Casino Royale' }).populate('authors');
// story.authors;
});

module.exports = router;
