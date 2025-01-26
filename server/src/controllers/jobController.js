const Job = require('../models/jobModel.js') 
const EmailService =require('../services/emailService.js') 

class JobController {
  async createJob(req, res, next) {
    try {
      const { title, description, experienceLevel, candidates, endDate } = req.body;

   
      const job = new Job({
        company: req.company._id,
        title,
        description,
        experienceLevel,
        candidates,
        endDate: new Date(endDate)
      });

      await job.save();

    
      if (candidates && candidates.length > 0) {
        await EmailService.sendJobAlertEmail(job, candidates);
      }

      res.status(201).json({
        success: true,
        message: 'Job posted successfully',
        job
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllJobs(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const jobs = await Job.find()
        .populate('company', 'name')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

      const total = await Job.countDocuments();

      res.status(200).json({
        success: true,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalJobs: total
        },
        jobs
      });
    } catch (error) {
      next(error);
    }
  }

  async getCompanyJobs(req, res, next) {
    try {
      const jobs = await Job.find({ company: req.company._id })
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        jobs
      });
    } catch (error) {
      next(error);
    }
  }

  async updateJob(req, res, next) {
    try {
      const { jobId } = req.params;
      const { title, description, experienceLevel, candidates, endDate, status } = req.body;

      const job = await Job.findOneAndUpdate(
        { _id: jobId, company: req.company._id },
        {
          title,
          description,
          experienceLevel,
          candidates,
          endDate: new Date(endDate),
          status
        },
        { new: true, runValidators: true }
      );

      if (!job) {
        return res.status(404).json({
          success: false,
          message: 'Job not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Job updated successfully',
        job
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteJob(req, res, next) {
    try {
      const { jobId } = req.params;

      const job = await Job.findOneAndDelete({ 
        _id: jobId, 
        company: req.company._id 
      });

      if (!job) {
        return res.status(404).json({
          success: false,
          message: 'Job not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Job deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports= new JobController();