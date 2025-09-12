const express=require('express')
const app=express()
const PORT=9000;
const  path=require('path');
const session=require('express-session')
// import module
const connectDB=require('./configuration/db');
const authRoute=require('./routes/userRoutes')




//Database Connection
connectDB();

//middleWare

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("publics"))
//ejs setup
app.set('view engine',"ejs")
app.set('views',path.join(__dirname,"views"));
//Session Setup
app.use(session({
    secret:'blog-app-secret',
    resave:'false',
    saveUninitialized:false
}));

app.use((req,res,next)=>{
    res.locals.session=req.session;
    next();

})
//Routes

app.get('/',(req,res)=>{
    return res.render('home')
});

app.use('/auth',authRoute)

app.listen(PORT,()=>console.log(`Server is Started on http://localhost:${PORT}`))