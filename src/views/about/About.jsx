import { useState, useEffect } from 'react';
import Philosophy from "./activeTab/Philosophy.jsx";
import Equipment from "./activeTab/Equipment.jsx";
import Journey from "./activeTab/Journey.jsx";
import Bio from "./activeTab/Bio.jsx";

const About = () => {
    const [activeTab, setActiveTab] = useState('bio');

    useEffect(() => {
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 5 + 3}s`;
            document.querySelector('.particle-container')?.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 8000);
        };

        const particleInterval = setInterval(createParticle, 300);

        return () => clearInterval(particleInterval);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden pt-20">
            <div className="particle-container fixed inset-0 pointer-events-none z-0"></div>

            <section className="relative py-16 px-4">
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <div className="ring-container">
                        <div className="ring-ring"></div>
                        <div className="ring-ring delay-1"></div>
                        <div className="ring-ring delay-2"></div>
                    </div>
                </div>

                <div className="text-center z-20 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-purple-500 to-cyan-400">
              VISION AFROFUTURISTE
            </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Là où les rythmes ancestraux rencontrent l'innovation sonore
                    </p>
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

            <section className="py-12 px-4 relative z-10">
                <div className="container mx-auto max-w-5xl">
                    <div className="bg-gray-900 bg-opacity-50 rounded-2xl p-8 border border-purple-900">
                        <div className="flex flex-wrap border-b border-purple-800 mb-8">
                            {[
                                { id: 'bio', label: 'Biographie' },
                                { id: 'philosophy', label: 'Philosophie' },
                                { id: 'equipment', label: 'Équipement' },
                                { id: 'journey', label: 'Parcours' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    className={`py-3 px-6 font-medium text-sm md:text-base ${
                                        activeTab === tab.id
                                            ? 'text-cyan-400 border-b-2 border-cyan-400'
                                            : 'text-gray-400 hover:text-white'
                                    }`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="min-h-[400px]">
                            {activeTab === 'bio' && <Bio />}

                            {activeTab === 'philosophy' && <Philosophy />}

                            {activeTab === 'equipment' && <Equipment />}

                            {activeTab === 'journey' && <Journey />}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4 relative z-10 bg-gradient-to-b from-black to-purple-900 to-20%">
                <div className="container mx-auto max-w-5xl">
                    <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
              CHIFFRES CLÉS
            </span>
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { number: "150+", label: "Mixes créés", icon: "🎛️" },
                            { number: "80+", label: "Événements", icon: "🌟" },
                            { number: "12", label: "Pays visités", icon: "✈️" },
                            { number: "500K+", label: "Streams", icon: "🎧" }
                        ].map((stat, index) => (
                            <div key={index} className="bg-gray-900 bg-opacity-50 rounded-xl p-6 text-center border border-purple-900 hover:border-cyan-400 transition-all">
                                <div className="text-4xl mb-3">{stat.icon}</div>
                                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-cyan-400">{stat.number}</div>
                                <div className="text-gray-400 mt-2">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 relative z-10">
                <div className="container mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-cyan-400">
              PRÊT POUR L'EXPÉRIENCE AFROFUTURISTE?
            </span>
                    </h2>

                    <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
                        Réservez une performance unique qui transportera votre public entre passé et futur.
                    </p>

                    <button className="bg-gradient-to-r from-purple-600 to-cyan-500 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                        Contactez-moi
                    </button>
                </div>
            </section>
        </div>
    );
};

export default About;