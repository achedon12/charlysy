import {Link, Outlet, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {FaCog, FaEnvelopeOpenText, FaHome} from "react-icons/fa";
import {IoStatsChartSharp} from "react-icons/io5";
import {MdEventNote} from "react-icons/md";

const Layout = () => {

    const location = useLocation();
    const activeTab = `${location.pathname}`;
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (isMobile) {
        return (
            <div className="flex flex-col">
                <aside className="w-full fixed bottom-0 bg-gray-900 bg-opacity-70 border-t border-purple-900 z-50">
                    <nav className="p-4 pt-2">
                        <ul className="flex justify-around items-center">
                            {[
                                { id: 'overview', label: 'Aperçu', icon: <FaHome />, to: 'admin/dashboard' },
                                { id: 'analytics', label: 'Analytiques', icon: <IoStatsChartSharp />, to: 'admin/analytics' },
                                { id: 'events', label: 'Événements', icon: <MdEventNote />, to: 'admin/events' },
                                { id: 'poems', label: 'Poèmes', icon: <FaEnvelopeOpenText />, to: 'admin/poems' },
                                { id: 'settings', label: 'Paramètres', icon: <FaCog />, to: 'admin/settings' },
                            ].map((item) => (
                                <li key={item.id} className="flex-1">
                                    <Link
                                        to={`${import.meta.env.VITE_REACT_APP_BASE_URL}${item.to}`}
                                        className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                                            activeTab === `${import.meta.env.VITE_REACT_APP_BASE_URL}${item.to}`
                                                ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white'
                                                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                        }`}
                                    >
                                        <div className="text-lg">{item.icon}</div>
                                        <span className="text-xs mt-1">{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>
                <Outlet />
            </div>
        )
    }

    return (
        <div className="flex flex-col md:flex-row">
            <aside className="pt-16 w-64 bg-gray-900 bg-opacity-70 border-r border-purple-900 h-screen sticky top-0 md:top-16">
                <nav className="p-4 pt-6">
                    <ul className="space-y-2">
                        {[
                            { id: 'overview', label: 'Aperçu', icon: <FaHome />, to: 'admin/dashboard' },
                            { id: 'analytics', label: 'Analytiques', icon: <IoStatsChartSharp  />, to: 'admin/analytics' },
                            { id: 'events', label: 'Événements', icon: <MdEventNote />, to: 'admin/events' },
                            { id: 'poems', label: 'Poèmes', icon: <FaEnvelopeOpenText />, to: 'admin/poems' },
                            { id: 'settings', label: 'Paramètres', icon: <FaCog />, to: 'admin/settings' },
                        ].map((item) => (
                            <li key={item.id}>
                                <Link
                                    to={`${import.meta.env.VITE_REACT_APP_BASE_URL}${item.to}`}
                                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                                        activeTab === `${import.meta.env.VITE_REACT_APP_BASE_URL}${item.to}`
                                            ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white'
                                            : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                    }`}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
            <Outlet />
        </div>
    )
}

export default Layout;