//import { ReactComponent as SVGicon } from "../assets/images";


const AuthLayout = ({children}) => {
    return(
        <div>
            <nav className="flex items-center justify-center">
                Aqui va una imagen
                Aqui va una imagen
                <p className="chat-slogan">Vamos a chatear</p>
            </nav>
            {children}
        </div>
    )
};

export default AuthLayout;