const express=require('express')
const userRouter=require('./Routes/User');
const AdminRouter=require('./Routes/Admin');
const ServiceProviderRoute=require("./Routes/ServiceProvider")
const cors=require('cors')
const jwt=require('jsonwebtoken')

const app=express();
require('dotenv').config()
const dbconfig = require("./Db/Index");
app.use(express.json());
app.use(cors())
app.use('/api/user',userRouter)
app.use('/api/admin',AdminRouter)
app.use('/api/serviceprovider',ServiceProviderRoute)
app.listen(8000,()=>{
    console.log('The port is listening at 8000')
})