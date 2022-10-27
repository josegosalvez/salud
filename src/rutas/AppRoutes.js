import { BrowserRouter, Routes, Route } from "react-router-dom"
import PublicRoutes from "./PublicRoutes";
import MainChat from "../Pages/MainChat";
import MainPage from "../Pages/MainPage"

const AppRoutes = () => {
    return(
    <BrowserRouter>
        <Routes>
            <Route path="" element={<MainPage />}/>
            <Route path="/chat" element={<MainChat />}/>
            <Route path="/admin/*" element={<PublicRoutes />}/>
        </Routes>
    
    </BrowserRouter>
    );
};

export default AppRoutes;