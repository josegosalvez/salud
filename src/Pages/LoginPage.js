import React, {useState, useContext, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../firebase/firebaseConfig';

const LoginPage = () => {
    const navigate = useNavigate();
    const {loginUser, loading, error, message, persisUser} = useContext(AuthContext);
    
    useEffect(() =>{
      if(persisUser() == false){
          return navigate('/admin/login');
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
            const {email,password} = newUser;
            const result = await loginUser(email,password);
            if (result == undefined) {
                return;
            }else{
                navigate("/chat");
            }
        } catch (error) {
            console.error("Error logeando usuario",error);
        }
    };

  return (
    <div className='container'>
        <h2 className='text-center'>Inicia sesion para chatear</h2>
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
            <input type="submit" value={loading ? 'Validando...' : "Login"}/>
        </form>
         <p>
            Si no tienes cuenta registrate. {' '}
            <Link to='/admin/register'>Haz click aqui.</Link>
        </p>
        <p>
            Para ir a la pagina prinipal. {' '}
            <Link to='/'>Haz click aqui.</Link>
        </p>
    </div>
  );
};

export default LoginPage;