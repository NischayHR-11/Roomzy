const express = require("express");
const router=express.Router();
const user=require("../models/User");
const passport=require("passport");

router.get("/signup",(req,res)=>{

    res.render("user/signup.ejs");
})

router.post("/signup",async(req,res,next)=>{

    try{

        let{username,email,password}=req.body;
        let curuser =new user({username:username,email:email});
        const registereduser=await user.register(curuser,password);
        console.log(registereduser);
        req.logIn(registereduser,(err)=>{     // Automatically Logins The User After SignUp.

            if(err){

                next(err);
            }else{

                req.flash("success",`Welcome To Roomzy , ${username}.....`);
                res.redirect("/listing");
            }
        });

    }catch(err){

        req.flash("error", "User Already Exsists With This Userame , Please Try Again.");
        res.redirect("/signup");
    }
});

router.get("/login",(req,res)=>{
    res.render("user/login.ejs");
});

router.post("/login",passport.authenticate("local",{ failureRedirect:'/login', failureFlash: true}),async(req,res)=>{    // automatically Authenticates The User.

        let{username}=req.body;
        req.flash("success",`Welcome Back To Roomzy '${username}' ,  You Are Logedin !!! ....`);
        res.redirect("/listing");
    }
);

router.get("/logout",(req,res,next)=>{

    let username=req.user.username;

    req.logout((err)=>{                    // For Loging Out The User.

        if(err){

            next(err);
        }else{

            req.flash("success",`'${username}' LoggedOut Successfully... `);
            res.redirect("/listing");
        }

    })
})



module.exports=router;
