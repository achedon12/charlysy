import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AdminSettings = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('general');
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    const [settings, setSettings] = useState({
        general: {
            siteTitle: 'Charly Sy - AfroFuturist',
            siteDescription: 'DJ, Producteur & Compositeur AfroFuturiste',
            adminEmail: 'admin@charlysy.com',
            maintenanceMode: false,
            timezone: 'Europe/Paris'
        },
        content: {
            autoApproveComments: true,
            maxUploadSize: 100,
            allowedFileTypes: ['mp3', 'wav', 'flac', 'jpg', 'png', 'webp'],
            watermarkEnabled: true,
            watermarkText: '© Charly Sy'
        },
        security: {
            twoFactorAuth: true,
            loginAttempts: 5,
            sessionTimeout: 60,
            ipWhitelist: [],
            backupFrequency: 'daily'
        },
        notifications: {
            emailNotifications: true,
            newUserRegistration: true,
            contentApproval: true,
            systemAlerts: true,
            newsletter: false
        },
        integrations: {
            googleAnalytics: 'G-XXXXXXXXXX',
            facebookPixel: 'XXXXXXXXXXXXXXX',
            mailchimpApiKey: '',
            stripeEnabled: true,
            paypalEnabled: false
        }
    });

    const [user, setUser] = useState({
        name: 'Admin User',
        email: 'admin@charlysy.com',
        role: 'Administrator',
        lastLogin: '2023-11-15 14:30:25',
        avatar: `${import.meta.env.VITE_REACT_APP_BASE_URL}admin-avatar.png`
    });

    const [backupHistory, setBackupHistory] = useState([
        { id: 1, date: '2023-11-14 02:00', type: 'Automatic', size: '2.4 GB', status: 'Completed' },
        { id: 2, date: '2023-11-13 02:00', type: 'Automatic', size: '2.3 GB', status: 'Completed' },
        { id: 3, date: '2023-11-12 02:00', type: 'Automatic', size: '2.4 GB', status: 'Failed' },
        { id: 4, date: '2023-11-11 14:30', type: 'Manual', size: '2.5 GB', status: 'Completed' }
    ]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const handleSave = () => {
        setLoading(true);
        setSaved(false);

        setTimeout(() => {
            setLoading(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }, 1000);
    };

    const handleInputChange = (category, field, value) => {
        setSettings(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [field]: value
            }
        }));
    };

    const handleBackupNow = () => {
        setLoading(true);
        setTimeout(() => {
            setBackupHistory(prev => [
                {
                    id: prev.length + 1,
                    date: new Date().toLocaleString('fr-FR'),
                    type: 'Manual',
                    size: '2.6 GB',
                    status: 'Completed'
                },
                ...prev
            ]);
            setLoading(false);
        }, 2000);
    };

    const tabs = [
        { id: 'general', label: 'Général', icon: '⚙️' },
        { id: 'content', label: 'Contenu', icon: '📁' },
        { id: 'security', label: 'Sécurité', icon: '🔒' },
        { id: 'notifications', label: 'Notifications', icon: '🔔' },
        { id: 'integrations', label: 'Intégrations', icon: '🔌' },
        { id: 'backup', label: 'Sauvegarde', icon: '💾' },
        { id: 'user', label: 'Mon Compte', icon: '👤' }
    ];

    const timezones = [
        'Europe/Paris', 'UTC', 'America/New_York', 'America/Los_Angeles',
        'Europe/London', 'Asia/Tokyo', 'Australia/Sydney'
    ];

    const backupFrequencies = [
        { value: 'hourly', label: 'Toutes les heures' },
        { value: 'daily', label: 'Quotidienne' },
        { value: 'weekly', label: 'Hebdomadaire' },
        { value: 'monthly', label: 'Mensuelle' }
    ];

    return (
        <div className="min-h-screen bg-gray-950 text-white p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                    ⚙️ Paramètres Administrateur
                </h1>
                <p className="text-gray-400 mt-2">Gérez les paramètres de votre application</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                    <div className="bg-gray-900 rounded-xl p-4 border border-purple-900 sticky top-6">
                        <nav className="space-y-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all ${
                                        activeTab === tab.id
                                            ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white'
                                            : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                    }`}
                                >
                                    <span className="text-lg">{tab.icon}</span>
                                    <span className="font-medium">{tab.label}</span>
                                </button>
                            ))}
                        </nav>

                        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                            <h3 className="font-semibold text-sm mb-2">Statut du Système</h3>
                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between">
                                    <span>CPU Usage</span>
                                    <span className="text-green-400">24%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Memory</span>
                                    <span className="text-yellow-400">62%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Storage</span>
                                    <span className="text-red-400">87%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <div className="bg-gray-900 rounded-xl p-6 border border-purple-900">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">
                                {tabs.find(tab => tab.id === activeTab)?.icon}{' '}
                                {tabs.find(tab => tab.id === activeTab)?.label}
                            </h2>
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg font-semibold hover:from-purple-700 hover:to-cyan-600 disabled:opacity-50 transition-all"
                            >
                                {loading ? 'Sauvegarde...' : saved ? '✓ Sauvegardé' : 'Enregistrer'}
                            </button>
                        </div>

                        {activeTab === 'general' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Nom du site</label>
                                        <input
                                            type="text"
                                            value={settings.general.siteTitle}
                                            onChange={(e) => handleInputChange('general', 'siteTitle', e.target.value)}
                                            className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Email admin</label>
                                        <input
                                            type="email"
                                            value={settings.general.adminEmail}
                                            onChange={(e) => handleInputChange('general', 'adminEmail', e.target.value)}
                                            className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Description du site</label>
                                    <textarea
                                        value={settings.general.siteDescription}
                                        onChange={(e) => handleInputChange('general', 'siteDescription', e.target.value)}
                                        rows={3}
                                        className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Fuseau horaire</label>
                                        <select
                                            value={settings.general.timezone}
                                            onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
                                            className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        >
                                            {timezones.map(tz => (
                                                <option key={tz} value={tz}>{tz}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex items-center">
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={settings.general.maintenanceMode}
                                                onChange={(e) => handleInputChange('general', 'maintenanceMode', e.target.checked)}
                                                className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500"
                                            />
                                            <span className="text-sm">Mode maintenance</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'content' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Taille max upload (MB)</label>
                                        <input
                                            type="number"
                                            value={settings.content.maxUploadSize}
                                            onChange={(e) => handleInputChange('content', 'maxUploadSize', parseInt(e.target.value))}
                                            className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Types de fichiers autorisés</label>
                                        <input
                                            type="text"
                                            value={settings.content.allowedFileTypes.join(', ')}
                                            onChange={(e) => handleInputChange('content', 'allowedFileTypes', e.target.value.split(',').map(s => s.trim()))}
                                            className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={settings.content.autoApproveComments}
                                            onChange={(e) => handleInputChange('content', 'autoApproveComments', e.target.checked)}
                                            className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500"
                                        />
                                        <span className="text-sm">Approbation automatique des commentaires</span>
                                    </label>

                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={settings.content.watermarkEnabled}
                                            onChange={(e) => handleInputChange('content', 'watermarkEnabled', e.target.checked)}
                                            className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500"
                                        />
                                        <span className="text-sm">Activer le watermark sur les images</span>
                                    </label>
                                </div>

                                {settings.content.watermarkEnabled && (
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Texte du watermark</label>
                                        <input
                                            type="text"
                                            value={settings.content.watermarkText}
                                            onChange={(e) => handleInputChange('content', 'watermarkText', e.target.value)}
                                            className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={settings.security.twoFactorAuth}
                                            onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
                                            className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500"
                                        />
                                        <span className="text-sm">Authentification à deux facteurs</span>
                                    </label>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Tentatives de connexion avant blocage</label>
                                        <input
                                            type="number"
                                            value={settings.security.loginAttempts}
                                            onChange={(e) => handleInputChange('security', 'loginAttempts', parseInt(e.target.value))}
                                            className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Timeout de session (minutes)</label>
                                        <input
                                            type="number"
                                            value={settings.security.sessionTimeout}
                                            onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
                                            className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Fréquence de sauvegarde</label>
                                    <select
                                        value={settings.security.backupFrequency}
                                        onChange={(e) => handleInputChange('security', 'backupFrequency', e.target.value)}
                                        className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    >
                                        {backupFrequencies.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">IP Whitelist (une par ligne)</label>
                                    <textarea
                                        rows={4}
                                        placeholder="192.168.1.1\n10.0.0.1"
                                        className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'backup' && (
                            <div className="space-y-6">
                                <div className="bg-gray-800 rounded-lg p-4">
                                    <h3 className="font-semibold mb-4">Sauvegarde Manuelle</h3>
                                    <p className="text-sm text-gray-400 mb-4">
                                        Créez une sauvegarde manuelle de votre base de données et fichiers.
                                    </p>
                                    <button
                                        onClick={handleBackupNow}
                                        disabled={loading}
                                        className="px-4 py-2 bg-gradient-to-r from-green-600 to-cyan-500 rounded-lg font-semibold hover:from-green-700 hover:to-cyan-600 disabled:opacity-50 transition-all"
                                    >
                                        {loading ? 'Création...' : 'Créer une sauvegarde'}
                                    </button>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-4">Historique des sauvegardes</h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                            <tr className="border-b border-gray-700">
                                                <th className="text-left py-3 px-4">Date</th>
                                                <th className="text-left py-3 px-4">Type</th>
                                                <th className="text-right py-3 px-4">Taille</th>
                                                <th className="text-left py-3 px-4">Statut</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {backupHistory.map((backup) => (
                                                <tr key={backup.id} className="border-b border-gray-800 hover:bg-gray-800">
                                                    <td className="py-3 px-4">{backup.date}</td>
                                                    <td className="py-3 px-4">{backup.type}</td>
                                                    <td className="text-right py-3 px-4">{backup.size}</td>
                                                    <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                  backup.status === 'Completed'
                                      ? 'bg-green-900 text-green-400'
                                      : 'bg-red-900 text-red-400'
                              }`}>
                                {backup.status}
                              </span>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'user' && (
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-full flex items-center justify-center">
                                        <span className="text-2xl font-bold">A</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">{user.name}</h3>
                                        <p className="text-gray-400">{user.role}</p>
                                        <p className="text-sm text-gray-500">Dernière connexion: {user.lastLogin}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Nom complet</label>
                                        <input
                                            type="text"
                                            value={user.name}
                                            onChange={(e) => setUser({...user, name: e.target.value})}
                                            className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={user.email}
                                            onChange={(e) => setUser({...user, email: e.target.value})}
                                            className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Nouveau mot de passe</label>
                                    <input
                                        type="password"
                                        placeholder="Laisser vide pour ne pas changer"
                                        className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Confirmation du mot de passe</label>
                                    <input
                                        type="password"
                                        placeholder="Confirmez le nouveau mot de passe"
                                        className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;