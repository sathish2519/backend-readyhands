const User = require('../Models/user');
const serviceprovider = require('../Models/serviceModel')



exports.getAllServiceProviders = async (req, res) => {
    try {
        const serviceProviders = await serviceprovider.find({})
        return res.status(200).send({ message: "Service Providers Fetched Successfully", success: true, data: serviceProviders })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something Went Wrong", success: false })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        return res.status(200).send({ message: "Users Fetched Successfully", success: true, data: users })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something Went Wrong", success: false })
    }
}

exports.changestatus = async (req, res) => {
    try {
        const { serviceId, status } = req.body
        const Providers = await serviceprovider.findByIdAndUpdate(serviceId, { status, });
        const users = await User.findOne({ _id: Providers.userId })
        const UnseenNotification = users.UnseenNotification;
        UnseenNotification.push({
            type: "status-changed",
            message: `Your service provider account has been ${status}`,
            onClickPath: "/notifications",
        });
        users.isServiceProvider = status === "approved" ? true : false;
        await users.save();
        res.status(200).send({ message: "Service Provider Status Updated Successfully", success: true, data: Providers })


    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something Went Wrong", success: false })
    }
}