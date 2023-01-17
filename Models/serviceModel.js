const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        phonenumber: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        specialization: {
            type: String,
            required: true,
        },
        experience: {
            type: String,
            required: true,
        },
        fee: {
            type: Number,
            required: true,
        },
        timings: {
            type: Array,
            required: true,
        },
        // endtimings: {
        //     type: Array,
        //     required: true,
        // },
        status: {
            type: String,
            default: "pending"
        },
    })


//exporting module
module.exports = mongoose.model('serviceprovider', serviceSchema)
