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
    
    await mongoose.connect("mongodb://127.0.0.1:27017/roomzy");
}

async function init(){

    await listing.deleteMany({});
    console.log(listingsdata.data);
    await listing.insertMany(listingsdata.data);
}

init();

