const Coordinates = () => {
    return (
        <div className="bg-gray-900 bg-opacity-50 rounded-2xl p-8 border border-purple-900 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-purple-400">Coordonnées</h2>

            <div className="space-y-6">
                <div className="flex items-start">
                    <div className="bg-cyan-500 bg-opacity-20 p-3 rounded-full mr-4">
                        <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-200">Téléphone</h3>
                        <p className="text-cyan-400">+33 6 12 34 56 78</p>
                    </div>
                </div>

                <div className="flex items-start">
                    <div className="bg-purple-500 bg-opacity-20 p-3 rounded-full mr-4">
                        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-200">Email</h3>
                        <p className="text-cyan-400">contact@djafrofutur.com</p>
                    </div>
                </div>

                <div className="flex items-start">
                    <div className="bg-yellow-500 bg-opacity-20 p-3 rounded-full mr-4">
                        <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-200">Localisation</h3>
                        <p className="text-gray-300">Paris, France</p>
                        <p className="text-gray-400 text-sm">Disponible pour des événements internationaux</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Coordinates;