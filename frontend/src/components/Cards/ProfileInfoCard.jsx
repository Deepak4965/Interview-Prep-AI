import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext'
import { LuUser } from 'react-icons/lu';

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/');
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    user && (
      <div className="flex items-center">
        {user.profileImageUrl && !imageError ? (
          <img
            className="w-11 h-11 bg-gray-200 rounded-full mr-3"
            src={user.profileImageUrl}
            alt=""
            onError={handleImageError}
          />
        ) : (
          <div className="w-11 h-11 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
            <LuUser className="text-gray-600 text-xl" />
          </div>
        )}
        <div>
          <div className="text-black font-bold leading-3">
            {user.name || ""}
          </div>
          <button
            className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

    )
  )
};

export default ProfileInfoCard; 