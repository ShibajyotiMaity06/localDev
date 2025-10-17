const mongoose = require('mongoose')

require('dotenv').config()

const connectDB = async ()=>{
    try {
        console.log('MONGO_URL value:', process.env.MONGO_URL);
        await mongoose.connect(process.env.MONGO_URL)
        console.log('connected db')
    } catch (error) {
        console.log('mongo error occured: ' , error)
        process.exit(1)
    }
}

module.exports = connectDB