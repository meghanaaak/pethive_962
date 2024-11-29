// user.controller.js
import express from 'express'
// import User from '../model/usermodel.js'
import  {signup,login,logout}  from '../controllers/userController.js';

const router = express.Router()

router.post('/adduser/signup', signup);
router.post("/login", login);

router.post("/logout", logout);
router.get("/login",(req,res) => {
    res.send("login route")
})

export default router;




