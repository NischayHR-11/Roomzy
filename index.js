const express=require("express");
const app=express();
const port=8080;
const method=require("method-override");
const path=require("path");
const mongoose=require("mongoose");
const data = require("./init/data");
const listing=require("./init/data.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));
app.use(method('_method'));

main().then(()=>{
    console.log("DATA BASE CONNECTED SUCCESSFULLY..");
})
.catch((err)=>{
    console.log(err);
})

async function main() {
    
    await mongoose.connect("mongodb://127.0.0.1:27017/roomzy");
}

app.listen(port,(req,res)=>{

    console.log("Listeing To the The Server Port 8080...");
});

app.get("/",(req,res)=>{

    res.send("This Is Root Page.");
});

app.get("/listing",(req,res)=>{

    console.log(listing);
    const listings=listing.sampleListings;
    res.render("listing/index.ejs",{listings});
});