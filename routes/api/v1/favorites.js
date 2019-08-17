express = require('express');
router = express();

var FavoriteModel = require('../../../models/favorite.model');
const axios = require('axios')

router.get('/', (req, res) => {
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
