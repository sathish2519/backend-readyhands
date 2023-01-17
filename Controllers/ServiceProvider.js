const serviceprovider = require('../Models/serviceModel')



exports.getserviceproviderinfobyid = async (req, res) => {
    try {
        const serviceProviders = await serviceprovider.findOne({userId:req.body.userId});
        return res.status(200).send({ message: "Service Provider info Fetched Successfully", success: true, data: serviceProviders })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something Went Wrong,Error Getting Info", success: false })
    }
}



exports.updateprovider = async (req, res) => {
    try {
        const serviceProviders = await serviceprovider.findOneAndUpdate({userId:req.body.userId},req.body);
        return res.status(200).send({ message: "Service Provider Profile Updated Successfully", success: true, data: serviceProviders })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something Went Wrong", success: false ,error})
    }
}


//getting provider for booking
exports.getserviceproviderbyid = async (req, res) => {
    try {
        const serviceProviders = await serviceprovider.findOne({_id:req.body.providerId});
        return res.status(200).send({ message: "Service Provider info Fetched Successfully", success: true, data: serviceProviders })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something Went Wrong,Error Getting Info", success: false })
    }
}