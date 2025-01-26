const express =require('express')
const AuthController=require('../controllers/authController.js')

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/verify/:token', AuthController.verifyAccount);

module.exports= router;