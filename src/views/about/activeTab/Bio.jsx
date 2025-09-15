const Bio = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <h2 className="text-2xl font-bold mb-6 text-cyan-400">Origines & Inspiration</h2>
                <p className="text-gray-300 mb-4">
                    Né à Dakar et élevé entre Paris et Lagos, mon parcours musical puise ses racines dans les rhythms
                    traditionnels ouest-africains et les sonorités électroniques contemporaines.
                </p>
                <p className="text-gray-300 mb-4">
                    Mon pseudonyme <span className="text-purple-400">"AfroFutur"</span> incarne cette fusion entre
                    l'héritage culturel africain et une vision avant-gardiste de la musique.
                </p>
                <p className="text-gray-300">
                    Chaque performance est une invitation à voyager à travers le temps et l'espace, où les tambours
                    djembe dialoguent avec les synthés modulaires.
                </p>
            </div>
            <div className="flex items-center justify-center">
                <div className="relative">
                    <div className="rounded-xl border-4 border-cyan-400 p-2 w-full max-w-xs">
                        <div className="w-full h-64 bg-gray-700 rounded-lg overflow-hidden">
                            <div
                                className="w-full h-full bg-gradient-to-br from-purple-700 to-cyan-600 flex items-center justify-center">
                                <img src={`${import.meta.env.VITE_REACT_APP_BASE_URL}profile.webp`} alt="Charly SY" className="object-cover w-full h-full"/>
                            </div>
                        </div>
                    </div>

                    <div
                        className="absolute -bottom-4 -left-4 bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center border-2 border-black">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                        </svg>
                    </div>

                    <div
                        className="absolute -top-4 -right-4 bg-cyan-500 rounded-full w-16 h-16 flex items-center justify-center border-2 border-black">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M13 10V3L4 14h7v7l9-11h-7z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Bio;