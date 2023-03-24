const express=require('express');
const { getserviceproviderinfobyid, updateprovider, getserviceproviderbyid, getAllProviderAppointments, changeappointmentstatus } = require('../Controllers/ServiceProvider');
const { ProtectedRoutValidate } = require('../Middleware/Validator');


const router= express.Router();

router.post('/get-serviceprovider-info-by-id',ProtectedRoutValidate,getserviceproviderinfobyid)
router.post('/update-serviceprovider',ProtectedRoutValidate,updateprovider)
router.post( "/get-serviceprovider-by-id",ProtectedRoutValidate,getserviceproviderbyid)
router.get("/get-all-appointments-by-providerid",ProtectedRoutValidate,getAllProviderAppointments)
router.post("/change-status",ProtectedRoutValidate,changeappointmentstatus)


module.exports=router;

