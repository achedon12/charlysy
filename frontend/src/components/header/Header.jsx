import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import SettingsModal from "./settingsModal/SettingsModal.jsx";
import { FaCog, FaUser, FaTimes, FaBars } from "react-icons/fa";

const Header = () => {
    const location = useLocation();
    const activeSection = location.pathname === '/' ? 'home' : location.pathname.slice(1);
    const { t } = useTranslation();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const navigationItems = ['home', 'poems', 'events', 'about', 'contact'];

    return (
        <header>
            <nav className="fixed w-full z-50 bg-black bg-opacity-70 backdrop-blur-md py-4 px-8 border-b border-purple-900">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
                        Charly <span className="text-yellow-400">Sy</span>
                    </div>

                    <div className="hidden md:flex space-x-8">
                        {navigationItems.map((item) => (
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

                    <div className="hidden md:flex items-center space-x-4">
                        <FaCog
                            className="w-6 h-6 text-white hover:text-cyan-400 cursor-pointer transition-colors"
                            onClick={() => setIsSettingsOpen(true)}
                        />
                        <Link
                            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white px-4 py-2 rounded-md transition-all"
                            to={`${import.meta.env.VITE_REACT_APP_BASE_URL}login`}
                        >
                            <FaUser className="w-4 h-4" />
                            <span>Se connecter</span>
                        </Link>
                    </div>

                    <div className="md:hidden flex items-center space-x-4">
                        <FaCog
                            className="w-6 h-6 text-white hover:text-cyan-400 cursor-pointer transition-colors"
                            onClick={() => setIsSettingsOpen(true)}
                        />
                        <button
                            onClick={toggleMobileMenu}
                            className="text-white focus:outline-none"
                            aria-label="Toggle menu"
                            name={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                        >
                            {isMobileMenuOpen ? (
                                <FaTimes className="w-6 h-6" />
                            ) : (
                                <FaBars className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                    <div className="container mx-auto py-4 px-4 bg-gray-900 bg-opacity-90 rounded-lg mt-4 border border-purple-800">
                        <div className="flex flex-col space-y-4">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item}
                                    to={`${import.meta.env.VITE_REACT_APP_BASE_URL}${item === 'home' ? '' : `${item}`}`}
                                    className={`py-2 px-4 rounded-lg text-center uppercase text-sm tracking-wider transition-all ${
                                        activeSection === item
                                            ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white'
                                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                                    }`}
                                    onClick={closeMobileMenu}
                                >
                                    {t(`header.${item}`)}
                                </Link>
                            ))}

                            <Link
                                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white py-2 px-4 rounded-md transition-all mt-4"
                                to={`${import.meta.env.VITE_REACT_APP_BASE_URL}login`}
                                onClick={closeMobileMenu}
                            >
                                <FaUser className="w-4 h-4" />
                                <span>Se connecter</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={closeMobileMenu}
                ></div>
            )}

            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />
        </header>
    );
};

export default Header;