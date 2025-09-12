const mongoose=require('mongoose')


async function connectDB(){
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/blog')
        console.log("Database Has Been Connected")
    } catch (error) {
        console.log(error)
        console.log("Failed Database Connection")
    }
}

module.exports=connectDB