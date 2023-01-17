const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isServiceProvider:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    SeenNotification:{
        type: Array,
        default: [],

    },
    UnseenNotification:{
        type: Array,
        default: [],
    },
}, {
    timestamps: true,
})

//Password Hashing using bcrypt

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10)
    }
    next();
})

//exporting from the files to use
module.exports = mongoose.model('User', userSchema) //user model
