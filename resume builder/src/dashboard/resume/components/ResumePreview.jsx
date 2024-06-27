import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummaryPreview from './preview/SummaryPreview'

function ResumePreview() {
  
  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
  
  return (

    <div className='shadow-lg h-full p-14 border-t-[20px]'
      style={{
        borderColor:resumeInfo?.themeColor
      }}
    >
        {/* Personal Detail */}
          <PersonalDetailPreview resumeInfo={resumeInfo} />

        {/* Summary */}
          <SummaryPreview resumeInfo={resumeInfo}/>

        {/* Professional Experience */}

        {/* Education */}

        {/* Skills */}
    </div>
  )
}

export default ResumePreview