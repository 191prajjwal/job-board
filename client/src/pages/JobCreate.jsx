import React, { useState } from 'react';
import Input from '../components/common/Input';
import jobService from '../services/jobService';
import { useNavigate } from 'react-router-dom';

const JobCreate = () => {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    experienceLevel: 'BEGINNER',
    candidates: [],
    endDate: ''
  });
  const [candidateEmail, setCandidateEmail] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addCandidate = () => {
    if (candidateEmail && !jobData.candidates.includes(candidateEmail)) {
      setJobData(prev => ({
        ...prev,
        candidates: [...prev.candidates, candidateEmail]
      }));
      setCandidateEmail('');
    }
  };

  const removeCandidate = (email) => {
    setJobData(prev => ({
      ...prev,
      candidates: prev.candidates.filter(c => c !== email)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!jobData.title) newErrors.title = 'Job title is required';
    if (!jobData.description) newErrors.description = 'Job description is required';
    if (!jobData.endDate) newErrors.endDate = 'End date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await jobService.createJob(jobData);
        navigate('/jobs');
      } catch (error) {
        setErrors({
          submit: error.response?.data?.message || 'Job creation failed'
        });
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Job Posting</h2>
      <form onSubmit={handleSubmit}>
        <Input
          name="title"
          label="Job Title"
          value={jobData.title}
          onChange={handleChange}
          error={errors.title}
        />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Description
          </label>
          <textarea
            name="description"
            value={jobData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            rows="4"
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience Level
          </label>
          <select
            name="experienceLevel"
            value={jobData.experienceLevel}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="EXPERT">Expert</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Candidate Emails
          </label>
          <div className="flex">
            <input
              type="email"
              value={candidateEmail}
              onChange={(e) => setCandidateEmail(e.target.value)}
              className="flex-grow px-3 py-2 border rounded-md mr-2"
              placeholder="Add candidate email"
            />
            <button
              type="button"
              onClick={addCandidate}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add
            </button>
          </div>
          <div className="mt-2">
            {jobData.candidates.map(email => (
              <span 
                key={email} 
                className="inline-flex items-center bg-gray-200 px-2 py-1 rounded-full mr-2 mb-2"
              >
                {email}
                <button
                  type="button"
                  onClick={() => removeCandidate(email)}
                  className="ml-2 text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
        <Input
          type="date"
          name="endDate"
          label="End Date"
          value={jobData.endDate}
          onChange={handleChange}
          error={errors.endDate}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Create Job
        </button>
      </form>
    </div>
  );
};

export default JobCreate;