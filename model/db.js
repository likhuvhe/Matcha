const mongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const dbname = 'matcha'
// const url = 'mongodb://localhost:27017'
const uri = "mongodb+srv://lkhuvhe:Kli%401991@cluster0-hc9qp.mongodb.net/test?retryWrites=true&w=majority"
const mongoOptions = {useNewUrlParser: true, useUnifiedTopology: true}

const state = {
    db : null
}

const connect = (err) =>{
    
        mongoClient.connect(uri, mongoOptions, (err, client) => {
            if (err)
                throw err
            else{
                state.db = client.db(dbname)
            }
        })
}
const getPrimaryKey = (_id) =>{
    return ObjectID(_id)
}
const getDB = () =>{
    return state.db
}
module.exports = {getDB, connect, getPrimaryKey}