const express= require('express');
const { Create, verifyEmail,resendEmailverification,Login, ProtectedRoute, ServiceProvider, MarkAllAsSeen, deleteall, getAllaprovedServiceProviders, bookappointment, checkavailability } = require('../Controllers/User');
const { userValidator, validate, ProtectedRoutValidate } = require('../Middleware/Validator');

const router=express.Router()
router.post('/register',userValidator,validate,Create);
router.post('/login',Login)
router.post('/get-user-info-by-id',ProtectedRoutValidate,ProtectedRoute)
router.post('/apply-service-provider',ProtectedRoutValidate,ServiceProvider)
router.post('/mark-all-as-seen',ProtectedRoutValidate,MarkAllAsSeen)
router.post('/delete-all',ProtectedRoutValidate,deleteall)
router.get('/get-all-approved-providers',ProtectedRoutValidate,getAllaprovedServiceProviders)
router.post('/bookappointment',ProtectedRoutValidate,bookappointment)
router.post('/check-booking-availability',ProtectedRoutValidate,checkavailability)
module.exports=router;