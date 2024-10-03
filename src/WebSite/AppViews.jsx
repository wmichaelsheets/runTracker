import { Outlet, Route, Routes } from 'react-router-dom';
import { NavBar } from '../Components/NavBar/NavBar';
// import { NurseryList } from '../Components/Nursery/NurseryList';
// import { DistributorList } from '../Components/Distributor/DistributorList';
// import { RetailersList } from '../Components/Retailers/RetailersList';
import { Login } from '../auth/Login';
import { Register } from '../auth/Register';
import { useEffect, useState } from 'react';

export const AppViews = () => {
  const [currentUser, setCurrentUser] = useState({});


  useEffect(() => {
    const localRunUser = localStorage.getItem('run_user');
    const runUserObject = JSON.parse(localRunUser);

    setCurrentUser(runUserObject);
  }, []);

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
        {/* <Route path="/runs"  element={<NurseryList />} />
        <Route path="/shoes" element={<DistributorList />} />
        <Route path="/user"  element={<RetailersList /> }  />
        <Route path="/runsList"  element={<RetailersList /> }  />
        <Route path="/shoeList"  element={<RetailersList /> }  /> */}
      </Route>
    </Routes>
  );
};
