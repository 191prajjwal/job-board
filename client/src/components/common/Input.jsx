import React from 'react';

const Input = ({ 
  type = 'text', 
  name, 
  label, 
  value, 
  onChange, 
  error, 
  ...props 
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label 
          htmlFor={name} 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`
          w-full 
          px-3 
          py-2 
          border 
          ${error ? 'border-red-500' : 'border-gray-300'}
          rounded-md 
          shadow-sm 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500
        `}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;