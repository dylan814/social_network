const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser =  require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require("cookie-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();
const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');
const userRoutes = require("./routes/user");

dotenv.config();

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true,  useUnifiedTopology: true  }).then(() => console.log("db connected"));


mongoose.connection.on('error', err => {console.log("there is an error")});


app.get("/api", (req, res) => {
    fs.readFile("docs/apiDocs.json", (err, data) => {
        if (err) {
            res.status(400).json({
                error: err
            });
        }
        const docs = JSON.parse(data);
        res.json(docs);
    });
});


app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use('/api', postRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error: "this is an unauthorized page"});
    }
  });

// app.get("/", getPosts);





const port = process.env.PORT || 8080;
app.listen(port, () => console.log("the server(/api) should be listening on port 8080..."));