import React, { useState } from "react";
// Import icons for the UI elements
import { LuChevronDown, LuChevronUp, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
// Import the component that renders the answer (defined below)

const QuestionCard = ({
  question,
  answer,
  isPinned,
  onTogglePin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle expansion
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  // Combined handler for the "Learn More" button - now no-op for onLearnMore
  const handleLearnMore = (e) => {
    e.stopPropagation(); // Prevent question collapse when clicking the button
  };

  return (
    <div className="bg-white rounded-lg mb-4 overflow-hidden py-4 px-5 shadow-xl
      shadow-gray-100/70 border border-gray-100/60 group">
      {/* Question Header Area */}
      <div className="flex items-start justify-between cursor-pointer" onClick={toggleExpansion}>
        <div className="flex items-start text-start gap-3.5 flex-1">
          {/* Question "Q" prefix and Pin status spark icon */}
          <span className="text-xs md:text-[15px] font-semibold text-gray-400 leading-[18px]">
            Q
            {isPinned && <LuSparkles className="text-indigo-500 w-3 h-3 inline ml-0.5 -mt-1" />}
          </span>
          {/* Question Text */}
          <h3 className="text-xs md:text-[14px] font-medium text-gray-800 md:pr-0 md:mr-20">
            {question}
          </h3>
        </div>
        {/* Action Buttons and Chevron Icon */}
        <div className="flex items-center justify-end ml-4 relative">
          {/* Buttons Group (Pin and Learn More) - always visible */}
          <div className="flex items-center gap-2">
            {/* Pin/Unpin Button */}
            <button
              className="flex items-center gap-2 text-xs text-indigo-800 font-medium bg-indigo-50
                px-3 py-1 mr-2 rounded-nowrap border border-indigo-50 hover:border-indigo-200 cursor-pointer
                transition-colors duration-200"
              onClick={(e) => { e.stopPropagation(); onTogglePin(); }}
            >
              {isPinned ? (
                <>
                  <LuPinOff className="text-xs" />
                  <span>Unpin</span>
                </>
              ) : (
                <>
                  <LuPin className="text-xs" />
                  <span>Pin</span>
                </>
              )}
            </button>
            {/* Learn More Button - disabled functionality */}
            <button
              className="flex items-center gap-2 text-xs text-cyan-800 font-medium bg-cyan-50
                px-3 py-1 mr-2 rounded-nowrap border border-cyan-50 hover:border-cyan-200 cursor-pointer
                transition-colors duration-200 opacity-50 pointer-events-none"
              onClick={handleLearnMore}
            >
              <LuSparkles />
              <span className="hidden md:block">Learn More</span>
            </button>
          </div>
          {/* Chevron Icon - now functional */}
          <button className="text-gray-400" onClick={(e) => { e.stopPropagation(); toggleExpansion(); }}>
            {isExpanded ? <LuChevronUp size={20} /> : <LuChevronDown size={20} />}
          </button>
        </div>
      </div>
      {/* Answer Section */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-start gap-3.5">
            <span className="text-xs md:text-[15px] font-semibold text-gray-400 leading-[18px]">
              A
            </span>
            <p className="text-xs md:text-[14px] text-gray-700">
              {answer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
