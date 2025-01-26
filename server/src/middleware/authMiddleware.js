const jwt =require("jsonwebtoken")
const Company =require ("../models/companyModel.js")

const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.company = await Company.findById(decoded.id).select("-password");

      if (!req.company) {
        return res.status(401).json({
          success: false,
          message: "Not authorized, company not found",
        });
      }

      if (!req.company.isVerified) {
        return res.status(403).json({
          success: false,
          message: "Account not verified",
        });
      }

      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Not authorized, invalid token",
      });
    }
  }

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }
};

module.exports= authMiddleware;
