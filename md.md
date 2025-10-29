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

//error iamge uplaod

uploadImage.js:10  POST http://localhost:8001/api/upload/user/upload-image 404 (Not Found)
dispatchXhrRequest @ axios.js?v=f8ea1c54:1683
xhr @ axios.js?v=f8ea1c54:1560
dispatchRequest @ axios.js?v=f8ea1c54:2085
_request @ axios.js?v=f8ea1c54:2305
request @ axios.js?v=f8ea1c54:2197
httpMethod @ axios.js?v=f8ea1c54:2334
wrap @ axios.js?v=f8ea1c54:8
uploadImage @ uploadImage.js:10
handleSignUp @ SignUp.jsx:51
executeDispatch @ react-dom_client.js?v=f8ea1c54:13622
runWithFiberInDEV @ react-dom_client.js?v=f8ea1c54:997
processDispatchQueue @ react-dom_client.js?v=f8ea1c54:13658
(anonymous) @ react-dom_client.js?v=f8ea1c54:14071
batchedUpdates$1 @ react-dom_client.js?v=f8ea1c54:2626
dispatchEventForPluginEventSystem @ react-dom_client.js?v=f8ea1c54:13763
dispatchEvent @ react-dom_client.js?v=f8ea1c54:16784
dispatchDiscreteEvent @ react-dom_client.js?v=f8ea1c54:16765
<form>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=f8ea1c54:247
SignUp @ SignUp.jsx:86
react_stack_bottom_frame @ react-dom_client.js?v=f8ea1c54:18509
renderWithHooksAgain @ react-dom_client.js?v=f8ea1c54:5729
renderWithHooks @ react-dom_client.js?v=f8ea1c54:5665
updateFunctionComponent @ react-dom_client.js?v=f8ea1c54:7475
beginWork @ react-dom_client.js?v=f8ea1c54:8525
runWithFiberInDEV @ react-dom_client.js?v=f8ea1c54:997
performUnitOfWork @ react-dom_client.js?v=f8ea1c54:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=f8ea1c54:12557
renderRootConcurrent @ react-dom_client.js?v=f8ea1c54:12539
performWorkOnRoot @ react-dom_client.js?v=f8ea1c54:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=f8ea1c54:13505
performWorkUntilDeadline @ react-dom_client.js?v=f8ea1c54:36
<SignUp>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=f8ea1c54:247
SignUpPage @ SignUpPage.jsx:46
react_stack_bottom_frame @ react-dom_client.js?v=f8ea1c54:18509
renderWithHooksAgain @ react-dom_client.js?v=f8ea1c54:5729
renderWithHooks @ react-dom_client.js?v=f8ea1c54:5665
updateFunctionComponent @ react-dom_client.js?v=f8ea1c54:7475
beginWork @ react-dom_client.js?v=f8ea1c54:8525
runWithFiberInDEV @ react-dom_client.js?v=f8ea1c54:997
performUnitOfWork @ react-dom_client.js?v=f8ea1c54:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=f8ea1c54:12557
renderRootConcurrent @ react-dom_client.js?v=f8ea1c54:12539
performWorkOnRoot @ react-dom_client.js?v=f8ea1c54:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=f8ea1c54:13505
performWorkUntilDeadline @ react-dom_client.js?v=f8ea1c54:36Understand this error
uploadImage.js:15 Error uploading the image: AxiosError {message: 'Request failed with status code 404', name: 'AxiosError', code: 'ERR_BAD_REQUEST', config: {…}, request: XMLHttpRequest, …}
overrideMethod @ hook.js:608
uploadImage @ uploadImage.js:15
await in uploadImage
handleSignUp @ SignUp.jsx:51
executeDispatch @ react-dom_client.js?v=f8ea1c54:13622
runWithFiberInDEV @ react-dom_client.js?v=f8ea1c54:997
processDispatchQueue @ react-dom_client.js?v=f8ea1c54:13658
(anonymous) @ react-dom_client.js?v=f8ea1c54:14071
batchedUpdates$1 @ react-dom_client.js?v=f8ea1c54:2626
dispatchEventForPluginEventSystem @ react-dom_client.js?v=f8ea1c54:13763
dispatchEvent @ react-dom_client.js?v=f8ea1c54:16784
dispatchDiscreteEvent @ react-dom_client.js?v=f8ea1c54:16765
<form>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=f8ea1c54:247
SignUp @ SignUp.jsx:86
react_stack_bottom_frame @ react-dom_client.js?v=f8ea1c54:18509
renderWithHooksAgain @ react-dom_client.js?v=f8ea1c54:5729
renderWithHooks @ react-dom_client.js?v=f8ea1c54:5665
updateFunctionComponent @ react-dom_client.js?v=f8ea1c54:7475
beginWork @ react-dom_client.js?v=f8ea1c54:8525
runWithFiberInDEV @ react-dom_client.js?v=f8ea1c54:997
performUnitOfWork @ react-dom_client.js?v=f8ea1c54:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=f8ea1c54:12557
renderRootConcurrent @ react-dom_client.js?v=f8ea1c54:12539
performWorkOnRoot @ react-dom_client.js?v=f8ea1c54:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=f8ea1c54:13505
performWorkUntilDeadline @ react-dom_client.js?v=f8ea1c54:36
<SignUp>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=f8ea1c54:247
SignUpPage @ SignUpPage.jsx:46
react_stack_bottom_frame @ react-dom_client.js?v=f8ea1c54:18509
renderWithHooksAgain @ react-dom_client.js?v=f8ea1c54:5729
renderWithHooks @ react-dom_client.js?v=f8ea1c54:5665
updateFunctionComponent @ react-dom_client.js?v=f8ea1c54:7475
beginWork @ react-dom_client.js?v=f8ea1c54:8525
runWithFiberInDEV @ react-dom_client.js?v=f8ea1c54:997
performUnitOfWork @ react-dom_client.js?v=f8ea1c54:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=f8ea1c54:12557
renderRootConcurrent @ react-dom_client.js?v=f8ea1c54:12539
performWorkOnRoot @ react-dom_client.js?v=f8ea1c54:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=f8ea1c54:13505
performWorkUntilDeadline @ react-dom_client.js?v=f8ea1c54:36Understand this error
SignUp.jsx:74 There was an error registering! AxiosError {message: 'Request failed with status code 404', name: 'AxiosError', code: 'ERR_BAD_REQUEST', config: {…}, request: XMLHttpRequest, …}





Dashboard.jsx:70 Error deleting session data: TypeError: "http://localhost:8001/api/sessions/user/:id" is not a function
    at deleteSession (Dashboard.jsx:57:26)
    at onDelete (Dashboard.jsx:143:31)
