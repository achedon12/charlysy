const Equipment = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-cyan-400">Setup & Équipement</h2>
            <p className="text-gray-300 mb-8">
                Mon approche combine instruments traditionnels et technologies de pointe pour créer une signature sonore unique.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-purple-400">Instruments Traditionnels</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                            <span className="text-gray-300">Kora (harpe africaine)</span>
                        </li>
                        <li className="flex items-center">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                            <span className="text-gray-300">Djembe & Talking Drum</span>
                        </li>
                        <li className="flex items-center">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                            <span className="text-gray-300">Kalimba modifiée</span>
                        </li>
                        <li className="flex items-center">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                            <span className="text-gray-300">Shekere électronique</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4 text-cyan-400">Technologie Moderne</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                            <span className="text-gray-300">Ableton Live Suite</span>
                        </li>
                        <li className="flex items-center">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                            <span className="text-gray-300">Synthés modulaires Eurorack</span>
                        </li>
                        <li className="flex items-center">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                            <span className="text-gray-300">Contrôleurs MPE</span>
                        </li>
                        <li className="flex items-center">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                            <span className="text-gray-300">Spatialisation 3D audio</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Equipment;