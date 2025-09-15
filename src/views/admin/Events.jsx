import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AdminEvents = () => {
    const { t } = useTranslation();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterType, setFilterType] = useState('all');

    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        type: 'club',
        status: 'upcoming',
        description: '',
        image: '',
        capacity: 100,
        price: 0,
        ticketsSold: 0,
        featured: false
    });

    const mockEvents = [
        {
            id: 1,
            title: "AfroFuture Festival",
            date: "2023-11-15",
            time: "22:00",
            location: "Le T7, Paris",
            type: "festival",
            status: "upcoming",
            description: "Performance principale au plus grand festival AfroFuturiste d'Europe. Une nuit de vibrations cosmiques et de rhythms ancestraux.",
            image: `${import.meta.env.VITE_REACT_APP_BASE_URL}events/afrofuture-festival.jpg`,
            capacity: 200,
            price: 35,
            ticketsSold: 142,
            featured: true,
            createdAt: "2023-10-01",
            updatedAt: "2023-11-10"
        },
        {
            id: 2,
            title: "Nuit Électronique @ Machine du Moulin Rouge",
            date: "2023-10-28",
            time: "23:30",
            location: "Machine du Moulin Rouge, Paris",
            type: "club",
            status: "upcoming",
            description: "Set spécial de 3 heures dans l'un des clubs les plus iconiques de Paris. Ambiance garantie jusqu'au petit matin.",
            image: `${import.meta.env.VITE_REACT_APP_BASE_URL}events/machine-moulin-rouge.jpg`,
            capacity: 150,
            price: 25,
            ticketsSold: 89,
            featured: false,
            createdAt: "2023-09-15",
            updatedAt: "2023-10-25"
        },
        {
            id: 3,
            title: "Solaris Beach Party",
            date: "2023-10-15",
            time: "16:00",
            location: "Plage de Saint-Malo, Bretagne",
            type: "outdoor",
            status: "past",
            description: "Événement spécial en bord de mer avec des sonorités Afro et des beats électroniques. Sunset session incluse.",
            image: `${import.meta.env.VITE_REACT_APP_BASE_URL}events/solaris-beach.jpg`,
            capacity: 300,
            price: 20,
            ticketsSold: 203,
            featured: true,
            createdAt: "2023-08-20",
            updatedAt: "2023-10-16"
        },
        {
            id: 4,
            title: "Launch Party - Nouvel EP",
            date: "2023-09-30",
            time: "21:00",
            location: "Rex Club, Paris",
            type: "club",
            status: "past",
            description: "Célébration du lancement de mon nouveau EP 'Digital Ancestry'. Set exclusif et surprises.",
            image: `${import.meta.env.VITE_REACT_APP_BASE_URL}events/rex-club.jpg`,
            capacity: 180,
            price: 30,
            ticketsSold: 180,
            featured: false,
            createdAt: "2023-08-10",
            updatedAt: "2023-10-01"
        }
    ];

    const eventTypes = [
        { value: 'festival', label: 'Festival', icon: '🎪' },
        { value: 'club', label: 'Club', icon: '🎵' },
        { value: 'outdoor', label: 'Plein air', icon: '🌅' },
        { value: 'concert', label: 'Concert', icon: '🎸' },
        { value: 'private', label: 'Privé', icon: '🎩' },
        { value: 'online', label: 'En ligne', icon: '💻' }
    ];

    const statuses = [
        { value: 'upcoming', label: 'À venir', color: 'bg-green-500' },
        { value: 'past', label: 'Passé', color: 'bg-gray-500' },
        { value: 'cancelled', label: 'Annulé', color: 'bg-red-500' }
    ];

    useEffect(() => {
        setTimeout(() => {
            setEvents(mockEvents);
            setLoading(false);
        }, 1000);
    }, []);

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
        const matchesType = filterType === 'all' || event.type === filterType;

        return matchesSearch && matchesStatus && matchesType;
    });

    const handleEdit = (event) => {
        setSelectedEvent(event);
        setFormData({
            title: event.title,
            date: event.date,
            time: event.time,
            location: event.location,
            type: event.type,
            status: event.status,
            description: event.description,
            image: event.image,
            capacity: event.capacity,
            price: event.price,
            ticketsSold: event.ticketsSold,
            featured: event.featured
        });
        setIsEditing(true);
    };

    const handleCreate = () => {
        setSelectedEvent(null);
        setFormData({
            title: '',
            date: '',
            time: '20:00',
            location: '',
            type: 'club',
            status: 'upcoming',
            description: '',
            image: '',
            capacity: 100,
            price: 0,
            ticketsSold: 0,
            featured: false
        });
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
            setEvents(events.filter(event => event.id !== id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedEvent) {
            setEvents(events.map(event =>
                event.id === selectedEvent.id
                    ? { ...event, ...formData, updatedAt: new Date().toISOString().split('T')[0] }
                    : event
            ));
        } else {
            const newEvent = {
                id: Math.max(...events.map(e => e.id)) + 1,
                ...formData,
                createdAt: new Date().toISOString().split('T')[0],
                updatedAt: new Date().toISOString().split('T')[0]
            };
            setEvents([...events, newEvent]);
        }

        setIsEditing(false);
        setSelectedEvent(null);
    };

    const toggleFeatured = (id) => {
        setEvents(events.map(event =>
            event.id === id
                ? { ...event, featured: !event.featured }
                : event
        ));
    };

    const getStatusColor = (status) => {
        return statuses.find(s => s.value === status)?.color || 'bg-gray-500';
    };

    const getStatusLabel = (status) => {
        return statuses.find(s => s.value === status)?.label || 'Inconnu';
    };

    const getTypeIcon = (type) => {
        return eventTypes.find(t => t.value === type)?.icon || '🎭';
    };

    const getTypeLabel = (type) => {
        return eventTypes.find(t => t.value === type)?.label || type;
    };

    const calculateOccupancy = (ticketsSold, capacity) => {
        return capacity > 0 ? Math.round((ticketsSold / capacity) * 100) : 0;
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
                    <p className="mt-4 text-gray-400">Chargement des événements...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white p-6">
            <div className="mb-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                            🎪 Gestion des Événements
                        </h1>
                        <p className="text-gray-400 mt-2">Organisez et gérez vos événements musicaux</p>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="px-4 py-2 bg-gradient-to-r from-green-600 to-cyan-500 rounded-lg font-semibold hover:from-green-700 hover:to-cyan-600 transition-all"
                    >
                        + Nouvel Événement
                    </button>
                </div>
            </div>

            {isEditing ? (
                <div className="bg-gray-900 rounded-xl p-6 border border-purple-900">
                    <h2 className="text-xl font-semibold mb-6 text-cyan-400">
                        {selectedEvent ? 'Modifier l\'événement' : 'Créer un nouvel événement'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Titre *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    placeholder="Nom de l'événement"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Type</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                                    className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                >
                                    {eventTypes.map(type => (
                                        <option key={type.value} value={type.value}>
                                            {type.icon} {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Date *</label>
                                <input
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                                    className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Heure *</label>
                                <input
                                    type="time"
                                    required
                                    value={formData.time}
                                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                                    className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Statut</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                                    className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                >
                                    {statuses.map(status => (
                                        <option key={status.value} value={status.value}>
                                            {status.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Lieu *</label>
                            <input
                                type="text"
                                required
                                value={formData.location}
                                onChange={(e) => setFormData({...formData, location: e.target.value})}
                                className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                placeholder="Adresse complète"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Capacité</label>
                                <input
                                    type="number"
                                    value={formData.capacity}
                                    onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
                                    className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    min="1"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Prix (€)</label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                                    className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    min="0"
                                    step="0.5"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Tickets vendus</label>
                                <input
                                    type="number"
                                    value={formData.ticketsSold}
                                    onChange={(e) => setFormData({...formData, ticketsSold: parseInt(e.target.value)})}
                                    className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    min="0"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Description *</label>
                            <textarea
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                rows={4}
                                className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                placeholder="Description complète de l'événement..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">URL de l'image</label>
                            <input
                                type="url"
                                value={formData.image}
                                onChange={(e) => setFormData({...formData, image: e.target.value})}
                                className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>

                        <div className="flex items-center">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={formData.featured}
                                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                                    className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500"
                                />
                                <span className="text-sm">Événement à la une</span>
                            </label>
                        </div>

                        <div className="flex space-x-4 pt-4">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg font-semibold hover:from-purple-700 hover:to-cyan-600 transition-all"
                            >
                                {selectedEvent ? 'Mettre à jour' : 'Créer l\'événement'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-all"
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <>
                    <div className="bg-gray-900 rounded-xl p-6 border border-purple-900 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2">Rechercher</label>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    placeholder="Rechercher par titre, lieu ou description..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Statut</label>
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                >
                                    <option value="all">Tous les statuts</option>
                                    {statuses.map(status => (
                                        <option key={status.value} value={status.value}>{status.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Type</label>
                                <select
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                    className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                >
                                    <option value="all">Tous les types</option>
                                    {eventTypes.map(type => (
                                        <option key={type.value} value={type.value}>{type.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                        {[
                            { label: 'Total', value: events.length, color: 'bg-blue-500' },
                            { label: 'À venir', value: events.filter(e => e.status === 'upcoming').length, color: 'bg-green-500' },
                            { label: 'Passés', value: events.filter(e => e.status === 'past').length, color: 'bg-gray-500' },
                            { label: 'À la une', value: events.filter(e => e.featured).length, color: 'bg-purple-500' }
                        ].map((stat, index) => (
                            <div key={index} className="bg-gray-900 rounded-xl p-4 border border-purple-900">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-gray-400 text-sm">{stat.label}</p>
                                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                                    </div>
                                    <div className={`${stat.color} p-3 rounded-lg`}>
                                        <span className="text-white text-2xl">🎪</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gray-900 rounded-xl p-6 border border-purple-900">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="text-left py-3 px-4">Événement</th>
                                    <th className="text-left py-3 px-4">Date & Heure</th>
                                    <th className="text-left py-3 px-4">Lieu</th>
                                    <th className="text-right py-3 px-4">Tickets</th>
                                    <th className="text-right py-3 px-4">Revenu</th>
                                    <th className="text-right py-3 px-4">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredEvents.map((event) => (
                                    <tr key={event.id} className="border-b border-gray-800 hover:bg-gray-800">
                                        <td className="py-3 px-4">
                                            <div className="flex items-center space-x-3">
                                                {event.featured && (
                                                    <span className="text-yellow-400" title="À la une">⭐</span>
                                                )}
                                                <div>
                                                    <div className="font-semibold">{event.title}</div>
                                                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                                                        <span>{getTypeIcon(event.type)}</span>
                                                        <span>{getTypeLabel(event.type)}</span>
                                                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(event.status)}`}>
                                {getStatusLabel(event.status)}
                              </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="text-sm">
                                                <div>{formatDate(event.date)}</div>
                                                <div className="text-gray-400">{event.time}</div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="text-sm max-w-xs truncate">{event.location}</div>
                                        </td>
                                        <td className="text-right py-3 px-4">
                                            <div className="text-sm">
                                                <div>{event.ticketsSold} / {event.capacity}</div>
                                                <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                                                    <div
                                                        className="bg-cyan-500 h-2 rounded-full"
                                                        style={{ width: `${calculateOccupancy(event.ticketsSold, event.capacity)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-right py-3 px-4">
                                            <div className="text-sm font-semibold">
                                                {formatCurrency(event.ticketsSold * event.price)}
                                            </div>
                                        </td>
                                        <td className="text-right py-3 px-4">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    onClick={() => toggleFeatured(event.id)}
                                                    className={`p-1 rounded ${
                                                        event.featured
                                                            ? 'text-yellow-400 hover:text-yellow-300'
                                                            : 'text-gray-400 hover:text-white'
                                                    }`}
                                                    title={event.featured ? 'Retirer de la une' : 'Mettre à la une'}
                                                >
                                                    ⭐
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(event)}
                                                    className="text-cyan-400 hover:text-cyan-300 p-1"
                                                    title="Modifier"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(event.id)}
                                                    className="text-red-400 hover:text-red-300 p-1"
                                                    title="Supprimer"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            {filteredEvents.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">🎪</div>
                                    <h3 className="text-xl font-semibold text-gray-300 mb-2">Aucun événement trouvé</h3>
                                    <p className="text-gray-500">
                                        {searchTerm || filterStatus !== 'all' || filterType !== 'all'
                                            ? 'Aucun événement ne correspond à vos critères de recherche.'
                                            : 'Commencez par créer votre premier événement !'
                                        }
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminEvents;