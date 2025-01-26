const morgan =require('morgan')
const fs =require('fs') 
const  path =require ('path')

const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const accessLogStream = fs.createWriteStream(
  path.join(logDir, 'access.log'), 
  { flags: 'a' }
);

const loggerMiddleware = {
  requestLogger: morgan('combined', { stream: accessLogStream }),

  errorLogger: (err, req, res, next) => {
    const errorLog = `
      [${new Date().toISOString()}]
      Error: ${err.message}
      Stack: ${err.stack}
      Path: ${req.path}
      Method: ${req.method}
      ----------------------------
    `;

    fs.appendFile(
      path.join(logDir, 'error.log'), 
      errorLog, 
      (writeErr) => {
        if (writeErr) console.error('Logging error:', writeErr);
      }
    );
    next(err);
  }
};

module.exports= loggerMiddleware;