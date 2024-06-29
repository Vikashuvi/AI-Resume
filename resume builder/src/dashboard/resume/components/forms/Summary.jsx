import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import Globalapi from './../../../../../service/Globalapi'
import { useParams } from 'react-router-dom'
import { Brain, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'


function Summary({enabledNext}) {

    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const [summary,setSummary]=useState();
    const [loading,setLoading]=useState(false);
    const params=useParams();

    useEffect(()=>{
        summary&&setResumeInfo({
            ...resumeInfo,
            summary:summary
        })
    },[summary])

    const onSave=(e)=>{
        e.preventDefault();
        setLoading(true);

        const data={
            data:{
                summary:summary
            }
        }

        Globalapi.UpdateResumeDetail(params?.resumeID,data).then(resp=>{
            console.log(resp);
            enabledNext(true);
            setLoading(false);
            toast("Details Updated")
        },(error)=>{
            setLoading(false);
        })
    }

  return (
    <div>
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Summary</h2>
        <p>Add summary to your jobTitle</p>

            <form className='mt-7' onSubmit={onSave}>
                <div className='flex justify-between items-end'>
                    <label>Add label</label>
                    <Button type="button" variant="outline" size="sm" className="border-primary text-primary flex gap-2">
                        <Brain className='h-4 w-4'/> Generate from AI</Button>
                </div>
                <Textarea className='mt-5' required
                onChange={(e)=>setSummary(e.target.value)} />

                <div className='mt-2 flex justify-end'>
                <Button type="submit"
                disabled={loading}
                >{loading?<LoaderCircle className='animate-spin'/>:'Save'}</Button>
                </div>

            </form>

        </div>
    </div>
  )
}

export default Summary