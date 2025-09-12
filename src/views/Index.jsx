import { useEffect } from 'react';
import {useMusic} from "@/providers/MusicProvider.jsx";

const Index = () => {

    const { isPlaying, togglePlayPause } = useMusic()

    const mixes = [
        { id: 1, title: "Afro Cosmic Journey", duration: "58:22", plays: "24.5k" },
        { id: 2, title: "Futuristic Rhythms", duration: "45:18", plays: "18.9k" },
        { id: 3, title: "Sankofa Beats", duration: "51:07", plays: "32.1k" },
        { id: 4, title: "Digital Ancestry", duration: "49:33", plays: "27.4k" },
    ];

    useEffect(() => {
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 5 + 3}s`;
            document.querySelector('.particle-container').appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 8000);
        };

        const particleInterval = setInterval(createParticle, 300);

        return () => clearInterval(particleInterval);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            <div className="particle-container fixed inset-0 pointer-events-none z-0"></div>

            <section className="relative min-h-screen flex items-center justify-center pt-20 px-4">
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <div className="ring-container">
                        <div className="ring-ring"></div>
                        <div className="ring-ring delay-1"></div>
                        <div className="ring-ring delay-2"></div>
                    </div>
                </div>

                <div className="text-center z-20 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-purple-500 to-cyan-400 animate-pulse">
                          AFROFUTURIST
                        </span>
                        <span className="block mt-2">SOUND EXPERIENCE</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Voyagez à travers les dimensions sonores où les rythmes ancestraux rencontrent les technologies futures.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <button
                            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full font-semibold text-lg flex items-center hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                            onClick={togglePlayPause}
                            name={isPlaying ? "Pause music" : "Play music"}
                            aria-label={isPlaying ? "Pause music" : "Play music"}
                        >
                            {isPlaying ? (
                                <div className="uppercase flex items-center">
                                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    pause
                                </div>
                            ) : (
                                <div className="uppercase flex items-center">
                                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    écouter
                                </div>
                            )}
                        </button>
                    </div>
                </div>

                <div className="absolute bottom-10 left-10 z-10 floating-element">
                    <div className="w-4 h-4 bg-cyan-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full ml-6 mt-2"></div>
                </div>

                <div className="absolute top-20 right-10 z-10 floating-element reverse">
                    <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full ml-4 mt-3"></div>
                </div>
            </section>

            <section className="py-20 px-4 relative z-10">
                <div className="container mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
              MIXES POPULAIRES
            </span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {mixes.map((mix, index) => (
                            <div
                                key={mix.id}
                                className="bg-gray-900 bg-opacity-50 rounded-xl p-6 border border-purple-900 hover:border-cyan-400 transition-all hover:transform hover:scale-105 group"
                            >
                                <div className="relative mb-4">
                                    <div className="aspect-square bg-gradient-to-br from-purple-700 to-cyan-600 rounded-lg flex items-center justify-center">
                                        <div className="w-16 h-16 bg-black bg-opacity-40 rounded-full flex items-center justify-center group-hover:bg-cyan-500 group-hover:bg-opacity-20 transition-all">
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded text-xs">
                                        {mix.duration}
                                    </div>
                                </div>

                                <h3 className="font-semibold text-lg mb-2 group-hover:text-cyan-400 transition-all">{mix.title}</h3>

                                <div className="flex justify-between items-center text-sm text-gray-400">
                                    <span>{mix.plays} plays</span>
                                    <button
                                        className="text-cyan-400 hover:text-cyan-300 flex items-center"
                                        aria-label={`Download ${mix.title} mix`}
                                        name={`Download ${mix.title} mix`}
                                    >

                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Download
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 relative z-10 bg-gradient-to-b from-black to-purple-900 to-20%">
                <div className="container mx-auto flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <div className="relative">
                            <div className="rounded-full border-4 border-cyan-400 p-2 w-64 h-64 mx-auto">
                                <div className="w-full h-full bg-gray-700 rounded-full overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-br from-purple-700 to-cyan-600 flex items-center justify-center">
                                        <img src={`${import.meta.env.VITE_REACT_APP_BASE_URL}profile.png`} alt="Charly SY" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -bottom-4 -left-4 bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center border-2 border-black">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                </svg>
                            </div>

                            <div className="absolute -top-4 -right-4 bg-cyan-500 rounded-full w-16 h-16 flex items-center justify-center border-2 border-black">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2 md:pl-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-cyan-400">
                            RÉINVENTER LES SONORITÉS
                          </span>
                        </h2>

                        <p className="text-gray-300 mb-6">
                            Mon art est un pont entre les rythmes ancestraux africains et les paysages sonores futuristes. Chaque mix est une narration, un voyage à travers le temps et l'espace où la tradition rencontre l'innovation.
                        </p>

                        <p className="text-gray-300 mb-8">
                            Inspiré par les grands maîtres de l'Afrobeat et les visionnaires de l'électronique, je crée des expériences auditives qui transcendent les frontières et définissent une nouvelle ère musicale.
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex items-center">
                                <div className="bg-cyan-500 bg-opacity-20 p-3 rounded-full mr-3">
                                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-bold text-lg">150+</div>
                                    <div className="text-sm text-gray-400">Mixes créés</div>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="bg-purple-500 bg-opacity-20 p-3 rounded-full mr-3">
                                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-bold text-lg">80+</div>
                                    <div className="text-sm text-gray-400">Événements</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Index;