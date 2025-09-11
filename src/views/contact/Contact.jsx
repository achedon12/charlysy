import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Form from "./Form.jsx";
import Coordinates from "./Coordinates.jsx";
import SocialMedia from "./SocialMedia.jsx";

const Contact = () => {
    const { t } = useTranslation();

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
              CONNECTONS-NOUS
            </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Prêt à créer une expérience musicale unique? Discutons de votre prochain événement.
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
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <Form />

                        <div>
                            <Coordinates />
                            <SocialMedia />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;