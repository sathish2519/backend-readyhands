const User = require('../Models/user');
const serviceprovider = require('../Models/serviceModel')
const appointmentmodel = require('../Models/appointmentModel');
const Jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const moment = require('moment/moment');


exports.Create = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const oldUser = await User.findOne({ email })
        if (oldUser) {
            res.status(200).send({ message: "User already exist", success: false })
            return;
        }
        const newUser = new User({ name, email, password })
        await newUser.save()

        res.status(200).send({ message: "   User Created Successfully", success: true })
        return;

    } catch (error) {
        res.status(401).send({ message: "Error Creating User", success: false })
        return;

    }

}

//login 
exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(201).send({ message: "User does not Exist", success: false })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(201).send({ message: "Invalid Password", success: false })
        } else {
            const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
            res.status(200).send({ message: "Login Successfull", success: true, data: token })
        }

    } catch (error) {
        console.log(error)
        return res.status(404).send({ message: "Login failed", success: false })
    }

}


//protected rouete by the jwt token generated

exports.ProtectedRoute = async (req, res) => {
    try {
        // const _id=req.body.userId
        const user = await User.findOne({ _id: req.body.userId })
        user.password = undefined
        if (!user) {
            res.status(404).send({ message: "User Not Found", success: true })
        } else {
            res.status(200).send({

                success: true,
                data: user
            })
        }
    } catch (error) {
        console.log(error)
        res.status(404).send({ message: "ERROR OCCURED", success: false })
    }

}


//service-provider first request    -- first from user--

exports.ServiceProvider = async (req, res) => {
    try {
        const newserviceprovider = new serviceprovider({ ...req.body, status: "pending" })
        // const {firstname,lastName}=req.body
        await newserviceprovider.save()
        const adminuser = await User.findOne({ isAdmin: true })
        const UnseenNotification = adminuser.UnseenNotification
        UnseenNotification.push(
            {
                type: "New-ServiceProvider-Request",
                message: `${newserviceprovider.firstname} ${newserviceprovider.lastname} has applied for a service provider account`,
                data: {
                    ServiceproviderId: newserviceprovider._id,
                    name: newserviceprovider.firstname + " " + newserviceprovider.lastname,
                },
                onClickPath: "/admin/service-providers",
            }

        )
        await User.findByIdAndUpdate(adminuser._id, { UnseenNotification })
        res.status(200).send({ message: "Service Provider Account Applied Successfully", success: true })

    } catch (error) {
        console.log(error)
        res.status(404).send({ message: "Approval for Service Provider Failed", success: false, error })
        // return;
    }
}



//Mark all as seen logic

exports.MarkAllAsSeen = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId })
        const UnseenNotification = user.UnseenNotification;
        const SeenNotification = user.SeenNotification;
        SeenNotification.push(...UnseenNotification)
        user.UnseenNotification = []
        user.SeenNotification = SeenNotification
        const updatedUser = await user.save()
        updatedUser.password = undefined
        res.status(200).send({ message: "All Notifications Marked as Seen", success: true, data: updatedUser })


    } catch (error) {

    }
}

exports.deleteall = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        user.SeenNotification = [];
        user.UnseenNotification = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: "All notifications cleared",
            data: updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error applying doctor account",
            success: false,
            error,
        });
    }
}


//api call for fetchong all approved doctors
exports.getAllaprovedServiceProviders = async (req, res) => {
    try {
        const serviceProviders=await serviceprovider.find({status: 'approved'});
        return res.status(200).send({ message: "Service Providers Fetched Successfully", success: true, data: serviceProviders })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something Went Wrong", success: false })
    }
}

//api call for booking appointment

exports.bookappointment = async (req, res) => {
    try {
        req.body.status = "pending"
        req.body.date=moment(req.body.date,'DD-MM-YYYY').toISOString();
        req.body.selectedtime=moment(req.body.selectedtime,'HH:mm').toISOString();
        const newappointment = new appointmentmodel(req.body)
        await newappointment.save()
        res.status(200).send({ message: "Your appointment is booked", success: true, data: newappointment })
        const user = await User.findOne({ _id: req.body.providerinfo.userId })
        user.UnseenNotification.push(
            {
                type: "New appointment request",
                message: ` A new appointment request from ${req.body.userinfo.name}`,
                onClickPath: "/serviceprovider/appointments"
            }
        )
        await user.save();

    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something Went Wrong from Db", success: false })
    }
}

exports.checkavailability = async (req, res) => {
    try {
        const date=moment(req.body.date,'DD-MM-YYYY').toISOString();
        const fromTime=moment(req.body.selectedtime,'HH:mm').subtract(1,'hours').toISOString()
        const toTime=moment(req.body.selectedtime,'HH:mm').add(1,'hours').toISOString()
        const provider=req.body.providerId;
        const appointment=await  appointmentmodel.find({
            provider,
            date,
            selectedtime:{ $gte:fromTime, $lte:toTime}

        });
        if (appointment.length>0){
            return res.status(200).send({message: 'Appointments not available',success:false,
        });
    }else{
        return res.status(200).send({message: 'Appointments available',success:true
        });
    }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something Went Wrong from Db", success: false })
    }
}


exports.getAllAppointments = async (req, res) => {
    try {
        const appointments=await appointmentmodel.find({userId:req.body.userId});
        return res.status(200).send({ message: "Appointments Fetched Successfully", success: true, data: appointments })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something Went Wrong", success: false })
    }
}