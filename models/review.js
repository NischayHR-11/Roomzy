const mongoose=require("mongoose");

const reviewschema =new mongoose.Schema({

    userid:String,
    stars:{

        type:Number,
        min:1,
        max:5,
    },
    createdAt:{

        type:Date,
        default:Date.now
    },
    content:{
        type : String,
        require
    }
});


const review= mongoose.model("review",reviewschema);

module.exports=review;