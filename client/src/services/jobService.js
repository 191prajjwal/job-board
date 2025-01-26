import api from '../utils/api';

const jobService = {
  createJob: async (jobData) => {
    const response = await api.post('/jobs', jobData);
    return response.data;
  },

  getAllJobs: async (page = 1, limit = 10) => {
    const response = await api.get('/jobs', {
      params: { page, limit }
    });
    return response.data;
  },

  getCompanyJobs: async () => {
    const response = await api.get('/jobs/company');
    return response.data;
  },

  updateJob: async (jobId, jobData) => {
    const response = await api.put(`/jobs/${jobId}`, jobData);
    return response.data;
  },

  deleteJob: async (jobId) => {
    const response = await api.delete(`/jobs/${jobId}`);
    return response.data;
  }
};

export default jobService;