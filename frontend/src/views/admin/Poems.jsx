import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AdminPoems = () => {
    const { t } = useTranslation();
    const [poems, setPoems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPoem, setSelectedPoem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        category: 'future',
        status: 'draft',
        tags: [],
        featured: false
    });

    const mockPoems = [
        {
            id: 1,
            title: "Cosmic Ancestry",
            excerpt: "Dans le sang coule la mémoire des étoiles...",
            content: "Dans le sang coule la mémoire des étoiles,\nChaque cellule un univers qui dévoile...",
            category: "future",
            status: "published",
            tags: ["cosmos", "ancêtres", "futur"],
            featured: true,
            views: 1245,
            likes: 89,
            createdAt: "2023-10-15",
            updatedAt: "2023-10-16"
        },
        {
            id: 2,
            title: "Code Source Ancestral",
            excerpt: "Je décode les algorithmes de mes aïeux...",
            content: "Je décode les algorithmes de mes aïeux,\nDans chaque symbole, leur esprit radieux...",
            category: "tech",
            status: "published",
            tags: ["technologie", "tradition", "cyborg"],
            featured: false,
            views: 876,
            likes: 45,
            createdAt: "2023-09-22",
            updatedAt: "2023-09-22"
        },
        {
            id: 3,
            title: "Métropolis Négritude",
            excerpt: "Des gratte-ciel en terre cuite et en bois sacré...",
            content: "Des gratte-ciel en terre cuite et en bois sacré,\nOù poussent des forêts de baobabs numériques...",
            category: "city",
            status: "draft",
            tags: ["ville", "innovation", "culture"],
            featured: false,
            views: 0,
            likes: 0,
            createdAt: "2023-08-30",
            updatedAt: "2023-09-10"
        },
        {
            id: 4,
            title: "Quantum Nguzo Saba",
            excerpt: "Sept principes quantiques pour naviguer les multivers...",
            content: "Sept principes quantiques pour naviguer les multivers,\nChaque vérité une porte vers l'univers...",
            category: "spiritual",
            status: "published",
            tags: ["spiritualité", "science", "principes"],
            featured: true,
            views: 1567,
            likes: 102,
            createdAt: "2023-07-18",
            updatedAt: "2023-07-20"
        }
    ];

    const categories = [
        { value: 'future', label: 'Futur' },
        { value: 'tech', label: 'Technologie' },
        { value: 'city', label: 'Villes' },
        { value: 'spiritual', label: 'Spiritualité' },
        { value: 'nature', label: 'Nature' },
        { value: 'love', label: 'Amour' }
    ];

    const statuses = [
        { value: 'draft', label: 'Brouillon', color: 'bg-gray-500' },
        { value: 'published', label: 'Publié', color: 'bg-green-500' },
        { value: 'archived', label: 'Archivé', color: 'bg-yellow-500' }
    ];

    useEffect(() => {
        setTimeout(() => {
            setPoems(mockPoems);
            setLoading(false);
        }, 1000);
    }, []);

    const filteredPoems = poems.filter(poem => {
        const matchesSearch = poem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            poem.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            poem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus = filterStatus === 'all' || poem.status === filterStatus;
        const matchesCategory = filterCategory === 'all' || poem.category === filterCategory;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    const handleEdit = (poem) => {
        setSelectedPoem(poem);
        setFormData({
            title: poem.title,
            content: poem.content,
            excerpt: poem.excerpt,
            category: poem.category,
            status: poem.status,
            tags: poem.tags.join(', '),
            featured: poem.featured
        });
        setIsEditing(true);
    };

    const handleCreate = () => {
        setSelectedPoem(null);
        setFormData({
            title: '',
            content: '',
            excerpt: '',
            category: 'future',
            status: 'draft',
            tags: '',
            featured: false
        });
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce poème ?')) {
            setPoems(poems.filter(poem => poem.id !== id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const poemData = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
        };

        if (selectedPoem) {
            setPoems(poems.map(poem =>
                poem.id === selectedPoem.id
                    ? { ...poem, ...poemData, updatedAt: new Date().toISOString().split('T')[0] }
                    : poem
            ));
        } else {
            const newPoem = {
                id: Math.max(...poems.map(p => p.id)) + 1,
                ...poemData,
                views: 0,
                likes: 0,
                createdAt: new Date().toISOString().split('T')[0],
                updatedAt: new Date().toISOString().split('T')[0]
            };
            setPoems([...poems, newPoem]);
        }

        setIsEditing(false);
        setSelectedPoem(null);
    };

    const toggleFeatured = (id) => {
        setPoems(poems.map(poem =>
            poem.id === id
                ? { ...poem, featured: !poem.featured }
                : poem
        ));
    };

    const getStatusColor = (status) => {
        return statuses.find(s => s.value === status)?.color || 'bg-gray-500';
    };

    const getStatusLabel = (status) => {
        return statuses.find(s => s.value === status)?.label || 'Inconnu';
    };

    const getCategoryLabel = (category) => {
        return categories.find(c => c.value === category)?.label || category;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
                    <p className="mt-4 text-gray-400">Chargement des poèmes...</p>
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
                            📝 Gestion des Poèmes
                        </h1>
                        <p className="text-gray-400 mt-2">Créez et gérez vos poèmes AfroFuturistes</p>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="px-4 py-2 bg-gradient-to-r from-green-600 to-cyan-500 rounded-lg font-semibold hover:from-green-700 hover:to-cyan-600 transition-all"
                    >
                        + Nouveau Poème
                    </button>
                </div>
            </div>

            {isEditing ? (
                <div className="bg-gray-900 rounded-xl p-6 border border-purple-900">
                    <h2 className="text-xl font-semibold mb-6 text-cyan-400">
                        {selectedPoem ? 'Modifier le poème' : 'Créer un nouveau poème'}
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
                                    placeholder="Titre du poème"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Catégorie</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                    className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                >
                                    {categories.map(category => (
                                        <option key={category.value} value={category.value}>
                                            {category.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Extrait *</label>
                            <textarea
                                required
                                value={formData.excerpt}
                                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                                rows={2}
                                className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                placeholder="Court extrait du poème"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Contenu *</label>
                            <textarea
                                required
                                value={formData.content}
                                onChange={(e) => setFormData({...formData, content: e.target.value})}
                                rows={8}
                                className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono"
                                placeholder="Contenu complet du poème"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Tags</label>
                                <input
                                    type="text"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                                    className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    placeholder="tag1, tag2, tag3"
                                />
                                <p className="text-xs text-gray-400 mt-1">Séparés par des virgules</p>
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

                            <div className="flex items-center">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.featured}
                                        onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                                        className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500"
                                    />
                                    <span className="text-sm">Poème à la une</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex space-x-4 pt-4">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg font-semibold hover:from-purple-700 hover:to-cyan-600 transition-all"
                            >
                                {selectedPoem ? 'Mettre à jour' : 'Créer le poème'}
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
                                    placeholder="Rechercher par titre, extrait ou tags..."
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
                                <label className="block text-sm font-medium mb-2">Catégorie</label>
                                <select
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                    className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                >
                                    <option value="all">Toutes les catégories</option>
                                    {categories.map(category => (
                                        <option key={category.value} value={category.value}>{category.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                        {[
                            { label: 'Total', value: poems.length, color: 'bg-blue-500' },
                            { label: 'Publiés', value: poems.filter(p => p.status === 'published').length, color: 'bg-green-500' },
                            { label: 'Brouillons', value: poems.filter(p => p.status === 'draft').length, color: 'bg-gray-500' },
                            { label: 'À la une', value: poems.filter(p => p.featured).length, color: 'bg-purple-500' }
                        ].map((stat, index) => (
                            <div key={index} className="bg-gray-900 rounded-xl p-4 border border-purple-900">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-gray-400 text-sm">{stat.label}</p>
                                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                                    </div>
                                    <div className={`${stat.color} p-3 rounded-lg`}>
                                        <span className="text-white text-2xl">📝</span>
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
                                    <th className="text-left py-3 px-4">Titre</th>
                                    <th className="text-left py-3 px-4">Catégorie</th>
                                    <th className="text-left py-3 px-4">Statut</th>
                                    <th className="text-right py-3 px-4">Vues</th>
                                    <th className="text-right py-3 px-4">Likes</th>
                                    <th className="text-right py-3 px-4">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredPoems.map((poem) => (
                                    <tr key={poem.id} className="border-b border-gray-800 hover:bg-gray-800">
                                        <td className="py-3 px-4">
                                            <div className="flex items-center space-x-3">
                                                {poem.featured && (
                                                    <span className="text-yellow-400" title="À la une">⭐</span>
                                                )}
                                                <div>
                                                    <div className="font-semibold">{poem.title}</div>
                                                    <div className="text-sm text-gray-400 line-clamp-1">{poem.excerpt}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                                              {getCategoryLabel(poem.category)}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(poem.status)}`}>
                                              {getStatusLabel(poem.status)}
                                            </span>
                                        </td>
                                        <td className="text-right py-3 px-4">{poem.views}</td>
                                        <td className="text-right py-3 px-4">{poem.likes}</td>
                                        <td className="text-right py-3 px-4">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    onClick={() => toggleFeatured(poem.id)}
                                                    className={`p-1 rounded ${
                                                        poem.featured
                                                            ? 'text-yellow-400 hover:text-yellow-300'
                                                            : 'text-gray-400 hover:text-white'
                                                    }`}
                                                    title={poem.featured ? 'Retirer de la une' : 'Mettre à la une'}
                                                >
                                                    ⭐
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(poem)}
                                                    className="text-cyan-400 hover:text-cyan-300 p-1"
                                                    title="Modifier"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(poem.id)}
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

                            {filteredPoems.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">📝</div>
                                    <h3 className="text-xl font-semibold text-gray-300 mb-2">Aucun poème trouvé</h3>
                                    <p className="text-gray-500">
                                        {searchTerm || filterStatus !== 'all' || filterCategory !== 'all'
                                            ? 'Aucun poème ne correspond à vos critères de recherche.'
                                            : 'Commencez par créer votre premier poème !'
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

export default AdminPoems;