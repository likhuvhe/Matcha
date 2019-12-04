const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const db = require('./model/db')
const collection = 'users'
db.connect()
// const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs')
app.set('views',__dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

// const MongoClient = require('mongodb').MongoClient;
// // const uri = "mongodb+srv://lkhuvhe:Kli%401991@cluster0-hc9qp.mongodb.net/test?retryWrites=true&w=majority";
// const url = "mongodb://localhost:27017"
// const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//     if (err)
//     {
//         console.log('error occured while connecting to MongoDB')
//     }
//    else
//      console.log('Connected to MongoDB')
//  const collection = client.db("metcha").collection("users");
//     // perform actions on the collection object
//     client.close();
// });

app.use('/', indexRouter)

app.listen(5000, (err) => console.log('server is running at port 5000'))