import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignUp from './SignUp';

const SignUpPage = () => {
    
  const navigate = useNavigate();

  const handleClose = () => {

  };

  const setCurrentPage = (page) => {
    if (page === 'login') {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#daf5f8] p-4">
      <div className="relative w-[90vw] md:w-[33vw] bg-white rounded-lg shadow-lg">
        {/* Cross Icon Header */}
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-blue-100 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5 cursor-pointer z-10"
          onClick={handleClose}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>

        {/* SignUp Form */}
        <SignUp setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default SignUpPage;
