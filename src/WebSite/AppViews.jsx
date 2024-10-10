import { Outlet, Route, Routes } from 'react-router-dom';
import { NavBar } from '../Components/NavBar/NavBar';
import { RunStatsList } from '../Components/Runs/RunStatsList'
import { ShoesList } from '../Components/Shoes/ShoesList';
import { ShoesEditList } from '../Components/Shoes/ShoesEditList';
import { Login } from '../auth/Login';
import { Register } from '../auth/Register';
import { useEffect, useState } from 'react';

export const AppViews = () => {
  const [currentUser, setCurrentUser] = useState({})


  useEffect(() => {
    const localRunUser = localStorage.getItem('run_user')
    if (localRunUser) {
      const runUserObject = JSON.parse(localRunUser)
      setCurrentUser(runUserObject);
    }
  }, [])

    return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route path="/runs"  element={<RunStatsList />} />
        <Route path="/shoes" element={<ShoesList />} />
        
      </Route>
      <Route path="/shoesEdit" element={<ShoesEditList />} />
      <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />
    </Routes>

  )
}
