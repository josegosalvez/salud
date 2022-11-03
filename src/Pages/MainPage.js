import React, {useState, useContext, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../firebase/firebaseConfig';





const MainPage = () => {
    return(
        <div className='containerMainPage'>
            <h2 className='text-center'>Pagina Principal</h2>
            <p>
                Primero que todo haz login. {' '}
                <Link to='/admin/login'>Haz click aqui.</Link>
            </p>
        </div>


    );
};


export default MainPage;