const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser =  require('body-parser');

const app = express();
const postRoutes = require('./routes/posts');
// const {getPosts} = require('./controller/posts');
dotenv.config();

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true,  useUnifiedTopology: true  }).then(() => console.log("db connected"));


mongoose.connection.on('error', err => {console.log("there is an error")});




app.use(morgan('dev'));

app.use(bodyParser.json());

app.use('/', postRoutes);

// app.get("/", getPosts);





const port = process.env.PORT || 8080;
app.listen(3000, () => console.log("the server is listening on port 3000..."));