import React, { useRef, useState } from 'react';
import { LuUser, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null)

    // Function to handle the file change event 
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Update the image state 
            setImage(file);

            // Generate preview URL from the file 
            const preview = URL.createObjectURL(file);
            if (setPreview) {
                setPreview(preview)
            }
            setPreviewUrl(preview)
        }

    };

    // Function to handle removing the image 
    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);

        if (setPreview) {
            setPreview(null)
        }


    };

    // Function to trigger the hidden file input 
    const onChooseFile = () => {
        inputRef.current.click();
    };

    return (
        <div className="flex justify-center mb-6">
            {/* Hidden file input element */}
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />
            {!image ? (
                <div className='w-20 h-20 flex items-center justify-center bg-blue-50 rounded-full relative cursor-pointer' onClick={onChooseFile}>
                    <LuUser className='text-4xl text-blue-500' />
                </div>
            ) : (
                <div className='relative w-20 h-20 rounded-full cursor-pointer'>
                    <img src={preview || previewUrl} alt="profile photo" className='w-20 h-20 rounded-full object-cover' />
                    <button type='button' className='absolute -bottom-1 -right-1 w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full cursor-pointer' onClick={handleRemoveImage}>
                        <LuTrash className='text-sm' />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePhotoSelector;
