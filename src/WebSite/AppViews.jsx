import { Outlet, Route, Routes } from 'react-router-dom';
import { NavBar } from '../Components/NavBar/NavBar';
import { RunStatsList } from '../Components/Runs/RunStatsList'
import { ShoesList } from '../Components/Shoes/ShoesList';
import { UserEditCard } from '../Components/User/UserEditCard';
import {ShoesEditForm} from '../Components/Shoes/ShoesEditForm';
import { RunsByShoeList } from '../Components/Runs/RunsByShoeList';
import { ShoeEntryForm } from '../Components/Shoes/ShoesEntryForm';
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
        <Route path="/runs/enter"  element={<RunStatsList />} />
        <Route path="/runs/by-shoe"  element={<RunsByShoeList />} />
        <Route path="/shoes/all" element={<ShoesList />} />
        <Route path="/user" element={<UserEditCard />} />
        <Route path="/shoes/enter" element={<ShoeEntryForm onSave={setCurrentUser} />} />
      </Route>
      <Route path="/shoesEdit/:id" element={<ShoesEditForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>

  )
}
