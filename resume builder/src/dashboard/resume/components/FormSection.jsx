import React, { useState } from 'react'
import PersonalDetails from './forms/PersonalDetails'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Summary from './forms/Summary';
import Experience from './forms/Experience';

function FormSection() {
  const[activeFormIndex,setActiveFormIndex]=useState(1);
  const [enableNext,setEnableNext]=useState(false)
  return (
    <div>

      <div className='flex justify-between items-center'>
        <Button variant="outline" size="sm" className="flex gap-2"><LayoutGrid/> Theme</Button>
        <div className='flex gap-2'>
          {activeFormIndex>1&& <Button size="sm"
          onClick={()=>setActiveFormIndex(activeFormIndex-1)}
          ><ArrowLeft/></Button>}
          
          <Button
          disabled={!enableNext}
          className='flex gap-2' size="sm"
          onClick={()=>setActiveFormIndex(activeFormIndex+1)}
          >Next <ArrowRight/></Button>
        </div>
      </div>

      {/* Personal Details */}
        {activeFormIndex==1? <PersonalDetails enabledNext={(v)=>setEnableNext(v)} />
        :activeFormIndex==2? <Summary enabledNext={(v)=>setEnableNext(v)} />
        :activeFormIndex==3?  <Experience enabledNext={(v)=>setEnableNext(v)} />
        :null
      }
      {/* Summary */}

      {/* Experience */}

      {/* Educational Details */}

      {/* Skills */}
    </div>
  )
}

export default FormSection