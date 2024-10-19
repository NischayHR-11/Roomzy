const express=require("express");
const router=express.Router( {mergeParams : true});
const listing=require("../models/listings");                             // Model (Structure of Collection with Schema).
const review=require("../models/review");                                // Model (Structure of Collection with Schema).
const asyncwrap=require("../utils/asyncwrap");                           // For Error Handling Instead Of Try Catch.

router.post("/",asyncwrap(async(req,res)=>{

    console.log(req.body);
    let { id } = req.params;
    console.log(req.param);
    let{star,reviewp}=req.body;
    let list=await listing.findById(id);
    console.log(list);
    let r=await review.create({userid:"nischay",stars:star,content:reviewp});
    console.log(r);
    list.reviews.push(r);
    await list.save();
    res.redirect(`/listing/${id}`);
}));

router.delete("/:id1",asyncwrap(async(req,res)=>{

    let {id,id1}=req.params;
    await review.deleteOne({_id:id1});
    const p=await listing.findByIdAndUpdate(id,{$pull :{reviews:id1}});    // $pull=> removes perticular id from reviews in listing.
    res.redirect(`/listing/${id}`);
}));


module.exports=router;