const express = require('express');
const bodyParser = require('body-parser');
const mongodbClient = require('mongodb').MongoClient;
const db = require('./config/db')

const app = express();

const port = process.env.PORT ||5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())

mongodbClient.connect(db.url,{ useNewUrlParser: true }, (err, database) =>{
    if(err) return console.log(err)
    require('./app/routes')(app, database);
    app.listen(port, ()=>{
        console.log("Connection established on port "+ port);
    })
})