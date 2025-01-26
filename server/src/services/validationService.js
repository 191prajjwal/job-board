const Joi =require('joi')

class ValidationService {
  validateRegistration(data) {
    const schema = Joi.object({
      name: Joi.string().trim().required().min(2).max(50),
      email: Joi.string().email().required(),
      mobile: Joi.string().pattern(/^[0-9]{10}$/).required(),
      password: Joi.string().min(6).required()
    });

    return schema.validate(data);
  }


  validateJobPosting(data) {
    const schema = Joi.object({
      title: Joi.string().trim().required().min(3).max(100),
      description: Joi.string().trim().required().min(10),
      experienceLevel: Joi.string().valid('BEGINNER', 'INTERMEDIATE', 'EXPERT').required(),
      candidates: Joi.array().items(Joi.string().email()).optional(),
      endDate: Joi.date().iso().min('now').required()
    });

    return schema.validate(data);
  }


  validateLogin(data) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    });

    return schema.validate(data);
  }
}

module.exports= new ValidationService();