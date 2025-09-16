const Philosophy = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-cyan-400">Philosophie Musicale</h2>
            <p className="text-gray-300 mb-4">
                L'AfroFuturisme n'est pas simplement un genre musical pour moi, c'est une vision du monde où la technologie et la tradition coexistent en harmonie.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl border border-purple-800">
                    <h3 className="text-lg font-semibold mb-3 text-yellow-400">Racines Ancestrales</h3>
                    <p className="text-gray-300">
                        J'incorpore des éléments de musiques traditionnelles africaines, des polyrythmies complexes et des instruments authentiques dans mes compositions.
                    </p>
                </div>
                <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl border border-cyan-800">
                    <h3 className="text-lg font-semibold mb-3 text-cyan-400">Vision Futuriste</h3>
                    <p className="text-gray-300">
                        J'explore les technologies sonores avant-gardistes, la spatialisation audio et les paysages électroniques pour créer des expériences immersives.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Philosophy;