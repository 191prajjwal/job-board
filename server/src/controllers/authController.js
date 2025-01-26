const bcrypt =require('bcryptjs')
const crypto =require('crypto')
const Company =require('../models/companyModel.js')
const generateToken =require('../utils/generateToken.js')
const EmailService =require('../services/emailService.js')

class AuthController {
  async register(req, res, next) {
    try {
      const { name, email, mobile, password } = req.body;


      const existingCompany = await Company.findOne({ 
        $or: [{ email }, { mobile }] 
      });

      if (existingCompany) {
        return res.status(400).json({
          success: false,
          message: 'Company with this email or mobile already exists'
        });
      }

    
      const verificationToken = crypto.randomBytes(32).toString('hex');
      const verificationTokenExpires = Date.now() + 3600000;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

     
      const company = new Company({
        name,
        email,
        mobile,
        password: hashedPassword,
        verificationToken,
        verificationTokenExpires
      });

      await company.save();

      
      await EmailService.sendVerificationEmail(email, verificationToken);

      res.status(201).json({
        success: true,
        message: 'Company registered. Please check your email to verify.'
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      
      const company = await Company.findOne({ email });
      if (!company) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

     
      const isMatch = await bcrypt.compare(password, company.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

     
      if (!company.isVerified) {
        return res.status(403).json({
          success: false,
          message: 'Please verify your account'
        });
      }

      
      const token = generateToken({ id: company._id });

      res.status(200).json({
        success: true,
        token,
        company: {
          id: company._id,
          name: company.name,
          email: company.email
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyAccount(req, res, next) {
    try {
      const { token } = req.params;

      const company = await Company.findOne({
        verificationToken: token,
        verificationTokenExpires: { $gt: Date.now() }
      });

      if (!company) {
        return res.status(400).json({
          success: false,
          message: 'Invalid or expired verification token'
        });
      }

      
      company.isVerified = true;
      company.verificationToken = undefined;
      company.verificationTokenExpires = undefined;

      await company.save();

      res.status(200).json({
        success: true,
        message: 'Account verified successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports= new AuthController();