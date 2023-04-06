const serviceprovider = require('../Models/serviceModel')
const appointmentmodel = require('../Models/appointmentModel');
const User = require('../Models/user');

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

exports.getAllProviderAppointments = async (req, res) => {

    try {
        const myprovider=await serviceprovider.findOne({userId:req.body.userId})
        const appointments=await appointmentmodel.find({providerId:myprovider._id});
        return res.status(200).send({ message: "Appointments Fetched Successfully", success: true, data: appointments })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something Went Wrong", success: false })
    }
}

exports.changeappointmentstatus = async (req, res) => {
    try {
        const { appointmentId, status } = req.body
        const Appointment = await appointmentmodel.findByIdAndUpdate(appointmentId, { status, });
        const users = await User.findOne({ _id: Appointment.userId })
        const UnseenNotification = users.UnseenNotification;
        UnseenNotification.push({
            type: "appointment-status-changed",
            message: `Your appointment has been ${status}`,
            onClickPath: "/appointments",
        });
        // users.isServiceProvider = status === "approved" ? true : false;
        await users.save();
        res.status(200).send({ message: "Appointment status changed successfully", success: true})


    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Changing Appointment Status Failed", success: false })
    }
}