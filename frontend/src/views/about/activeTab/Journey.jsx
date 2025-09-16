const Journey = () => {

    const journeyData = [
        {
            year: '2015',
            title: 'Débuts',
            description: 'Premières performances à Dakar, fusion de beats électroniques avec des rhythms sabar.'
        },
        {
            year: '2018',
            title: 'Percée',
            description: 'Sortie de l\'EP "Futur Ancestral" qui a attiré l\'attention internationale.'
        },
        {
            year: '2020',
            title: 'Innovation',
            description: 'Développement de l\'installation sonore "African Cyborg" présentée à Paris et Berlin.'
        },
        {
            year: '2023',
            title: 'Reconnaissance',
            description: 'Performance au festival AfroFuture et collaboration avec des artistes de renom.'
        }
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-cyan-400">Parcours Artistique</h2>

            <div className="relative">
                <div className="border-l-2 border-purple-500 border-dashed ml-4 pl-8 space-y-12">
                    {journeyData.map((item, index) => (
                        <div key={index}>
                            <div
                                className="absolute left-0 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                                <div className="w-4 h-4 bg-black rounded-full"></div>
                            </div>
                            <div className="relative">

                                <h3 className="text-xl font-semibold text-yellow-400">{item.year} - {item.title}</h3>
                                <p className="text-gray-300 mt-2">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Journey;