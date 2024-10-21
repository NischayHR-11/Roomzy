const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '../.env') });
console.log(process.env.MONGO_URI);
const mongoose=require("mongoose");
const listingsdata=require("./data.js");
const listing=require("../models/listings.js");

main().then(()=>{
    console.log("DATA BASE CONNECTED SUCCESSFULLY..");
})
.catch((err)=>{
    console.log(err);
})

async function main() {
    
    let db=process.env.MONGO_URI;
    console.log(db);
    await mongoose.connect(db);
}

async function init(){

    await listing.deleteMany({});
    listingsdata.data=listingsdata.data.map((obj)=>({...obj,owner:'67150c12422a6c3ba235abe4'}));   // to add owners to all objects in data.
    console.log(listingsdata.data);
    await listing.insertMany(listingsdata.data);
}
init();

