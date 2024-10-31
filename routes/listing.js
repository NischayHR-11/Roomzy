const express=require("express");
const router=express.Router();
const listing=require("../models/listings");                             // Model (Structure of Collection with Schema).
const asyncwrap=require("../utils/asyncwrap");                           // For Error Handling Instead Of Try Catch.
const Expresserror=require("../utils/ExpressUserDefinedError");          // For Using User Defined Error Handlings.
const { authenticate } = require("passport");
const islogined=require("../AuthenticationMiddleWare");                  // For Login Authentication.
const review=require("../models/review");                                // Model (Structure of Collection with Schema).
const multer=require("multer");                                          // Used In the Forms To Send request data in the form of files (images,pdf,etc); as URL encoded Is Only For Raw Datas.
const {storage}=require("../CloudConfig.js")                             // Stores data as specified in storgae key word which required from other file.
const upload=multer({storage});                                          // Folder Where The File Is Stored.


router.get("/",async(req,res,next)=>{

    try{

        const listings= await listing.find({});
        res.render("listing/index",{listings});

    }catch(err){

        next(err);
    }
});

router.get("/new",islogined,(req,res)=>{

    res.render("listing/new");
});

router.get("/:id",asyncwrap(async(req,res)=>{

    let {id}=req.params;
    let list=await listing.findById(id).populate({
        path:"reviews",
        populate:{                      // Nested Populate To display owner Within reviews.
            path:"author"
        },
    }).populate("owner");               // populate gives full information about reviews.(which before was only id)
    console.log(list);
    res.render("listing/info",{list});
}));

router.post("/",upload.single("listing[image]"),asyncwrap(async(req,res)=>{


    if(!req.body.listing){

        throw new Expresserror(404,"Please enter valid listing !!");
    }

    let listings=req.body;
    // console.log(listings);
    const url=req.file.path;                   // Uploaded Image File Data . (image url).
    const filename=req.file.filename;          // Image stored File Name.
    console.log(url +"....." + filename);      // Verification.
    
    let d=await listing.create(listings.listing);
    d.owner=req.user._id;                                        // to add Owner For The Created Listing.
    d.image={url,filename};                                      // Storing The url of Image From Cloud and file name into database.
    await d.save();                                              
    req.flash("success","New Listing Added..");
    res.redirect("/listing");
}));

router.get("/:id/edit",islogined,asyncwrap(async(req,res)=>{

    let {id}=req.params;
    const list = await listing.findById(id);
    // console.log(list);
    res.render("listing/edit",{list});
}));

router.patch("/:id",asyncwrap(async(req,res)=>{
    
    if(!req.body.listing){                    // used even when form-validation is done .(client side ) because to over come server side error (sent through api requeests[postman,hopttsoch]).

        throw new Expresserror(404,"Please enter valid listing !!");   // instead of writing for all condition ,we use Validation Schema (joi).{to handel the request sent through api's like postman}
    }
    
    let {id}=req.params;
    await listing.findByIdAndUpdate(id,{...req.body.listing});     // to split the attributes in object (...)
    req.flash("success","Listing Edited Successfully..");
    res.redirect(`/listing/${id}`);
}));

router.delete("/:id",islogined,asyncwrap(async(req,res)=>{

    let {id}=req.params;
    let d=await listing.findOneAndDelete({ _id: id });
    // console.log(d);
    req.flash("error","Listing Deleted Successfully..");
    res.redirect("/listing");
}));

module.exports=router;