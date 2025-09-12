const express=require('express')
const router=express.Router();
const User=require('../models/User');
const bcrypt=require('bcryptjs')



router.get('/register',(req,res)=>{
    return res.render('auth/register',{error:req.query.error})
});
router.post('/register',async(req,res)=>{
    try {
        const{userName,email,password}=req.body;

        //check if user exist or not
        let user=await User.findOne({email})
        if(user){
            // console.log("User Exist ! Please Enter Unique Email")
            res.redirect('/auth/register?error=User Already Exist')
            
        }
       

        const hashedPassword=await bcrypt.hash(password,10);

        user=new User({userName,email,password:hashedPassword});

        await user.save();
        res.redirect('/auth/login')

    } catch (error) {
        console.log(error)
        res.status(500).send("Can't Post User Information")
    }
});

router.get('/login',(req,res)=>{
    return res.render("auth/login",{error:req.query.error})
});

router.post('/login',async(req,res)=>{
    try {
        const {email,password}=req.body;

        const user=await User.findOne({email})
        // if(!user){
        //     res.send("Invalid Email and Password")
        // }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch)return res.redirect("/auth/login?error=Invalid  Password")
        
        
        req.session.user=user;
        res.redirect('/')

    } catch (error) {
        console.error(error)
        return res.status(500).send("Server Error| Con't login")
    }
});


router.get('/logout',(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            console.error(err)
            return res.status(500).send('Failed to Logout Please Wait')
        }
        res.clearCookie('connect.sid')
        res.redirect('/')
    })
})


module.exports=router