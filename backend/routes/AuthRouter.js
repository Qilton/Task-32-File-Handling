const { signup, login } = require('../controllers/AuthController')
const { signUpValidation, loginValidation } = require('../middleware/AuthValidation')
const {save}=require('../controllers/UserController')

const router=require('express').Router()


router.post('/save',signUpValidation,signup,save)
router.post('/login',loginValidation,login)

                             
module.exports= router;