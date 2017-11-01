/**
 * Created by chlee1001 on 2017-11-02.
 */
const mongoose = require('mongoose');

module.exports = () => {
  function connect() {
    mongoose.connect('localhost:27017', function(err) {
      if (err) {
        console.error('mongodb connection error', err);
      }
      console.log('mongodb connected');
    });
  }
  connect();
  mongoose.connection.on('disconnected', connect);
  var restaurant = require('./models/restaurant.js'); 
  var lns = new restaurant();
  lns.title = 'zero';
  
};