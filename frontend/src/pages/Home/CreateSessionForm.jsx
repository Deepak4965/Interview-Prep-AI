import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import SpinnerLoader from '../../components/Loader/SpinnerLoade';
import axios from 'axios';
import { MdKeyboardArrowDown } from "react-icons/md";

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: '',
    experience: '',
    topicsToFocus: '',
    description: '',
  });

  const defaults = {
    role: 'Software Engineer',
    experience: '1-3 years',
    topicsToFocus: 'JavaScript, React, Node.js',
    description: '',
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // ✅ Always fills missing fields with defaults before creating
  const handleCreateSession = async (e) => {
    if (e) e.preventDefault();
    setError(null);
    setIsLoading(true);

    // 🧠 Merge defaults with user input — any empty fields get default values
    const payload = {
      role: formData.role || defaults.role,
      experience: formData.experience || defaults.experience,
      topicsToFocus: formData.topicsToFocus || defaults.topicsToFocus,
      description: formData.description || defaults.description,
    };

    try {
      // --- Generate AI Questions ---
      const aiResponse = await axios.post("http://localhost:8001/api/ai/user/generate-question", {
        ...payload,
        numberOfQuestions: 10,
      }, {
        withCredentials: true,
      });

      const generatedQuestions = aiResponse.data;

      // --- Create Session ---
      const response = await axios.post("http://localhost:8001/api/sessions/user/create", {
        ...payload,
        questions: generatedQuestions,
      }, {
        withCredentials: true,
      });

      if (response.data?.id) {
        navigate(`/interview-prep/${response.data.id}`);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Session creation error:', error);
      const errorMessage =
        error.response?.data?.message || 'Something went wrong. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Quick Start Button (same behavior, skips input)
  const handleQuickStart = () => {
    handleCreateSession();
  };

  return (
    <div className="w-[90vw] md:w-[35vw] max-w-md mx-auto bg-gray-100 rounded-lg shadow-md p-6 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black mb-2">
        Start a New Interview Journey
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Fill out a few quick details and unlock your personalized set of interview questions!
      </p>

      {/* Quick Start Button */}
      <button
        type="button"
        onClick={handleQuickStart}
        className="w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 mb-4 disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? 'Creating Session...' : 'Quick Start with Defaults (Software Engineer)'}
      </button>

      {/* Manual Form */}
      <form onSubmit={handleCreateSession} className="flex flex-col space-y-4">
        {/* Target Role */}
        <Input
          value={formData.role}
          onChange={(e) => handleChange('role', e.target.value)}
          label="Target Role"
          placeholder="(e.g. Frontend Developer, UI/UX Designer, etc.)"
          type="text"
        />

        {/* Years of Experience */}
        <div className="mb-4">
          <label className="text-[13px] text-slate-800 mb-1 block">
            Years of Experience
          </label>
          <div className="relative">
            <select
              value={formData.experience}
              onChange={(e) => handleChange('experience', e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 pr-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
            >
              <option value="">Select experience</option>
              <option value="0-1 year">0-1 year</option>
              <option value="1-3 years">1-3 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="5+ years">5+ years</option>
            </select>
            <MdKeyboardArrowDown
              className="text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
              size={20}
            />
          </div>
        </div>

        {/* Topics */}
        <Input
          value={formData.topicsToFocus}
          onChange={(e) => handleChange('topicsToFocus', e.target.value)}
          label="Topics to Focus On"
          placeholder="Comma-separated, e.g. React, Node.js, MongoDB"
          type="text"
        />

        {/* Description */}
        <div className="mb-4">
          <label className="text-[13px] text-slate-800 mb-1 block">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="(Any specific goals or notes for this session)"
            className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            rows={4}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm p-2 bg-red-50 rounded border border-red-200">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-900 disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <SpinnerLoader /> Creating Session...
            </>
          ) : (
            'Create Session'
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;

