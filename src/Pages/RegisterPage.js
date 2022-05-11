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
        <h2 className='text-center'>Registrate para chatear</h2>
        <form
            onSubmit={handleSubmit}>
            <div>
                <input
                    type='text'
                    name='email'
                    placeholder='Email'
                    value={newUser.email}
                    onChange={handleInputChange}
                    >
                </input>
            </div>
            <div>
                <input
                    type='new-password'
                    name='password'
                    placeholder='Password'
                    value={newUser.password}
                    onChange={handleInputChange}
                    >

                </input>
            </div>
            {error && <p className='alert-error'>{message}</p>}
            <input type="submit" value={loading ? 'Validando...' : "Registrarse"}/>
        </form>
        <p>
            Tienes cuenta? Inicia sesion {' '}
            <Link to='/admin/login'>Haz click aqui.</Link>
        </p>
    </div>
  )
};

export default RegisterPage;