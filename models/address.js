const mongoose = require(`mongoose`)
const {ObjectId} = mongoose.Schema.Types
const userdata = mongoose.model(`userdata`)


const addressSchema = new mongoose.Schema(
    {
        houseNo : {
            type : String,
            required : true
        },
        city : {
            type : String,
            required : true
        },
        pincode : {
            type : String,
            required : true
        },
        userRef : {
            type : ObjectId,
            ref : userdata
        }
}
)

mongoose.model("address" , addressSchema)