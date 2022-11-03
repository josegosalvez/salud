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
        <h3 className='text-center'>Inicia sesion</h3>
        <form className='form'
            onSubmit={handleSubmit}>
                
                <input
                    className='Recuadros'
                    type='text'
                    name='email'
                    placeholder='Email'
                    value={newUser.email}
                    onChange={handleInputChange}
                    >
                </input>
            
                <input
                    className='Recuadros'
                    type='new-password'
                    name='password'
                    placeholder='Password'
                    value={newUser.password}
                    onChange={handleInputChange}
                    >

                </input>
            
                {error && <p className='alert-error'>{message}</p>}
                <input className='Recuadro-Login' type="submit" value={loading ? 'Validando...' : "Login"}/>
        </form>
         <p className='temporal'>
            Si no tienes cuenta registrate. {' '}
            <Link to='/admin/register'>Haz click aqui.</Link> <br></br>
            Para ir a la pagina prinipal. {' '}
            <Link to='/'>Haz click aqui.</Link>
        </p>
        <p className='temporal'>
            
        </p>
    </div>
  );
};

export default LoginPage;