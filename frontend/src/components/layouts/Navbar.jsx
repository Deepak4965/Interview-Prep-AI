import React from 'react';
import { Link } from "react-router-dom";
import ProfileInfoCard from "../../components/Cards/ProfileInfoCard";

const Navbar = () => {
  return (
    // Outer container for the Navbar 
    <div className="h-16 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-2.5 px-4 
       md:px-8 sticky top-0 z-30">
      {/* Inner container for content layout */}
      <div className="container mx-auto flex items-center justify-between gap-5 h-full">
        {/* Logo/App Name Link */}
        <Link to="/dashboard" className="flex items-center">
          <h2 className="text-lg font-medium text-black">
            Interview Prep AI
          </h2>
        </Link>

        {/* Profile Info Card component on the right */}
        <ProfileInfoCard />
      </div>
    </div>
  );
};

export default Navbar;