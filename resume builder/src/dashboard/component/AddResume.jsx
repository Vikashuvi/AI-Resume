import { PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <div>
      <div className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg
      hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed' 
      onClick={() => setOpenDialog(true)}>
        <PlusSquare />
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
            <div className='flex justify-end gap-5'>
              <Button variant='ghost'>Cancel</Button>
              <Button>Create</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default AddResume