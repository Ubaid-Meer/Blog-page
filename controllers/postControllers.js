const Post=require('../models/Post')

//show all post

exports.getallPosts=async(req,res)=>{
    try{
        const posts=await Post.find().sort({createdAt:-1}) 
        res.render('home',{posts, messages: req.flash() } )
    } catch (error) {
        console.error(error)
        res.redirect('/')
    }
};

// show form to create new post

exports.getCreatePost=async(req,res)=>{
    res.render('create',{ messages: req.flash() })
}

exports.createPost=async(req,res)=>{

    try {
        const {title,content}=req.body;
        await Post.create({
            title,
            content,
            author:req.session.user.userName,

        });
        req.send("Post Created Successfully")
        res.redirect("/")
    } catch (error) {
        console.error(error)
        res.redirect('/posts/create')
    }
}

//show single post
exports.getSinglePost=async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        res.render('post',{pos, messages: req.flash() })
        
    } catch(error){
                console.error(error)
        res.redirect('/')
    }

}

exports.getEditPost=async(req,res)=>{
    try {
        const post= await Post.findById(req.params.id);
        res.render('edit',{post, message:req.flash() })
    } catch (error) {
                console.error(error)
        res.redirect('/')
    }
};


exports.updatePost=async(req,res)=>{
    try {
        const {title,content}=req.body;
        await Post.findByIdAndUpdate(req.params.id,{title,content});

        req.redirect(`/posts/${req.params.id}`)
    } catch (error) {
                console.error(error)
        res.redirect(`/posts/edit/${req.params.id}`)
    }
};

exports.deletePost=async(req,res)=>{
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect('/')
    } catch (error) {
                console.error(error)
        res.redirect('/')
    }
}