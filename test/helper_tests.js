const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/express_sweater_weather', { useNewUrlParser: true });
  mongoose.connection
      .once('open', () => {
        // console.log('Connected!'))
      done();
    })
      .on('error', error => {
          console.warn('Error : ',error);
    });
});
