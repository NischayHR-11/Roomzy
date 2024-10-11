// instead of Many if statements for all condition ,we use Validation Schema (joi).{to handel the request sent through api's like postman}.

const joi =require("joi");
const listing = require("./models/listings");

module.exports.listingschema = joi.object({

    listing:joi.object({

        title:joi.string().required(),
        description:joi.string().required(),
        price:joi.number().required().min(0),
        location:joi.string().required(),
        country:joi.string().required(),
        image:joi.string().allow("",null),

    }).required()
})