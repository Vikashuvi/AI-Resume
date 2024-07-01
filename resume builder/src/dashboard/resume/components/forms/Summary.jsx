import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import RichTextEditor from '../RichTextEditor'; // Adjust the import path as needed
import Globalapi from './../../../../../service/Globalapi';
import { useParams } from 'react-router-dom';
import { AIChatSession } from './../../../../../service/AIModel';

const prompt = "JobTitle: {jobTitle} , Depends on job title give a summary for resume with in 4-5 lines in JSON format with field experience Level and Summary with Experience level for Fresher, Mid-Level, Experienced"

function Summary({ enabledNext }) {

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summary, setSummary] = useState(resumeInfo?.summary || '');
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [aiGeneratedSummaryList, setAiGenerateSummaryList] = useState([]);

    useEffect(() => {
        if (summary) {
            setResumeInfo({
                ...resumeInfo,
                summary: summary
            });
        }
    }, [summary]);

    const GenerateSummaryFromAI = async () => {
        setLoading(true);
        const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
        console.log(PROMPT);
        
        const result = await AIChatSession.sendMessage(PROMPT);
        const responseText = await result.response.text();
        
        console.log('Raw response:', responseText); // Log the raw response

        // Attempt to clean up and parse the response
        try {
            const parsedResponse = JSON.parse(responseText);
            setAiGenerateSummaryList(parsedResponse);
        } catch (error) {
            console.error("Error parsing response:", error);
            toast("Failed to parse AI response");
        }
        
        setLoading(false);
    }

    const onSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            data: {
                summary: summary
            }
        }

        try {
            const resp = await Globalapi.UpdateResumeDetail(params?.resumeID, data);
            console.log(resp);
            enabledNext(true);
            toast("Details Updated");
        } catch (error) {
            console.error("Error updating resume details:", error);
            toast("Failed to update details");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Summary</h2>
                <p>Add summary to your job title</p>

                <form className='mt-7' onSubmit={onSave}>
                    
                    <div className='mt-5'>
                        <RichTextEditor index={0} value={summary} onRichTextEditorChange={(e) => setSummary(e.target.value)} />
                    </div>

                    <div className='mt-2 flex justify-end'>
                        <Button type="submit" disabled={loading}>
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>

            {aiGeneratedSummaryList.length > 0 && <div className='my-5'>
                <h2 className='font-bold text-lg'>Suggestions</h2>
                {aiGeneratedSummaryList.map((item, index) => (
                    <div key={index}
                        onClick={() => setSummary(item?.summary)}
                        className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                        <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                        <p>{item?.summary}</p>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default Summary;
