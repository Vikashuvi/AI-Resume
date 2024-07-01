import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg'
import { AIChatSession } from './../../../../service/AIModel';
import { toast } from 'sonner';

const PROMPT = 'position title: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume , give me result in HTML format'
function RichTextEditor({ onRichTextEditorChange, index }) {

    const [value, setValue] = useState();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [loading, setLoading] = useState(false);

    const GenerateSummaryFromAI = async () => {
        setLoading(true)
        if (!resumeInfo.experience[index].title) {
            toast('Please Add Position Title');
            return;
        }
        const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title)

        const result = await AIChatSession.sendMessage(prompt);
        console.log(result.response.text())

        const resp = result.response.text()
        setValue(resp.replace('[','').replace(']',));
        setLoading(false);
    }

    return (
        <div>
            <div className='flex justify-between my-2'>
                <label className='text-sm'>Summary</label>
                <Button variant='outline' size="sm"
                    onClick={GenerateSummaryFromAI}
                    className='flex gap-2 border-primary text-primary justify-end'>
                    {loading ?
                        <LoaderCircle className='animate-spin' /> :
                        <>
                            <Brain className='h-4 w-4' />Generate From AI
                            </>
                    }
                </Button>
            </div>
            <EditorProvider>
                <Editor value={value} onChange={(e) => {
                    setValue(e.target.value);
                    onRichTextEditorChange(e)
                }}>

                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                        <BtnClearFormatting />

                    </Toolbar>

                </Editor>
            </EditorProvider>
        </div>
    )
}

export default RichTextEditor