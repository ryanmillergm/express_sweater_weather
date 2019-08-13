var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});


// const mongoose = require('mongoose');
//
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/express_sweater_weather');
// mongoose.connection
//     .once('open', () => console.log('Connected!'))
//     .on('error', (error) => {
//         console.warn('Error : ',error);
//     });
//
// beforeEach((done) => {
//     mongoose.connection.collections.pokemons.drop(() => {
//         done();
//     });
// });
