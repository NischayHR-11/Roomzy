const mongoose=require("mongoose");

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
    country:String
});

const listing = new mongoose.model("listing",listingschema);

module.exports=listing;
