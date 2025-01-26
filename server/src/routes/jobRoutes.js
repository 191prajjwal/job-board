const express = require("express");
const JobController = require("../controllers/jobController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/", authMiddleware, JobController.createJob);
router.get("/", JobController.getAllJobs);
router.get("/company", authMiddleware, JobController.getCompanyJobs);
router.put("/:jobId", authMiddleware, JobController.updateJob);
router.delete("/:jobId", authMiddleware, JobController.deleteJob);

module.exports= router;
