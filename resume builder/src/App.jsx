import { useState } from 'react';
import { Button } from './components/ui/button';
import './App.css'
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Header from './components/custom/Header';


function App() {
  const [count, setCount] = useState(0)
  const {user,isLoaded,isSignedIn}=useUser();

  if (!isSignedIn&&isLoaded) {
    return <Navigate to={'/auth/sign-in'} />
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
