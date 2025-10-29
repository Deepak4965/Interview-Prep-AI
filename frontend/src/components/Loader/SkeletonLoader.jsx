import React from 'react'; 
 
const SkeletonLoader = () => { 
  return ( 
    // First Block (likely for the role title/header) 
    <>
        <div role="status" className="animate-pulse space-y-4 max-w-3xl"> 
      <div className="h-6 bg-gray-200 rounded-md dark:bg-gray-700 w-full"></div> 
    </div> 
     
    // Second Block (likely for the first set of questions) 
    <div className="space-y-2"> 
      <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-full"></div> 
      <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-11/12"></div> 
      <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-10/12"></div> 
      <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-9/12"></div> 
    </div> 
 
    // ... repeated blocks for other sections like the question summary ... 
     
    // Middle section with different sizing (e.g., for summary/details) 
    <div className="bg-gray-100 dark:bg-gray-800 rounded p-4 space-y-2"> 
      <div className="h-2.5 bg-gray-300 rounded w-3/4"></div> 
      <div className="h-2.5 bg-gray-300 rounded w-2/3"></div> 
      <div className="h-2.5 bg-gray-300 rounded w-1/2"></div> 
    </div> 
 
    // Third Block (likely for the next set of questions) 
    <div role="status" className="animate-pulse space-y-4 max-w-3xl mt-10"> 
      <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-1/2 mt-8"></div> 
    </div> 
 
    <div className="space-y-2"> 
      <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-full"></div> 
      <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-11/12"></div> 
      <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-10/12"></div> 
      <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-9/12"></div> 
    </div> 
    </>

  ) 
} 
 
export default SkeletonLoader;