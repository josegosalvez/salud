//LO TENGO QUE CONFIRMAR PERO CREO QUE ESTE ARCHIVO SE PUEDE BORRAR

import { createContext } from "react";

export const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    return <AuthContext.Provider>{children}</AuthContext.Provider>;
};



