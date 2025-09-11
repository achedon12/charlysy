import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

const Events = () => {
    const {t} = useTranslation();
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedEvent, setSelectedEvent] = useState(null);

    const events = [
        {
            id: 1,
            title: "AfroFuture Festival",
            date: "2023-11-15",
            time: "22:00",
            location: "Le T7, Paris",
            type: "festival",
            image: "https://images.unsplash.com/photo-1501281667305-0d4e0ab2b75f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            description: "Performance principale au plus grand festival AfroFuturiste d'Europe. Une nuit de vibrations cosmiques et de rhythms ancestraux.",
            status: "upcoming"
        },
        {
            id: 2,
            title: "Nuit Électronique @ Machine du Moulin Rouge",
            date: "2023-10-28",
            time: "23:30",
            location: "Machine du Moulin Rouge, Paris",
            type: "club",
            image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            description: "Set spécial de 3 heures dans l'un des clubs les plus iconiques de Paris. Ambiance garantie jusqu'au petit matin.",
            status: "upcoming"
        },
        {
            id: 3,
            title: "Solaris Beach Party",
            date: "2023-10-15",
            time: "16:00",
            location: "Plage de Saint-Malo, Bretagne",
            type: "outdoor",
            image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            description: "Événement spécial en bord de mer avec des sonorités Afro et des beats électroniques. Sunset session incluse.",
            status: "upcoming"
        },
        {
            id: 4,
            title: "Launch Party - Nouvel EP",
            date: "2023-09-30",
            time: "21:00",
            location: "Rex Club, Paris",
            type: "club",
            image: "https://images.unsplash.com/photo-1566417713940-fe5c5d098774?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            description: "Célébration du lancement de mon nouveau EP 'Digital Ancestry'. Set exclusif et surprises.",
            status: "past"
        },
        {
            id: 5,
            title: "AfroTech Conference",
            date: "2023-09-15",
            time: "19:00",
            location: "Station F, Paris",
            type: "special",
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            description: "Performance live lors de la conférence annuelle sur la technologie et la culture africaine.",
            status: "past"
        },
        {
            id: 6,
            title: "Nuits Sonores Lyon",
            date: "2023-08-20",
            time: "20:00",
            location: "La Sucrière, Lyon",
            type: "festival",
            image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            description: "Participation à l'un des festivals de musique électronique les plus prestigieux de France.",
            status: "past"
        }
    ];

    const eventTypes = [
        {id: 'all', label: 'Tous les événements'},
        {id: 'upcoming', label: 'À venir'},
        {id: 'past', label: 'Passés'},
        {id: 'festival', label: 'Festivals'},
        {id: 'club', label: 'Clubs'},
        {id: 'outdoor', label: 'Plein air'},
        {id: 'special', label: 'Événements spéciaux'}
    ];

    const filteredEvents = selectedFilter === 'all'
        ? events
        : events.filter(event =>
            event.type === selectedFilter || event.status === selectedFilter
        );

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

    const getEventTypeColor = (type) => {
        switch (type) {
            case 'festival':
                return 'bg-yellow-500';
            case 'club':
                return 'bg-purple-500';
            case 'outdoor':
                return 'bg-green-500';
            case 'special':
                return 'bg-pink-500';
            default:
                return 'bg-cyan-500';
        }
    };

    const getStatusColor = (status) => {
        return status === 'upcoming' ? 'bg-green-500' : 'bg-gray-500';
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
            <span
                className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-purple-500 to-cyan-400">
              ÉVÉNEMENTS
            </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Découvrez où je me produis prochainement et revivez les moments forts des événements passés.
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
                        {eventTypes.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setSelectedFilter(type.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                    selectedFilter === type.id
                                        ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                {type.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 px-4 relative z-10">
                <div className="container mx-auto max-w-6xl">
                    {filteredEvents.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-cyan-400 text-6xl mb-4">🌌</div>
                            <h3 className="text-xl font-semibold text-gray-300 mb-2">Aucun événement trouvé</h3>
                            <p className="text-gray-500">Aucun événement ne correspond à vos filtres.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="bg-gray-900 bg-opacity-50 rounded-xl overflow-hidden border border-purple-900 hover:border-cyan-400 transition-all hover:transform hover:scale-105 group cursor-pointer"
                                    onClick={() => setSelectedEvent(event)}
                                >
                                    <div className="relative overflow-hidden h-48">
                                        <div
                                            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                            style={{backgroundImage: `url(${event.image})`}}
                                        ></div>
                                        <div
                                            className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${getEventTypeColor(event.type)}`}>
                                            {event.type}
                                            </span>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}>
                                            {event.status === 'upcoming' ? 'À venir' : 'Passé'}
                                          </span>
                                        </div>
                                        <div className="absolute bottom-4 left-4">
                                            <h3 className="font-bold text-xl">{event.title}</h3>
                                            <p className="text-cyan-400 text-sm">{event.location}</p>
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center text-sm text-gray-400">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor"
                                                     viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                                </svg>
                                                {formatDate(event.date)}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-400">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor"
                                                     viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                                {event.time}
                                            </div>
                                        </div>

                                        <p className="text-gray-300 text-sm line-clamp-2">
                                            {event.description}
                                        </p>

                                        {event.status === 'upcoming' && (
                                            <button
                                                className="w-full mt-4 bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                                                Réserver des places
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
                    <div
                        className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-cyan-500">
                        <div className="relative h-64">
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{backgroundImage: `url(${selectedEvent.image})`}}
                            ></div>
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                            <div className="absolute bottom-4 left-4">
                                <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
                                <p className="text-cyan-400">{selectedEvent.location}</p>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex flex-wrap gap-4 mb-6">
                                <div className="flex items-center">
                                    <div className="bg-cyan-500 bg-opacity-20 p-2 rounded-full mr-2">
                                        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-400">Date</div>
                                        <div className="font-medium">{formatDate(selectedEvent.date)}</div>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="bg-purple-500 bg-opacity-20 p-2 rounded-full mr-2">
                                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-400">Heure</div>
                                        <div className="font-medium">{selectedEvent.time}</div>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="bg-yellow-500 bg-opacity-20 p-2 rounded-full mr-2">
                                        <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-400">Type</div>
                                        <div className="font-medium capitalize">{selectedEvent.type}</div>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold mb-3 text-cyan-400">Description</h3>
                            <p className="text-gray-300 mb-6">{selectedEvent.description}</p>

                            {selectedEvent.status === 'upcoming' && (
                                <button
                                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                                    Réserver maintenant
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Events;