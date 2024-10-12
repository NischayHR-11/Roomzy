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
    
    await mongoose.connect("mongodb+srv://nischayhr11:Nischay1@cluster0.6p9g1.mongodb.net/roomzy?retryWrites=true&w=majority&appName=Cluster0");
}

async function init(){

    await listing.deleteMany({});
    console.log(listingsdata.data);
    await listing.insertMany(listingsdata.data);
}

init();

