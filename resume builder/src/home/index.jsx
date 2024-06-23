import { Button } from '@/components/ui/button'
import { UserButton ,useUser } from '@clerk/clerk-react'
import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const {user, isSignedIn }= useUser();
  return (
    <div className='p-3 px-8 flex justify-between shadow-md'>
        <img src="/logo.svg" width={100} height={100}/>

        {isSignedIn ?
          <div className='flex gap-2 items-center'>
            <Button variant='outline'>Dashboard</Button>
            <UserButton/>
          </div>:
          <Link to={'/auth/sign-in'}>
          <Button>Get Started</Button>
          </Link>
        }

        
    </div>
  )
}

export default Home