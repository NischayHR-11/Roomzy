const express=require("express");
const app=express();
const port=8080;                                                        // Server Portal
const method=require("method-override");                                // Form Contains Only two methods(get,post) ,but to make it convertable this package is reuired.
const path=require("path");                                             // For Setting Deafult Paths
const mongoose=require("mongoose");                                     // To Connect Mogodb and javascript ( Backend [node]).
const listing=require("./models/listings");                             // Model (Structure of Collection with Schema).
const review=require("./models/review");                                // Model (Structure of Collection with Schema).
const ejsmate=require("ejs-mate");                                      // Frontend Templating Like BoilerPlates(Header,Footer).
const asyncwrap=require("./utils/asyncwrap");                           // For Error Handling Instead Of Try Catch.
const Expresserror=require("./utils/ExpressUserDefinedError");          // For Using User Defined Error Handlings.
const {listingschema}=require("./ValidationSchema");                    // For  Error Handling By Apis Like Postman.


app.set("view engine","ejs");                                    // When The Response Is 'Rendered' default path to access.
app.set("views",path.join(__dirname,"/views"));               
app.use(express.static(path.join(__dirname,"/public")));         // Default middleware : for default paths.
app.use(express.urlencoded({extended:true}));                    // Default middleware : for get data sent from the request.
app.use(method('_method'));                                      // ThirdParty middleware : To covert From 1 method to other.
app.engine("ejs",ejsmate);                                       // for use ejs-mate.

                                              
main().then(()=>{                                                        // Since To Connect mongoDb To Backend (Server) is Asyncronous Process.                        
    console.log("DATA BASE CONNECTED SUCCESSFULLY..");               
})
.catch((err)=>{
    console.log(err);
})

async function main() {                                               // To Connect mongoDb To Backend (Server).
    
    await mongoose.connect("mongodb://127.0.0.1:27017/roomzy");       // MongoDB URL.
}

const listingvalidate=(req,res,next)=>{

    let{error}=listingschema.validate(req.body);

    if(error){

        let errmsg=error.details.map((el)=>el.message).join(",");  // all err details will be separated by ',' .
        throw new Expresserror(400,errmsg);
    }else{
        next();
    }
}

app.listen(port,(req,res)=>{

    console.log("Listeing To the The Server Port 8080...");
});

app.get("/",(req,res)=>{

    res.send("This Is Root Page.");
});

app.get("/listing",async(req,res,next)=>{

    try{

        const listings= await listing.find({});
        res.render("listing/index",{listings});

    }catch(err){

        next(err);
    }
});

app.get("/listing/new",(req,res)=>{

    res.render("listing/new");
});

app.get("/listing/:id",asyncwrap(async(req,res)=>{

    let {id}=req.params;
    let list=await listing.findById(id).populate("reviews");    // populate gives full information about reviews.(which before was only id)
    res.render("listing/info",{list});
}));

app.post("/listing",asyncwrap(async(req,res)=>{

    if(!req.body.listing){

        throw new Expresserror(404,"Please enter valid listing !!");
    }

    let listings=req.body;
    console.log(listings);
    
    await listing.create(listings.listing);
    res.redirect("/listing")
}));

app.get("/listing/:id/edit",asyncwrap(async(req,res)=>{

    let {id}=req.params;
    const list = await listing.findById(id);
    // console.log(list);
    res.render("listing/edit",{list});
}));

app.patch("/listing/:id",asyncwrap(async(req,res)=>{

    if(!req.listing){                    // used even when form-validation is done .(client side ) because to over come server side error (sent through api requeests[postman,hopttsoch]).

        throw new Expresserror(404,"Please enter valid listing !!");   // instead of writing for all condition ,we use Validation Schema (joi).{to handel the request sent through api's like postman}
    }
    
    let {id}=req.params;
    await listing.findByIdAndUpdate(id,{...req.body.listing});     // to split the attributes in object (...)
    res.redirect("/listing");
}));

app.delete("/listing/:id",asyncwrap(async(req,res)=>{

    let {id}=req.params;
    let d=await listing.findOneAndDelete({ _id: id });
    // console.log(d);
    res.redirect("/listing");
}));

app.post("/listing/:id/review",asyncwrap(async(req,res)=>{

    console.log(req.body);
    let {id}=req.params;
    let{star,reviewp}=req.body;
    let list=await listing.findById(id);
    let r=await review.create({userid:"nischay",stars:star,content:reviewp});
    list.reviews.push(r);
    await list.save();
    console.log(r);
    res.redirect(`/listing/${id}`);
}));

app.delete("/listing/:id1/review/:id",asyncwrap(async(req,res)=>{

    let {id1,id}=req.params;
    await review.deleteOne({_id:id});
    const p=await listing.findByIdAndUpdate(id1,{$pull :{reviews:id}});    // $pull=> removes perticular id from reviews in listing.
    res.redirect(`/listing/${id1}`);
}));

app.all("*",(req,res,next)=>{

    next(new Expresserror(404,"Page Not Found !!"));
});

app.use((err,req,res,next)=>{                                   // Error Handling MiddleWare.

    let{status=500,message="Something went wrong"}=err;
    res.status(status).render("listing/error",{message});
});

