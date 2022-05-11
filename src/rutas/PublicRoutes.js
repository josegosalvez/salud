import React from 'react';
import {Routes,Route} from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';


const PublicRoutes = () => {
    return(
        <AuthLayout>
            <Routes>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
            </Routes>
        </AuthLayout>
    )
};

export default PublicRoutes;