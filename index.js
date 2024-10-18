const express=require("express");
const app=express();
const port=8080;                                                        // Server Portal
const method=require("method-override");                                // Form Contains Only two methods(get,post) ,but to make it convertable this package is reuired.
const path=require("path");                                             // For Setting Deafult Paths
const mongoose=require("mongoose");                                     // To Connect Mogodb and javascript ( Backend [node]).
const ejsmate=require("ejs-mate");                                      // Frontend Templating Like BoilerPlates(Header,Footer).
const Expresserror=require("./utils/ExpressUserDefinedError");          // For Using User Defined Error Handlings.
const {listingschema}=require("./ValidationSchema");                    // For  Error Handling By Apis Like Postman.
const listingroutes =require("./routes/listing");                       // For Getting All The Routes Related To Listing.
const reviewroutes =require("./routes/review");                         // For Getting All The Routes Related To review. 

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

app.use("/listing",listingroutes);
app.use("/listing/:id/review",reviewroutes);

app.get("/",(req,res)=>{

    res.send("This Is Root Page.");
});

app.all("*",(req,res,next)=>{

    next(new Expresserror(404,"Page Not Found !!"));
});

app.use((err,req,res,next)=>{                                   // Error Handling MiddleWare.

    let{status=500,message="Something went wrong"}=err;
    res.status(status).render("listing/error",{message});
});
