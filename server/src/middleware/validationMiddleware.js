const ValidationService =require('../services/validationService.js') 

const validationMiddleware = {
  validateRegistration: (req, res, next) => {
    const { error } = ValidationService.validateRegistration(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        error: error.details[0].message
      });
    }
    
    next();
  },

  validateJobPosting: (req, res, next) => {
    const { error } = ValidationService.validateJobPosting(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        error: error.details[0].message
      });
    }
    
    next();
  },

  validateLogin: (req, res, next) => {
    const { error } = ValidationService.validateLogin(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        error: error.details[0].message
      });
    }
    
    next();
  }
};

module.exports= validationMiddleware;