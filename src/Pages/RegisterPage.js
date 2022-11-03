import { async } from '@firebase/util';
import React, {useContext, useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../firebase/firebaseConfig';

const RegisterPage = () => {
    const navigate = useNavigate();
    const {createNewUser, loading, error, message, persisUser} = useContext(AuthContext);

    useEffect(() =>{
      if(persisUser() == false){
          return navigate('/admin/register');
      }else{
          navigate('/chat');
      }
    }, []);

    const [newUser, setNewUser] = useState({
        email: "",
        password:"",
    });

    const handleInputChange = (e) => {
        setNewUser({
        ...newUser,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {email, password} = newUser;
            const result = await createNewUser(email, password);

            if (result == undefined) {
                return;
            }else{
                navigate("/chat");
            }
        } catch (error) {
            console.error("Error creadno usuario",error);
        }
        
    }

  return (
    <div className='container'>
        <h3 className='text-center'>Registrarse</h3>
        <form className='form'
            onSubmit={handleSubmit}>
                
                <input
                    type='text'
                    name='email'
                    placeholder='Email'
                    value={newUser.email}
                    onChange={handleInputChange}
                    >
                </input>

                <input
                    type='new-password'
                    name='password'
                    placeholder='Password'
                    value={newUser.password}
                    onChange={handleInputChange}
                    >

                </input>
            
            {error && <p className='alert-error'>{message}</p>}
            <input className='Recuadro-Login' type="submit" value={loading ? 'Validando...' : "Registrarse"}/>
        </form>
        <p className='temporal'>
            Tienes cuenta? Inicia sesion {' '}
            <Link to='/admin/login'>Haz click aqui.</Link><br></br>
            Para ir a la pagina prinipal. {' '}
            <Link to='/'>Haz click aqui.</Link>
        </p>
        <p>
            
        </p>
    </div>
  )
};

export default RegisterPage;