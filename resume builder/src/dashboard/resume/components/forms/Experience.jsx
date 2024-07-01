import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummary: ''
}

function Experience() {

    const [experienceList, setExperienceList] = useState([
        formField
    ]);

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    const handleChange = (index, event) => {
        const newEntries = experienceList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries);
    }

    const AddNewExperience = () => {
        setExperienceList([...experienceList, {
            title: '',
            companyName: '',
            city: '',
            state: '',
            startDate: '',
            endDate: '',
            workSummary: '',
        }])
    }

    const RemoveExperience = () => {
        setExperienceList(experienceList => experienceList.slice(0, -1))
    }

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = experienceList.slice();
        newEntries[index][name] = e.target.value;
        setExperienceList(newEntries);
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            experience: experienceList
        })
    }, [experienceList])
    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Professional Experience</h2>
                <p>Add Your Previous Job Experience</p>

                <div>
                    {experienceList.map((item, index) => (
                        <div key={index}>

                            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>

                                <div>
                                    <label className='text-xs' >Position Title</label>
                                    <Input name="title" onChange={(event) => handleChange(index, event)} />
                                </div>

                                <div>
                                    <label className='text-xs' >Company Name</label>
                                    <Input name="companyName" onChange={(event) => handleChange(index, event)} />
                                </div>

                                <div>
                                    <label className='text-xs' >City</label>
                                    <Input name="city" onChange={(event) => handleChange(index, event)} />
                                </div>

                                <div>
                                    <label className='text-xs' >State</label>
                                    <Input name="state" onChange={(event) => handleChange(index, event)} />
                                </div>

                                <div>
                                    <label className='text-xs' >Start Date</label>
                                    <Input type="date" name="startDate" onChange={(event) => handleChange(index, event)} />
                                </div>

                                <div>
                                    <label className='text-xs' >End Date</label>
                                    <Input type="date" name="endDate" onChange={(event) => handleChange(index, event)} />
                                </div>

                                <div className='col-span-2'>
                                    {/*Work Summary*/}
                                    <RichTextEditor index={index} onRichTextEditorChange={(event) => handleRichTextEditor(event, 'workSummary', index)} />
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button variant="outline" onClick={AddNewExperience} className='text-primary'> + Add More Experience</Button>
                        <Button variant="outline" onClick={RemoveExperience} className='text-red-500'>- Remove </Button>

                    </div>
                    <Button>Save</Button>
                </div>

            </div>
        </div>
    )
}

export default Experience