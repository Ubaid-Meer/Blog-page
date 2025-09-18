
module.exports=(req,res,next)=>{
    if(!req.session.user){
        req.flash("Error","You must login first");
        return res.redirect('/auth/login');

    }
    next();

    
}