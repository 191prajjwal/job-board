import React, { useState, useEffect } from 'react';
import jobService from '../services/jobService';
import { Link } from 'react-router-dom';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1
  });

  useEffect(() => {
    fetchJobs();
  }, [pagination.currentPage]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobService.getAllJobs(pagination.currentPage);
      setJobs(response.jobs);
      setPagination({
        currentPage: response.pagination.currentPage,
        totalPages: response.pagination.totalPages
      });
    } catch (err) {
      setError('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
  };

  if (loading) return <div>Loading jobs...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Job Listings</h1>
        <Link 
          to="/jobs/create" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Job
        </Link>
      </div>

      <div className="grid gap-4">
        {jobs.map(job => (
          <div 
            key={job._id} 
            className="border rounded-lg p-4 hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600 mb-2">{job.description.slice(0, 150)}...</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Experience: {job.experienceLevel}
              </span>
              <span className="text-sm text-gray-500">
                Ends: {new Date(job.endDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`mx-2 px-4 py-2 rounded ${
              page === pagination.currentPage 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default JobList;