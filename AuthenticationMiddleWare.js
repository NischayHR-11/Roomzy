module.exports=(req,res,next)=>{

    if(!req.isAuthenticated()){                                            // To check For The Login Of User.

        req.flash("error","Please login !!!.");
        res.redirect("/login");
    }else{
        next();
    }
}