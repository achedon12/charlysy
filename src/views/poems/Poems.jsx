import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Poems = () => {
    const { t } = useTranslation();
    const [selectedPoem, setSelectedPoem] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');

    const poems = [
        {
            id: 1,
            title: "Cosmic Ancestry",
            excerpt: "Dans le sang coule la mémoire des étoiles, Chaque cellule un univers qui dévoile...",
            content: `Dans le sang coule la mémoire des étoiles,
Chaque cellule un univers qui dévoile,
Nos ancêtres naviguaient sur des vaisseaux de lumière,
Leur sagesse est notre frontière.

Le futur n'est qu'un passé qui s'ignore,
Notre ADN contient les clés de l'aurore,
Nous sommes les enfants du cosmos et de la terre,
Notre destinée dépasse le mystère.

Les tambours résonnent comme des pulsars lointains,
Nos danses tracent des constellations sans frein,
Demain est hier revisité en technicolor,
L'Afrique future est notre miroir.`,
            category: "future",
            date: "2023-10-15",
            tags: ["cosmos", "ancêtres", "futur"]
        },
        {
            id: 2,
            title: "Code Source Ancestral",
            excerpt: "Je décode les algorithmes de mes aïeux, Dans chaque symbole, leur esprit radieux...",
            content: `Je décode les algorithmes de mes aïeux,
Dans chaque symbole, leur esprit radieux,
Leurs connaissances encryptées dans l'argile,
Deviennent data, deviennent mobiles.

Le griot devient intelligence artificielle,
Sa parole en code source éternelle,
Les masques traditionnels s'animent en hologrammes,
Racontant nos légesses en réseaux sans trames.

Je suis un cyborg aux racines anciennes,
Mes circuits vibrent aux chants terriens,
Ma connexion satellite prie les orishas,
Mon interface honore les Yas.`,
            category: "tech",
            date: "2023-09-22",
            tags: ["technologie", "tradition", "cyborg"]
        },
        {
            id: 3,
            title: "Métropolis Négritude",
            excerpt: "Des gratte-ciel en terre cuite et en bois sacré, Où poussent des forêts de baobabs numériques...",
            content: `Des gratte-ciel en terre cuite et en bois sacré,
Où poussent des forêts de baobabs numériques,
Les rues vibrent au son du djembe électronique,
Et les esprits dansent dans la réalité augmentée.

Ici, le soleil et la lune sont nos panneaux solaires,
Les étoiles guident nos voitures volantes,
L'Afrique n'est plus un continent mais une dimension,
Où le temps s'enroule comme un tissu kente.

Nos langues maternelles deviennent langages de programmation,
Chaque proverbe un code, chaque conte une application,
Nous bâtissons demain avec la sagesse d'hier,
Sans oublier d'où nous venons, sans craindre l'avenir.`,
            category: "city",
            date: "2023-08-30",
            tags: ["ville", "innovation", "culture"]
        },
        {
            id: 4,
            title: "Quantum Nguzo Saba",
            excerpt: "Sept principes quantiques pour naviguer les multivers, Chaque vérité une porte vers l'univers...",
            content: `Sept principes quantiques pour naviguer les multivers,
Chaque vérité une porte vers l'univers,
L'Umoja lie les particules entre elles,
Le Kujichagulia définit notre réalité parallèle.

Ujima, l'effort collectif qui courbe l'espace-temps,
Ujamaa, l'économie qui défie l'entropie pourtant,
Nia, l'intention qui focalise les ondes de possibilité,
Kuumba, la créativité qui génère de nouvelles réalités.

Imani, la foi qui traverse les dimensions,
Voilà nos armes contre les limitations,
Nous sommes les architectes de réalités nouvelles,
Dans le grand ordinateur cosmique, nous sommes éternels.`,
            category: "spiritual",
            date: "2023-07-18",
            tags: ["spiritualité", "science", "principes"]
        },
        {
            id: 5,
            title: "Solar Sister",
            excerpt: "Elle porte le soleil dans ses dreadlocks, Chaque boucle un filament lumineux qui croît...",
            content: `Elle porte le soleil dans ses dreadlocks,
Chaque boucle un filament lumineux qui croît,
Ses yeux sont des galaxies en formation,
Son sourire un arc-en-ciel de création.

Ses mains tissent la lumière en textiles solaires,
Ses pas laissent des empreintes luminaires,
Elle chante et les étoiles se mettent à briller,
Elle danse et les planètes se mettent à vibrer.

Solar Sister, prêtresse du photon,
Guide-nous vers l'âge d'or qui résonne,
Ton corps est un pont entre terre et cosmos,
Ton esprit un aimant qui attire le repos.`,
            category: "future",
            date: "2023-06-12",
            tags: ["féminin", "énergie", "cosmos"]
        },
        {
            id: 6,
            title: "Data Griot",
            excerpt: "Je scroll le parchemin numérique, Swipe left les siècles, right le futur palpable...",
            content: `Je scroll le parchemin numérique,
Swipe left les siècles, right le futur palpable,
Mon tablette est un tambour de communication,
Chaque notification une incantation.

Je stream les sagesses ancestrales en direct,
Like les enseignements des anciens persistents,
Share les contes qui ont traversé les âges,
Download l'espoir pour les prochains passages.

Data Griot, moderne et traditionnel,
Je code l'avenir en gardant l'essentiel,
Ma connexion 6G prie les esprits,
Mon cloud préserve nos récits investis.`,
            category: "tech",
            date: "2023-05-05",
            tags: ["numérique", "tradition", "modernité"]
        }
    ];

    const categories = [
        { id: 'all', label: 'Tous les poèmes' },
        { id: 'future', label: 'Futur' },
        { id: 'tech', label: 'Technologie' },
        { id: 'city', label: 'Villes' },
        { id: 'spiritual', label: 'Spiritualité' }
    ];

    const filteredPoems = activeCategory === 'all'
        ? poems
        : poems.filter(poem => poem.category === activeCategory);

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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

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
              POÈMES AFROFUTURISTES
            </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Voyages poétiques où la tradition africaine rencontre les imaginaires technologiques et cosmiques.
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

            <section className="py-8 px-4 relative z-10 bg-gray-900 bg-opacity-50">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                    activeCategory === category.id
                                        ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 px-4 relative z-10">
                <div className="container mx-auto max-w-6xl">
                    {filteredPoems.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-cyan-400 text-6xl mb-4">📜</div>
                            <h3 className="text-xl font-semibold text-gray-300 mb-2">Aucun poème trouvé</h3>
                            <p className="text-gray-500">Aucun poème ne correspond à cette catégorie.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPoems.map((poem) => (
                                <div
                                    key={poem.id}
                                    className="bg-gray-900 bg-opacity-50 rounded-xl overflow-hidden border border-purple-900 hover:border-cyan-400 transition-all hover:transform hover:scale-105 group cursor-pointer"
                                    onClick={() => setSelectedPoem(poem)}
                                >
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          poem.category === 'future' ? 'bg-yellow-500' :
                              poem.category === 'tech' ? 'bg-cyan-500' :
                                  poem.category === 'city' ? 'bg-purple-500' :
                                      'bg-pink-500'
                                      }`}>
                                        {categories.find(c => c.id === poem.category)?.label}
                                      </span>
                                            <span className="text-xs text-gray-400">{formatDate(poem.date)}</span>
                                        </div>

                                        <h3 className="font-bold text-xl mb-3 text-cyan-300 group-hover:text-cyan-400 transition-colors">
                                            {poem.title}
                                        </h3>

                                        <p className="text-gray-300 text-sm mb-4 italic line-clamp-3">
                                            {poem.excerpt}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {poem.tags.map((tag, index) => (
                                                <span key={index} className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-400">
                                                  #{tag}
                                                </span>
                                            ))}
                                        </div>

                                        <button className="text-cyan-400 text-sm font-medium flex items-center group-hover:text-cyan-300 transition-colors">
                                            Lire la suite
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Modal de lecture de poème */}
            {selectedPoem && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
                    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-cyan-500 relative">
                        <button
                            onClick={() => setSelectedPoem(null)}
                            className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all z-10"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="p-8">
                            <div className="flex items-center justify-between mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedPoem.category === 'future' ? 'bg-yellow-500' :
                        selectedPoem.category === 'tech' ? 'bg-cyan-500' :
                            selectedPoem.category === 'city' ? 'bg-purple-500' :
                                'bg-pink-500'
                                }`}>
                                  {categories.find(c => c.id === selectedPoem.category)?.label}
                                </span>
                                <span className="text-sm text-gray-400">{formatDate(selectedPoem.date)}</span>
                            </div>

                            <h2 className="text-3xl font-bold mb-6 text-cyan-300">{selectedPoem.title}</h2>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {selectedPoem.tags.map((tag, index) => (
                                    <span key={index} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-400">
                                        #{tag}
                                      </span>
                                ))}
                            </div>

                            <div className="poem-content whitespace-pre-line text-lg leading-8 text-gray-300">
                                {selectedPoem.content}
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-800 flex justify-between items-center">
                                <div className="flex space-x-4">
                                    <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
                                    <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Poems;