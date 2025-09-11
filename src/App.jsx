import {BrowserRouter, Route, Routes} from "react-router-dom";
import Index from "./views/index.jsx";
import About from "./views/about/About.jsx";
import Events from "./views/events/Events.jsx";
import Contact from "./views/contact/Contact.jsx";
import './App.css';
import Poems from "./views/poems/Poems.jsx";
import Layout from "./views/Layout.jsx";
import Login from "./views/login/Login.jsx";
import ProtectedRoute from "./components/routes/ProtectedRoute.jsx";
import Admin from "./views/admin/Admin.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import error404 from "./views/errors/error404.jsx";

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="min-h-screen bg-black text-white overflow-x-hidden">
                    <Routes>
                        <Route path={`${import.meta.env.VITE_REACT_APP_BASE_URL}login`} element={<Login/>}/>
                        <Route path={`${import.meta.env.VITE_REACT_APP_BASE_URL}`} element={<Layout/>}>
                            <Route index element={<Index/>}/>
                            <Route path="poems" element={<Poems/>}/>
                            <Route path="about" element={<About/>}/>
                            <Route path="events" element={<Events/>}/>
                            <Route path="contact" element={<Contact/>}/>

                            <Route path="admin" element={<ProtectedRoute />}>
                                <Route path="" element={<Admin />}/>
                            </Route>

                            <Route path="*" element={<error404 />}/>
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;