const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name : {type : String , required: true},
    email : {type : String , required : true , unique:true},
    password : {type : String , required:true},
    role : {type : String , enum : ['user' , 'provider' , 'admin'], default:'user'},
    createdAt: {type:Date , default: Date.now}
})

userSchema.pre('save' , async function (next) {
    if (!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)// random string used to make hash unique
    this.password = await bcrypt.hash(this.password , salt) // this creates a hased version of the password with a salt
    next()
})

userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password)
}

module.exports = mongoose.model('User',userSchema)