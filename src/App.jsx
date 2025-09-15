import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Index from "@/views/Index.jsx";
import About from "@/views/about/About.jsx";
import Events from "@/views/events/Events.jsx";
import Contact from "@/views/contact/Contact.jsx";
import '@/App.css';
import Poems from "@/views/poems/Poems.jsx";
import Layout from "@/views/Layout.jsx";
import AdminLayout from "@/views/admin/Layout.jsx";
import Login from "@/views/login/Login.jsx";
import ProtectedRoute from "@/components/routes/ProtectedRoute.jsx";
import Dashboard from "@/views/admin/Dashboard.jsx";
import AuthProvider from "@/providers/AuthProvider.jsx";
import Error404 from "@/views/errors/Error404.jsx";
import MusicProvider from "@/providers/MusicProvider.jsx";
import AdminPoems from "@/views/admin/Poems.jsx";
import AdminEvents from "@/views/admin/Events.jsx";
import AdminAnalytics from "@/views/admin/Analytics.jsx";
import AdminSettings from "@/views/admin/Settings.jsx";

const App = () => {
    return (
        <AuthProvider>
            <MusicProvider>
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
                                <Route path="*" element={<Error404/>}/>
                            </Route>

                            <Route path={`${import.meta.env.VITE_REACT_APP_BASE_URL}admin`} element={
                                <ProtectedRoute>
                                    <AdminLayout/>
                                </ProtectedRoute>
                            }>
                                <Route index element={<Navigate to="dashboard" replace/>}/>
                                <Route path="dashboard" element={<Dashboard/>}/>
                                <Route path="poems" element={<AdminPoems/>}/>
                                <Route path="events" element={<AdminEvents/>}/>
                                <Route path="analytics" element={<AdminAnalytics/>}/>
                                <Route path="settings" element={<AdminSettings/>}/>
                            </Route>
                        </Routes>
                    </div>
                </BrowserRouter>
            </MusicProvider>
        </AuthProvider>
    );
}

export default App;