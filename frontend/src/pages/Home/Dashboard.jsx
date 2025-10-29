import React, { useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import SummaryCard from '../../components/Cards/SummaryCard';
import moment from 'moment';
import axios from 'axios';
import Model from '../../components/Model';
import CreateSessionForm from '../Home/CreateSessionForm';
import { useUser } from '../../context/userContext';
import DeleteAlertContent from '../../components/Loader/DeleteAlertContent ';

// Gradient background list for cards
const CARD_BG = [
  { bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { bgColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { bgColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { bgColor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { bgColor: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { bgColor: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false)
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);

  // ✅ Fetch all sessions from API
  const fetchAllSessions = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('🔍 Token present:', !!token);
      console.log('🔍 User context:', user);
      if (!token) {
        toast.error('Please log in to view your sessions.');
        navigate('/login');
        return;
      }

      const response = await axios.get("https://interview-prep-r1rf.onrender.com/api/sessions/user/my-session", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setSessions(response.data);
    } catch (error) {
      console.log(error);

      toast.error('Failed to load sessions.');
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to delete the session.');
        return;
      }

      await axios.delete(`https://interview-prep-r1rf.onrender.com/api/sessions/user/${sessionData?._id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });

      toast.success("Session Deleted Successfully");
      setOpenDeleteAlert({
        open: false,
        data: null,
      });
      fetchAllSessions();
    } catch (error) {
      console.error("Error deleting session data:", error);
    }
  };
  useEffect(() => {
    if (user) fetchAllSessions();
  }, [user]);

  return (
    <DashboardLayout>
      <div className="container mx-auto pt-6 pb-8">
        {/* === Title === */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">My Interview Sessions</h1>

        {/* === Sessions Grid === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sessions.length > 0 ? (
            sessions.map((data, index) => (
              <SummaryCard
                key={data?._id}
                colors={CARD_BG[index % CARD_BG.length]}
                role={data?.role || ''}
                topicsToFocus={data?.topicsToFocus || ''}
                experience={data?.experience || ''}
                questions={data?.questions?.length || 0}
                description={data?.description || ''}
                lastUpdated={
                  data?.updatedAt ? moment(data.updatedAt).format('DD MMM YYYY') : 'N/A'
                }
                onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                onDelete={() => setOpenDeleteAlert({ open: true, data: data })}
              />
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500 py-10">
              No sessions yet. Create your first one!
            </div>
          )}
        </div>

        {/* === Floating Add Button === */}
        <div>
          <button
            onClick={() => setOpenCreateModal(true)}
            className="fixed bottom-10 right-10 md:bottom-20 md:right-20 
                     h-14 w-14 flex items-center justify-center 
                     bg-gradient-to-r from-pink-500 to-orange-400 
                     rounded-full text-white shadow-lg hover:scale-110 transition-transform"
          >
            <LuPlus className="text-2xl" />
          </button>
        </div>


        {/* === Create Session Modal === */}

        <Model isOpen={openCreateModal} onClose={() => setOpenCreateModal(false)} hideHeader>
          <div>
            <CreateSessionForm />
          </div>
        </Model>

        <Model

          isOpen={openDeleteAlert?.open}
          onClose={() => {
            // eslint-disable-next-line no-undef
            setOpenDeleteAlert({ open: false, data: null });
          }}
          title="Delete Alert"
        >
          <div className="w-[30vw]">
            <DeleteAlertContent
              content="Are you sure you want to delete this session detail?"
              onDelete={() => deleteSession(openDeleteAlert.data)}
            />
          </div>
        </Model>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
