import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useUser } from '@clerk/clerk-react';
import { toast } from 'sonner';
import AddResume from './components/AddResume';
import Globalapi from '../../service/Globalapi';
import ResumeCardItem from './components/ResumeCardItem';
import { GridLoader } from 'react-spinners';

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      GetResumeList();
    }
  }, [user]);

  const GetResumeList = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const resp = await Globalapi.GetUserResumes(user?.primaryEmailAddress?.emailAddress);
      // Strapi v4 returns data in a nested structure
      const resumes = resp.data.data;
      // Ensure we have valid data
      const validResumes = Array.isArray(resumes) ? resumes.map(resume => ({
        ...resume,
        id: String(resume.id) // Convert all IDs to strings
      })) : [];
      setResumeList(validResumes);
    } catch (err) {
      console.error('Failed to fetch resumes:', err);
      setError('Failed to load resumes. Please try again later.');
      toast.error('Failed to load resumes');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="p-10 md:px-20 lg:px-32">
        <div className="text-red-500 text-center">
          <p>{error}</p>
          <button
            onClick={GetResumeList}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <GridLoader color="#4F46E5" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
          <AddResume onSuccess={GetResumeList} />
          {resumeList.map((resume) => (
            <ResumeCardItem 
              resume={resume} 
              key={resume.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// PropTypes for ResumeCardItem
ResumeCardItem.propTypes = {
  resume: PropTypes.shape({
    id: PropTypes.string,
    attributes: PropTypes.object
  }).isRequired,
  onDelete: PropTypes.func
};

// PropTypes for AddResume
AddResume.propTypes = {
  onSuccess: PropTypes.func
};

export default Dashboard;