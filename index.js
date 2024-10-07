const express=require("express");
const app=express();
const port=8080;
const method=require("method-override");
const path=require("path");
const mongoose=require("mongoose");
const listing=require("./models/listings");
const ejsmate=require("ejs-mate");



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));
app.use(method('_method'));
app.engine("ejs",ejsmate);


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

app.get("/listing",async(req,res)=>{

    const listings= await listing.find({});
    res.render("listing/index",{listings});
});

app.get("/listing/new",(req,res)=>{

    res.render("listing/new");
});

app.get("/listing/:id",async(req,res)=>{

    let {id}=req.params;
    let list=await listing.findById(id);
    res.render("listing/info",{list});
});

app.post("/listing",async(req,res)=>{

    let listings=req.body;
    console.log(listings);
    
    await listing.create(listings.listing);
    res.redirect("/listing")
});

app.get("/listing/:id/edit",async(req,res)=>{

    let {id}=req.params;
    const list = await listing.findById(id);
    // console.log(list);
    res.render("listing/edit",{list});
})

app.patch("/listing/:id",async(req,res)=>{

    let {id}=req.params;
    await listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listing");
})

app.delete("/listing/:id",async(req,res)=>{

    let {id}=req.params;
    await listing.deleteOne({_id:id});
    res.redirect("/listing");
})