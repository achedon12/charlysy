import {useContext, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {AuthContext} from "@/providers/AuthProvider.jsx";
import {Link, useNavigate} from "react-router-dom";
import {FaDoorOpen, FaHome} from "react-icons/fa";

const Login = () => {
    const {t} = useTranslation();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(async () => {
            try {
                await login(formData.email, formData.password)
                navigate(`${import.meta.env.VITE_REACT_APP_BASE_URL}admin/dashboard`);
            } catch (error) {
                setError(JSON.parse(error.message).message || 'Erreur de connexion');
            } finally {
                setIsLoading(false);
            }
        }, 1500);
    };

    useEffect(() => {
        const createParticle = () => {
            const particleContainer = document.querySelector('.particle-container');
            if (!particleContainer) return;

            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 5 + 3}s`;
            particleContainer.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 8000);
        };

        const particleInterval = setInterval(createParticle, 300);

        return () => clearInterval(particleInterval);
    }, []);

    return (
        <div
            className="min-h-screen bg-black text-white overflow-x-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="particle-container fixed inset-0 pointer-events-none z-0"></div>

            <div
                className="absolute top-1/4 left-1/4 w-6 h-6 bg-cyan-400 rounded-full opacity-20 floating-element"></div>
            <div
                className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-purple-500 rounded-full opacity-30 floating-element reverse"></div>
            <div
                className="absolute top-2/3 left-1/3 w-3 h-3 bg-yellow-400 rounded-full opacity-40 floating-element"></div>

            <div className="max-w-md w-full space-y-8 relative z-10">
                <div className="text-center">
                    <div className="mx-auto w-24 h-24 mb-6 relative">
                        <div
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 animate-pulse"></div>
                        <div className="absolute inset-2 rounded-full bg-black flex items-center justify-center">
                            <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                            </svg>
                        </div>
                    </div>

                    <h2 className="text-3xl uppercase font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                        accès administrateur
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Accédez à votre espace personnel et à du contenu exclusif
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div
                        className="flex flex-col bg-gray-900 bg-opacity-50 rounded-2xl p-6 border border-purple-900 shadow-lg shadow-purple-500/10">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email"
                                       className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                    </svg>
                                    Adresse email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                                    placeholder="votre@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="password"
                                       className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                    </svg>
                                    Mot de passe
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all pr-12"
                                        placeholder="Votre mot de passe"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor"
                                                 viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                            </svg>
                                        ) : (
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor"
                                                 viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="mt-4 text-red-500 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <Link
                            to={`${import.meta.env.VITE_REACT_APP_BASE_URL}`}
                            className="w-full mt-6 py-3 px-4 border border-transparent rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-cyan-500/30 hover:transform hover:scale-105"
                        >
                            <div className="flex items-center justify-center">
                                <FaHome className="mr-2"/>
                                Retour à l'accueil
                            </div>
                        </Link>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full mt-6 py-3 px-4 border border-transparent rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all ${
                                isLoading
                                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-cyan-500/30 hover:transform hover:scale-105'
                            }`}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Connexion en cours...
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <FaDoorOpen className="inline mr-2"/>
                                    Se connecter
                                </div>
                            )}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};

export default Login;