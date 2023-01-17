const express=require('express');
const { getserviceproviderinfobyid, updateprovider, getserviceproviderbyid } = require('../Controllers/ServiceProvider');
const { ProtectedRoutValidate } = require('../Middleware/Validator');


const router= express.Router();

router.post('/get-serviceprovider-info-by-id',ProtectedRoutValidate,getserviceproviderinfobyid)
router.post('/update-serviceprovider',ProtectedRoutValidate,updateprovider)
router.post( "/get-serviceprovider-by-id",ProtectedRoutValidate,getserviceproviderbyid)


module.exports=router;

