import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">Job Board</h1>
        <p className="text-gray-600 mb-6">
          Find and post jobs easily with our platform
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
            to="/login" 
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;