import React from 'react';
import { LuTrash2 } from 'react-icons/lu'; // Use LuTrash2 as shown in the image 

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    // Outer Card Container - 'group' enables group-hover for children 
    <div
      className="bg-white border border-gray-300/40 rounded-xl p-4 overflow-hidden 
cursor-pointer hover:shadow-xl shadow-gray-100 relative group"
      onClick={onSelect}
    >
      {/* Background Color Element */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{ background: colors.bgColor }}
      ></div>

      {/* Card Content Wrapper */}
      <div className="flex flex-col h-full relative z-10">

        {/* Top Section: Icon/Initials, Role, and Delete Button */}
        <div className="flex items-start mb-3">
          {/* Initials Placeholder */}
          <div className="flex-shrink-0 w-12 h-12 bg-white rounded-md flex items-center 
justify-center mr-4">
            <span className="text-lg font-semibold text-black">GU</span>
          </div>

          {/* Title, Skills, and Delete Button Container */}
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-[17px] font-medium">{role}</h2>
                <p className="text-xs text-medium text-gray-900">{topicsToFocus}</p>
              </div>

              {/* --- Delete Button (Hidden by default, shown on hover) --- */}
              <button
                className="hidden group-hover:flex items-center gap-2 text-xs text-red-500"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents card's onSelect from firing 
                  onDelete();
                }}
              >
                <LuTrash2 className="text-lg" />
              </button>
            </div>
          </div>
        </div>

        {/* Info Tags Section */}
        <div className="px-3 pb-3 flex items-center flex-wrap gap-3 mt-4">
          <div className="text-[10px] font-medium text-black px-3 py-1 border-[0.5px] 
border-gray-900 rounded-full whitespace-nowrap">
            Experience: {experience} {experience == 1 ? "Year" : "Years"}
          </div>

          <div className="text-[10px] font-medium text-black px-3 py-1 border-[0.5px] 
border-gray-900 rounded-full whitespace-nowrap">
            {questions} Q&A
          </div>

          <div className="text-[10px] font-medium text-black px-3 py-1 border-[0.5px] 
border-gray-900 rounded-full whitespace-nowrap">
            Last Updated: {lastUpdated}
          </div>
        </div>

        {/* Description */}
        <div className="px-3">
          <p className="text-[12px] text-gray-500 font-medium line-clamp-2 mt-3">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;