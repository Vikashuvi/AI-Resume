import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'

import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import Globalapi from './../../../../../service/Globalapi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function Skills() {

    const [skillsList, setSkillsList] = useState([{
        name: '',
        rating: 0
    }])

    const {resumeID}=useParams();
    const [loading,setLoading]=useState(false);
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)

    const handleChange = (index, name, value) => {
        const newEntries = skillsList.slice();
        newEntries[index][name] = value;
        setSkillsList(newEntries);
    }

    const AddNewSkills=()=>{
        setSkillsList([...skillsList,{
            name: '',
        rating: 0
        }])
    }

    const RemoveSkills=()=>{
        setSkillsList(skillsList=>skillsList.slice(0, -1))
    }

    const onSave=()=>{

        setLoading(true);
        const data={
            data:{
                skills:skillsList
            }
        }

        Globalapi.UpdateResumeDetail(resumeID,data).then(resp=>{
            console.log(resp);
            setLoading(false)
            toast('Details Updated')
        },(error)=>{
            setLoading(false);
            toast('Server Error')
        })
    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            skills:skillsList
        })
    },[skillsList])

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Education</h2>
            <p>Add Your Top Skills</p>

            <div>
                {skillsList.map((item, index) => (
                    <div className='flex justify-between mb-2 border rounded-lg p-3 gap-2'>
                        <div>
                            <label className='text-xs'>Name</label>
                            <Input className='w-full ' onChange={(e) => handleChange(index, 'name', e.target.value)} />
                        </div>
                        <Rating style={{ maxWidth: 120 }} value={item.rating} onChange={(v) => handleChange(index, 'rating', v)} />

                    </div>
                ))}
            </div>

            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={AddNewSkills} className='text-primary font-bold'> + Add More Education</Button>
                    <Button variant="outline" onClick={RemoveSkills} className='text-red-500 font-bold'>- Remove </Button>

                </div>
                <Button type="submit" disabled={loading} onClick={() => onSave()}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>

        </div>

    )
}

export default Skills