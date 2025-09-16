import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaCog, FaEnvelopeOpenText, FaHome, FaSignOutAlt, FaUser } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { MdEventNote } from "react-icons/md";

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const currentPath = location.pathname.replace(import.meta.env.VITE_REACT_APP_BASE_URL, '');

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        console.log("Déconnexion");
        navigate(`${import.meta.env.VITE_REACT_APP_BASE_URL}login`);
    };

    const navigationItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <FaHome />, to: 'admin/dashboard' },
        { id: 'analytics', label: 'Analytiques', icon: <IoStatsChartSharp />, to: 'admin/analytics' },
        { id: 'events', label: 'Événements', icon: <MdEventNote />, to: 'admin/events' },
        { id: 'poems', label: 'Poèmes', icon: <FaEnvelopeOpenText />, to: 'admin/poems' },
        { id: 'settings', label: 'Paramètres', icon: <FaCog />, to: 'admin/settings' },
    ];

    const AdminHeader = () => (
        <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-90 backdrop-blur-md border-b border-purple-900 py-4 px-6">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-white p-2"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <Link
                        to={`${import.meta.env.VITE_REACT_APP_BASE_URL}admin/dashboard`}
                        className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center"
                    >
                        <FaHome className="inline w-6 h-6 mr-2" color="cyan" />
                        Admin Panel
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                            <FaUser className="w-4 h-4" />
                        </div>
                        <span className="text-sm hidden md:block">Administrateur</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-gray-400 hover:text-white p-2"
                        title="Déconnexion"
                    >
                        <FaSignOutAlt className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>
    );

    const DesktopSidebar = () => (
        <aside className="w-64 bg-gray-900 bg-opacity-80 border-r border-purple-900 h-screen sticky top-16">
            <nav className="p-4 pt-6">
                <ul className="space-y-2">
                    {navigationItems.map((item) => (
                        <li key={item.id}>
                            <Link
                                to={`${import.meta.env.VITE_REACT_APP_BASE_URL}${item.to}`}
                                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                                    currentPath === item.to
                                        ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                }`}
                            >
                                <div className="text-lg">{item.icon}</div>
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );

    const MobileSidebar = () => (
        <>
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}
            <aside className={`fixed top-16 left-0 bottom-0 w-64 bg-gray-900 bg-opacity-95 border-r border-purple-900 z-50 transform transition-transform md:hidden ${
                isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <nav className="p-4 pt-6">
                    <ul className="space-y-2">
                        {navigationItems.map((item) => (
                            <li key={item.id}>
                                <Link
                                    to={`${import.meta.env.VITE_REACT_APP_BASE_URL}${item.to}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                                        currentPath === item.to
                                            ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white'
                                            : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                    }`}
                                >
                                    <div className="text-lg">{item.icon}</div>
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );

    return (
        <div className="min-h-screen bg-gray-950">
            <AdminHeader />
            <MobileSidebar />

            <div className="flex pt-16">
                {!isMobile && <DesktopSidebar />}

                <main className={`flex-1 ${isMobile ? 'min-h-screen' : 'min-h-screen'}`}>
                    <div className="p-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;