const mongoose = require('mongoose');

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
  } = process.env;
 
  const options = {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500, 
    connectTimeoutMS: 10000
  };

//const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
const url = `mongodb+srv://ams:database@mycluster.d3wpu.mongodb.net/ams?retryWrites=true&w=majority`
exports.connectToDatabase =mongoose.connect(url).then( function() {
  console.log('MongoDB is connectedd');
})
  .catch( function(err) {
  console.log('MongoDB is NOT connected');
});
