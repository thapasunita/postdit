const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/postdit');

const db = mongoose.connection;


db.on('error', (err)=>{
    console.log(`Error connecting db ${err}`);
})

db.once('open', () => {
    console.log("Connected to mongodb");
});

exports.module = db;