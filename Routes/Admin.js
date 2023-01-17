const express= require('express');
const { getAllServiceProviders, getAllUsers, changestatus } = require('../Controllers/Admin');
const { ProtectedRoutValidate } = require('../Middleware/Validator');
const router=express.Router()

router.get('/get-all-serviceproviders',ProtectedRoutValidate,getAllServiceProviders)
router.get('/get-all-users',ProtectedRoutValidate,getAllUsers)
router.post('/change-status',ProtectedRoutValidate,changestatus)



module.exports=router;