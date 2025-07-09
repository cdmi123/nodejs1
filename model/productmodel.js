var mongoose = require('mongoose');

var productschema = new mongoose.Schema({
    name:{
        type:String
    },
    user_name:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
})

module.exports = mongoose.model("product",productschema);