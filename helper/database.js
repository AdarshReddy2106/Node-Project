const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let __db; // variable to hold the database connection

const mongoConnect = (callback)=>{
    MongoClient.connect(
    'mongodb+srv://ADARSH:Adarsh%40100%25@cluster0.6anlhot.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
    .then(client =>{
        console.log('Connected to MongoDB');
        __db = client.db(); // store the database connection in the __db variable
        callback();
    })
    .catch(err => {
        console.log(err);
        throw err; // throw an error if the connection fails
    });
}

const getDb = () => {
    if (__db) {
        return __db; // return the database connection if it exists
    }
    throw 'No database found!'; // throw an error if the database connection does not exist
}

exports.mongoConnect = mongoConnect; // export the mongoConnect function
exports.getDb = getDb; // export the getDb function
