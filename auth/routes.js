const { Router } =require('express');
const { controller }=require("./controller");

const userRoutes=Router();

userRoutes.post('/register',controller.register)

module.exports=userRoutes