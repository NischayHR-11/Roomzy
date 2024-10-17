const mongoose=require("mongoose");

const reviewschema =new mongoose.Schema({

    name:String,
    Stars:{

        type:Number,
        min:1,
        max:5
    },
    createdAt:{

        type:Date,
        default:Date.now
    }
});


module.exports= mongoose.model("review",reviewschema);

