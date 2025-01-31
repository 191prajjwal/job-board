const express = require("express");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db.js");
const errorHandler = require("./middleware/errorMiddleware.js");
const authRoutes = require("./routes/authRoutes.js");
const jobRoutes = require("./routes/jobRoutes.js");
const loggerMiddleware = require('./middleware/loggerMiddleware.js');


connectDB();


const app = express();


app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


if (process.env.NODE_ENV === 'development') {
  app.use(loggerMiddleware.requestLogger);
}


app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Job Board Backend is running smoothly",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);


app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

module.exports = app;
