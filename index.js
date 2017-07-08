const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('./routes/authentication');
const config = require('./config/database');


const app = express();

const port = 8080;

mongoose.connect(config.uri, (err) => {
  if(err){
    console.log("Could NOT connect to database: ", err);
  } else {
    console.log("Connected to database: " + config.db);
  }
});

const corsOptions = {
  origin: 'http://localhost:4200',
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist/'));
app.use('/authentication', router);


app.get('*', function(req,res) {
  res.sendFile(path.join(__dirname + 'client/dist/index.html'));
});



app.listen(port, function() {
  console.log("Listening on port " + port);
})
