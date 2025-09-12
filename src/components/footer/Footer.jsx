import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {
    FaCalendarAlt, FaEnvelope,
    FaFacebook,
    FaFeather,
    FaHome, FaInfoCircle,
    FaInstagram,
    FaLinkedin,
    FaSoundcloud,
    FaSpotify,
    FaTwitter
} from "react-icons/fa";

const Footer = () => {
    const socialLinks = [
        {
            icon: <FaFacebook/>,
            name: "Facebook",
            url: import.meta.env.VITE_REACT_APP_FACEBOOK_URL,
            color: "hover:text-blue-400"
        },
        {
            icon: <FaInstagram/>,
            name: "Instagram",
            url: import.meta.env.VITE_REACT_APP_INSTAGRAM_URL,
            color: "hover:text-pink-400"
        },
        {
            icon: <FaTwitter/>,
            name: "Twitter",
            url: import.meta.env.VITE_REACT_APP_TWITTER_URL,
            color: "hover:text-blue-300"
        },
        {
            icon: <FaLinkedin/>,
            name: "LinkedIn",
            url: import.meta.env.VITE_REACT_APP_LINKEDIN_URL,
            color: "hover:text-blue-500"
        },
        {
            icon: <FaSpotify/>,
            name: "Spotify",
            url: import.meta.env.VITE_REACT_APP_SPOTIFY_URL,
            color: "hover:text-green-400"
        },
        {
            icon: <FaSoundcloud/>,
            name: "SoundCloud",
            url: import.meta.env.VITE_REACT_APP_SOUNDCLOUD_URL,
            color: "hover:text-orange-400"
        }
    ];

    const {t} = useTranslation();
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const createParticle = () => {
            const particleContainer = document.querySelector('.particle-container');
            if (!particleContainer) return;

            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
            particleContainer.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 5000);
        };

        const particleInterval = setInterval(createParticle, 400);

        return () => clearInterval(particleInterval);
    }, []);

    return (
        <footer className="relative py-16 px-4  overflow-hidden">
            <div className="footer-particle-container absolute inset-0 pointer-events-none z-0"></div>

            <div className="absolute top-10 left-10 w-6 h-6 bg-cyan-400 rounded-full opacity-20 floating-element"></div>
            <div
                className="absolute bottom-20 right-16 w-4 h-4 bg-purple-500 rounded-full opacity-30 floating-element reverse"></div>
            <div
                className="absolute top-1/3 left-1/4 w-3 h-3 bg-yellow-400 rounded-full opacity-40 floating-element"></div>

            <div className="container mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <div className="flex flex-col items-center md:items-start">
                        <div className="relative mb-6">
                            <div className="w-24 h-24 rounded-full border-4 border-cyan-400 p-1 relative">
                                <div className="w-full h-full bg-gray-800 rounded-full overflow-hidden">
                                    <img
                                        src={`${import.meta.env.VITE_REACT_APP_BASE_URL}profile.png`}
                                        alt="Charly Sy"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div
                                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center border-2 border-black">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div
                            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400 mb-2">
                            Charly <span className="text-yellow-400">Sy</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4 text-center md:text-left">DJ, Producteur & Compositeur
                            AfroFuturiste</p>

                        <div className="flex space-x-3">
                            {socialLinks.slice(0, 4).map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-purple-800 hover:border-cyan-400 hover:bg-gradient-to-r hover:from-purple-600 hover:to-cyan-500 transition-all duration-300 transform hover:scale-110 ${social.color}`}
                                    aria-label={`Visit ${social.name}`}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-lg font-semibold mb-6 text-cyan-400 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M4 6h16M4 12h16m-7 6h7"/>
                            </svg>
                            NAVIGATION
                        </h3>
                        <ul className="grid grid-cols-2 gap-4">
                            {[
                                { id: 'home', label: t('header.home'), icon: <FaHome /> },
                                { id: 'poems', label: t('header.poems'), icon: <FaFeather /> },
                                { id: 'about', label: t('header.about'), icon: <FaInfoCircle /> },
                                { id: 'events', label: t('header.events'), icon: <FaCalendarAlt /> },
                                { id: 'contact', label: t('header.contact'), icon: <FaEnvelope /> },
                            ].map((item, index) => (
                                <li key={item.id} className={`flex items-center ${index >= 2 ? 'mt-2' : ''} ${item.id === 'contact' ? 'col-span-2 justify-center md:justify-start' : ''}`}>
                                    <a
                                        href={`${import.meta.env.VITE_REACT_APP_BASE_URL}${item.id === 'home' ? '' : item.id}`}
                                        className="flex items-center text-gray-400 hover:text-cyan-400 transition-all group"
                                        aria-label={item.label}
                                    >
                                        <span className="text-lg mr-3 group-hover:text-cyan-400 transition-all">{item.icon}</span>
                                        <span className="group-hover:underline">{item.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-lg font-semibold mb-6 text-purple-400 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                            </svg>
                            ÉCOUTER
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {socialLinks.slice(4).map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`bg-gray-800 bg-opacity-50 rounded-lg p-3 border border-purple-800 hover:border-cyan-400 transition-all hover:transform hover:scale-105 flex items-center justify-center ${social.color}`}
                                    aria-label={`Visit ${social.name}`}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-lg font-semibold mb-6 text-yellow-400 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                            NEWSLETTER
                        </h3>
                        <p className="text-gray-400 text-sm mb-4 text-center md:text-left">
                            Restez informé des prochains événements et sorties musicales.
                        </p>
                        <div className="flex w-full">
                            <input
                                type="email"
                                placeholder="Votre email"
                                className="flex-grow bg-gray-800 border border-purple-800 rounded-l-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            />
                            <button
                                className="bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-2 rounded-r-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-purple-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-sm mb-4 md:mb-0">
                        <p className="text-cyan-400">© {currentYear} Charly SY. {t('footer.rights')}</p>
                    </div>

                    <div className="flex items-center space-x-6 mb-6 md:mb-0 text-center md:text-left">
                        <a href="#" className="text-cyan-400 hover:text-cyan-400 text-sm transition-all">Mentions
                            légales</a>
                        <a href="#" className="text-cyan-400 hover:text-cyan-400 text-sm transition-all">Politique de
                            confidentialité</a>
                        <a href="#" className="text-cyan-400 hover:text-cyan-400 text-sm transition-all">Conditions
                            d'utilisation</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;