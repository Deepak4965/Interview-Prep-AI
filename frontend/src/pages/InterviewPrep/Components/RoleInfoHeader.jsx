import React from 'react';
const RoleInfoHeader = ({
role,
topicsToFocus,
experience,
questions,
description, // not used in the final JSX structure shown, but kept as it's in the function
signature,
lastUpdated

}) => {
return (
<div className="bg-white relative">
<div className="container mx-auto px-10 md:px-0">
<div className="flex flex-col justify-center relative z-10">
<div className="flex-grow">
<div className="flex justify-between between-items-start">
<div className="flex-grow">
<h2 className="text-2xl font-medium">{role}</h2>
<p className="text-sm text-medium text-gray-900 mt-1">
{topicsToFocus}
</p>
</div>
{/* This section for profile pic/logout is on the page but not defined in the
RoleInfoHeader component in the screenshots.
It's likely in a parent component or part of a main app layout. */}
</div>
</div>
<div className="flex items-center gap-3 mt-4">
{/* Experience Badge */}
<div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
Experience - {experience} {experience === 1 ? 'Year' : 'Years'}
</div>
{/* Questions Badge (Q&A/Tests based on context) */}
<div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
{/* The screenshot shows 'Tests' and 'Q&A'. I'll use the prop name `questions` for
dynamic content */}
{questions}
</div>
{/* Last Updated Badge */}
<div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
Last Updated: {lastUpdated}
</div>
</div>
</div>
</div>
{/* Background Blob Animation/Visual Effect */}
<div className="absolute top-0 right-0 w-[40vw] md:w-[30vw] h-[200px] flex items-center
justify-center bg-white overflow-hidden">
{/* Blob 1: Green/Lime */}
<div className="absolute w-16 h-16 bg-lime-400 blur-[65px] animate-blob" />
{/* Blob 2: Teal */}
<div className="absolute w-16 h-16 bg-teal-400 blur-[65px] animate-blob" />
{/* Blob 3: Cyan */}
<div className="absolute w-16 h-16 bg-cyan-300 blur-[45px] animate-blob" />
{/* Blob 4: Fuchsia */}
<div className="absolute w-16 h-16 bg-fuchsia-200 blur-[45px] animate-blob" />
</div>
</div>
);
};
export default RoleInfoHeader;