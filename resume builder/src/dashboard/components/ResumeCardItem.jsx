import { Notebook } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function ResumeCardItem({ resume }) {
  // Strapi returns data in a nested structure
  const resumeData = resume.attributes || resume;
  // Convert id to string to ensure consistent type
  const resumeId = String(resume.id || resumeData.documentId);

  return (
    <Link to={'/dashboard/resume/' + resumeId + "/edit"}>
      <div className='p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 flex items-center justify-center
      h-[280px] border border-primary rounded-lg
      hover:scale-105 transition-all hover:shadow-md shadow-primary'
        style={{
          borderColor: resumeData?.themeColor
        }}>
        <img src="/cv.png" alt="Resume thumbnail" className="max-w-full max-h-full object-contain" />
      </div>
      <h2 className='text-center my-1'>{resumeData.title || 'Untitled Resume'}</h2>
    </Link>
  )
}

ResumeCardItem.propTypes = {
  resume: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // Accept both number and string
    attributes: PropTypes.shape({
      title: PropTypes.string,
      themeColor: PropTypes.string,
      documentId: PropTypes.string
    }),
    // For backward compatibility
    title: PropTypes.string,
    themeColor: PropTypes.string,
    documentId: PropTypes.string
  }).isRequired
};

export default ResumeCardItem
