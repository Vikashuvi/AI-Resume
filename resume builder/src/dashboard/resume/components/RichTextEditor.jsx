import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';
import React, { useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg'

function RichTextEditor({onRichTextEditorChange}) {

    const [value, setValue] = useState();
    return (
        <div>
            <div className='flex justify-between my-2'>
                <label className='text-sm'>Summary</label>
                <Button variant='outline' size="sm" className='flex gap-2 border-primary text-primary justify-end'><Brain/>Generate From AI</Button>
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