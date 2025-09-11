import {Link, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import SettingsModal from "./settingsModal/SettingsModal.jsx";
import {FaCog, FaUser} from "react-icons/fa";

const Header = () => {

    const location = useLocation()

    const activeSection = location.pathname === '/' ? 'home' : location.pathname.slice(1)
    const {t} = useTranslation();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);


    return (
        <header>
            <nav
                className="fixed w-full z-50 bg-black bg-opacity-70 backdrop-blur-md py-4 px-8 border-b border-purple-900">
                <div className="container mx-auto flex justify-between items-center">
                    <div
                        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
                        Charly <span className="text-yellow-400">Sy</span>
                    </div>

                    <div className="hidden md:flex space-x-8">
                        {['home', 'poems', 'events', 'about', 'contact'].map((item) => (
                            <Link
                                key={item}
                                to={`${import.meta.env.VITE_REACT_APP_BASE_URL}${item === 'home' ? '' : `${item}`}`}
                                className={`uppercase text-sm tracking-wider hover:text-cyan-400 transition-all ${
                                    activeSection === item ? 'text-cyan-400 border-b-2 border-cyan-400' : ''
                                }`}
                            >
                                {t(`header.${item}`)}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4">
                        <FaCog
                            className="w-6 h-6 text-white hover:text-cyan-400 cursor-pointer"
                            onClick={() => setIsSettingsOpen(true)}
                        />
                        <Link
                            className="flex items-center space-x-2 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md transition-all"
                            to={`${import.meta.env.VITE_REACT_APP_BASE_URL}login`}>
                            <FaUser />
                            Se connecter
                        </Link>

                        <button className="md:hidden">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M4 6h16M4 12h16m-7 6h7"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />
        </header>
    );
}

export default Header;