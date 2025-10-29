import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuListCollapse } from "react-icons/lu";
import toast from "react-hot-toast";
import axios from "axios";

// --- Your custom components ---
import RoleInfoHeader from "./Components/RoleInfoHeader";
import SpinnerLoader from "../../components/Loader/SpinnerLoade";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import QuestionCard from "../../components/Cards/QuestionCard";
import Drawer from "../../components/Drawer";

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [explanation, setExplanation] = useState(null)
  const [errMsg, setErrMsg] = useState()
  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false)
  const [isloading, setIsLoading] = useState(false)

  // === Fetch session details by ID ===
  const fetchSessionDetailsById = async () => {
    try {
      setIsFetching(true);
      const res = await axios.get(`https://interview-prep-r1rf.onrender.com/api/sessions/user/${sessionId}`, {
        withCredentials: true,
      });
      if (res.data && res.data.session) {
        setSessionData(res.data.session);
      } else {
        toast.error("Session not found");
      }
    } catch (error) {
      console.error("Error fetching session:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to fetch session");
    } finally {
      setIsFetching(false);
    }
  };

  // Generate Concept Explanation 
  const generateConceptExplanation = async (question) => {
    try {
      setErrMsg("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLeanMoreDrawer(true);

      const response = await axios.post(
        "https://interview-prep-r1rf.onrender.com/api/ai/user/generate-answer",
        {
          question,
          withCredentials: true
        }
      );

      if (response.data) {
        setExplanation(response.data);
      }
    } catch (error) {

      setExplanation(null)
      setErrMsg("Failed to generate explanation, Try again later");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Pin Question
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axios.post(
        `https://interview-prep-r1rf.onrender.com/api/question/user/${questionId}/pin`,
        {},
        { withCredentials: true }
      );

      console.log(response);

      if (response.data && response.data.question) {
        // toast.success('Question Pinned Successfully')
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // === Load More Questions (AI) ===
  const uploadMoreQuestions = async () => {
    if (!sessionData?.role) {
      toast.error("Session data not loaded yet");
      return;
    }

    try {
      setIsUpdateLoader(true);

      // Generate questions using AI
      const aiRes = await axios.post(
        "https://interview-prep-r1rf.onrender.com/api/ai/user/generate-question",
        {
          role: sessionData.role,
          experience: sessionData.experience,
          topicsToFocus: sessionData.topicsToFocus,
          numberOfQuestions: 10,
        },
        { withCredentials: true }
      );

      const generatedQuestions = aiRes.data;

      // Save them in DB (optional, depends on your backend)
      const saveRes = await axios.post(
        "https://interview-prep-r1rf.onrender.com/api/question/user/add",
        {
          sessionId,
          questions: generatedQuestions,
        },
        { withCredentials: true }
      );

      if (saveRes.data) {
        toast.success("Added more Q&A!");
        fetchSessionDetailsById(); // Refresh data
      }
    } catch (error) {
      console.error("Upload Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setIsUpdateLoader(false);
    }
  };

  // === On mount ===
  useEffect(() => {
    if (sessionId) fetchSessionDetailsById();
  }, [sessionId]);

  // === Render ===
  return (
    <DashboardLayout>
      {isFetching ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <SpinnerLoader />
        </div>
      ) : (
        <>
          <RoleInfoHeader
            role={sessionData?.role || ""}
            topicsToFocus={sessionData?.topicsToFocus || ""}
            experience={sessionData?.experience || ""}
            questions={sessionData?.questions?.length || 0}
            description={sessionData?.description || ""}
            lastUpdated={
              sessionData?.updatedAt
                ? moment(sessionData.updatedAt).format("Do MMM YYYY")
                : ""
            }
          />

          <div className="container mx-auto pt-4 pb-4 md:px-0 px-4">
            <h2 className="text-lg font-semibold color-black">Interview Q & A</h2>

            <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
              <div className="col-span-12">
                <AnimatePresence>
                  {sessionData?.questions?.map((q, index) => (
                    <motion.div
                      key={q.data_id || index}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.4,
                        type: "spring",
                        stiffness: 100,
                        delay: index * 0.05,
                      }}
                    >
                      <QuestionCard
                        question={q.question}
                        answer={q.answer}
                        isPinned={q.isPinned}
                        onTogglePin={() => toggleQuestionPinStatus(q._id)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {sessionData?.questions?.length > 0 && (
                  <div className="flex items-center justify-center mt-6">
                    <button
                      onClick={uploadMoreQuestions}
                      disabled={isUpdateLoader}
                      className="flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 rounded cursor-pointer"
                    >
                      {isUpdateLoader ? <SpinnerLoader /> : <LuListCollapse className="text-lg" />}
                      Load More
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div>

            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default InterviewPrep;
