const express = require("express");
const router=express.Router();
const user=require("../models/User")

router.get("/signup",(req,res)=>{

    res.render("user/signup.ejs");
})

router.post("/signup",async(req,res)=>{

    try{

        let{username,email,password}=req.body;
        let curuser =new user({username:username,email:email});
        const registereduser=await user.register(curuser,password);
        console.log(registereduser);
        req.flash("success",`Welcome To Roomzy , ${username}.....`);
        res.redirect("/listing");
    }catch(err){

        req.flash("error", "User Already Exsists With This Userame , Please Try Again.");
        res.redirect("/signup");
    }
})

router.get("/login",(req,res)=>{
    res.render("user/login.ejs");
})

router.post("/login",(req,res)=>{

    res.send("Authentication");
})


module.exports=router;
