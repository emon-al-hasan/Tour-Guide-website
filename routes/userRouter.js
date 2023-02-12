const express=require('express')
const uersController=require('./../controllers/usercontroller')
const router=express.Router();




router
.route('/')
.get(uersController.getAllUsers)
.post(uersController.createUser)

router.route('/:id')
.get(uersController.getUser)
.patch(uersController.updateUser)
.delete(uersController.deleteUser)

module.exports=router