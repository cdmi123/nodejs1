var product = require('../model/productmodel');

exports.insert = async (req,res) => {
    var data = await product.create(req.body);
    res.status(200).json({
        status:"success",
        data
    })
}

exports.get_data = async (req,res) => {
    var data = await product.find().populate("user_name");
    res.status(200).json({
        status:"success",
        data
    })
}