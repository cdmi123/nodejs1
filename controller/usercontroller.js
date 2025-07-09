var user = require('../model/usermodel');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'languagepdf@gmail.com',
      pass: 'xnappmlyzaviturf'
    }
});

var login_status=0;

exports.insert = async (req,res) => {

    var b_pass = await bcrypt.hash(req.body.password, 10);

    req.body.password = b_pass;
    var data = await user.create(req.body);
        
            res.status(200).json({
                data
            })
      
}

exports.get_data = async (req,res) => {

    var limit=4;
    var total_record = await user.find().countDocuments();
    var total_page = Math.ceil(total_record/limit);
    var page_no = req.query.page_no;

    if(page_no==undefined)
    {
        page_no=1;
    }

    var start = (page_no-1)*limit;

    var data = await user.find().limit(limit).skip(start);


    res.status(200).json({
        total_record,
        total_page,
        page_no,
        data
    })
}

exports.update_data = async (req,res) => {

    var id = req.params.id;
    
    var data = await user.findByIdAndUpdate(id,req.body);
    res.status(200).json({
        status:"Record Update"
    })
}

exports.delete_data = async (req,res) => {

    var id = req.params.id;
    
    var data = await user.findByIdAndDelete(id);
    res.status(200).json({
       status:"Record Delete"
    })
}

exports.login = async (req,res) => {
    var data = await user.find({email:req.body.email});
    if(login_status==0)
    {
        if(data.length==1)
        {
            bcrypt.compare(req.body.password,data[0].password, function(err, result) {
            
                if(result==true)
                {
                    login_status=1;
                    res.status(200).json({
                        status:"login success"
                    })
                }else{
                    res.status(200).json({
                        status:"Check your email and password"
                    })
                } 
            });
        }else{
            res.status(200).json({
                status:"Check your email and password"
            })
        }
    }else{
        res.status(200).json({
            status:"user is already login"
        })
    }
}

exports.logout = async (req,res) => {
    login_status=0;
    res.status(200).json({
        status:"Logout"
    })
}
