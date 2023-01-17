const mongoose = require('mongoose')

const appointmentschema= new mongoose.Schema({

    userId:{
        type:String,
        required:true
    },

    providerId:{
        type:String,
        required:true
    },
    userinfo:{
        type:Object,
        required:true
    },
    providerinfo:{
        type:Object,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    selectedtime:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required: true,
        default:"pending",
    },

},
{timestamps:true}
)


module.exports = mongoose.model('appointmentmodel',appointmentschema )