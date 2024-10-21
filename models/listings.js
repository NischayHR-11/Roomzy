const mongoose=require("mongoose");
const review = require("./review.js");

const listingschema= new mongoose.Schema({

    title:{
        type:String,
        require:true,
    },

    description :String,

    image:{
        type:String,
        default:"https://www.pixelstalk.net/wp-content/uploads/2016/06/Nature-Wallpaper.jpg",
        set :(v)=>v===""?"https://www.pixelstalk.net/wp-content/uploads/2016/06/Nature-Wallpaper.jpg":v,
    },
    price:{
        type :Number,
        min:0,
    }
    ,
    reviews:[
        {

        type:mongoose.Schema.Types.ObjectId,
        ref:"review"
        },
    ],

    location:String,
    country:String,
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
});


listingschema.post("findOneAndDelete",async(listingdata)=>{     // post delete middle ware {executed every time when the listing is deleted } should the wriiten before defining model!!.

        console.log("middle ware triggered...");
        console.log(listingdata);
        let d=await review.deleteMany({_id:{$in : listingdata.reviews}});
        console.log("deleted data :"+d);
});

const listing = new mongoose.model("listing",listingschema);

module.exports=listing;
