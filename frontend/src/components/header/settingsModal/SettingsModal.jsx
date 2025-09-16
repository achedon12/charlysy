import React, {useEffect, useState} from "react";
import { AvailableLanguages } from "../../../utils/i18n.js";
import { useTranslation } from "react-i18next";
import Modal from "../../modal/Modal.jsx";
import ReactCountryFlag from "react-country-flag";

const SettingsModal = ({ isOpen, onClose }) => {
    const { i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
    const [canChooseTheme, setCanChooseTheme] = useState(false);

    const changeLanguage = (language) => {
        setSelectedLanguage(language);
        i18n.changeLanguage(language);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black text-white p-6 rounded-2xl border border-purple-700 shadow-lg shadow-purple-500/20 max-w-md mx-auto">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-t-2xl"></div>

                <h2 className="text-2xl uppercase font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                    ⚙️ paramètres
                </h2>

                <div className="mb-6">
                    <h3 className="text-lg uppercase font-semibold mb-3 flex items-center text-cyan-300">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                        langue
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                        {AvailableLanguages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => changeLanguage(lang.code)}
                                className={`py-3 px-4 rounded-lg border transition-all flex items-center justify-center ${
                                    selectedLanguage === lang.code
                                        ? 'bg-gradient-to-r from-purple-600 to-cyan-500 border-cyan-400 text-white shadow-lg shadow-cyan-500/30'
                                        : 'bg-gray-800 border-purple-800 text-gray-300 hover:bg-gray-700 hover:border-cyan-400'
                                }`}
                            >
                                <ReactCountryFlag countryCode={lang.flagCode} className="w-5 h-5 mr-2 rounded-sm" svg />
                                {lang.name}
                            </button>
                        ))}
                    </div>
                </div>

                {canChooseTheme && (<div className="mb-6">
                    <h3 className="text-lg uppercase font-semibold mb-3 flex items-center text-purple-300">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        thème
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                        <button className="py-3 px-4 rounded-lg border border-purple-800 bg-gray-800 text-gray-300 flex items-center justify-center hover:bg-gray-700 hover:border-cyan-400 transition-all">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                            Sombre
                        </button>
                        <button className="py-3 px-4 rounded-lg border border-purple-800 bg-gray-800 text-gray-300 flex items-center justify-center hover:bg-gray-700 hover:border-cyan-400 transition-all">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            Clair
                        </button>
                    </div>
                </div>)}

                <div className="mb-6">
                    <h3 className="text-lg uppercase font-semibold mb-3 flex items-center text-yellow-300">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m0-9.9l.707.707m0 0l.707-.707" />
                        </svg>
                        Sons
                    </h3>

                    <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg border border-purple-800">
                        <span className="text-gray-300">Effets sonores</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                        </label>
                    </div>
                </div>

                <div className="flex justify-center space-x-4 pt-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-cyan-400 text-cyan-400 rounded-full font-medium hover:bg-cyan-400 hover:bg-opacity-10 transition-all"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                    >
                        Appliquer
                    </button>
                </div>

                <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full opacity-70"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-500 rounded-full opacity-70"></div>
            </div>
        </Modal>
    );
}

export default SettingsModal;