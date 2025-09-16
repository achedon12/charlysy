import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AdminAnalytics = () => {
    const { t } = useTranslation();
    const [timeRange, setTimeRange] = useState('7days');
    const [loading, setLoading] = useState(true);

    const [analyticsData, setAnalyticsData] = useState({
        visitors: { total: 12458, change: 12.5 },
        plays: { total: 89234, change: 24.3 },
        downloads: { total: 15623, change: 8.2 },
        revenue: { total: 8425, change: 18.7 },
        conversion: { rate: 4.2, change: 2.1 }
    });

    const [chartData, setChartData] = useState({
        visitors: [120, 210, 180, 350, 420, 380, 290, 510, 480, 550, 620, 590],
        plays: [520, 630, 710, 580, 820, 930, 750, 1100, 980, 1200, 1350, 1250],
        revenue: [1200, 1500, 1800, 2100, 1900, 2300, 2500, 3200, 2800, 3500, 3800, 4000],
        downloads: [180, 220, 190, 250, 310, 280, 320, 380, 350, 420, 450, 480]
    });

    const [topContent, setTopContent] = useState([
        { id: 1, title: "Sun side of the Moon", plays: 12500, completion: 78, growth: 12 },
        { id: 2, title: "Afro Cosmic Journey", plays: 9800, completion: 65, growth: 8 },
        { id: 3, title: "Digital Ancestry", plays: 8700, completion: 72, growth: 15 },
        { id: 4, title: "Sankofa Beats", plays: 7600, completion: 68, growth: -3 },
        { id: 5, title: "Futuristic Rhythms", plays: 6500, completion: 81, growth: 22 }
    ]);

    const [audienceData, setAudienceData] = useState({
        countries: [
            { country: 'France', users: 4200, percent: 34 },
            { country: 'USA', users: 2800, percent: 22 },
            { country: 'UK', users: 1500, percent: 12 },
            { country: 'Germany', users: 1200, percent: 10 },
            { country: 'Canada', users: 800, percent: 6 }
        ],
        devices: [
            { device: 'Mobile', percent: 62 },
            { device: 'Desktop', percent: 28 },
            { device: 'Tablet', percent: 10 }
        ]
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeRange]);

    const formatNumber = (num) => {
        return new Intl.NumberFormat('fr-FR').format(num);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
    };

    const getChartLabels = () => {
        switch (timeRange) {
            case '7days':
                return ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
            case '30days':
                return ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'];
            case '90days':
                return ['M1', 'M2', 'M3'];
            default:
                return ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
                    <p className="mt-4 text-gray-400">Chargement des analytics...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                    📊 Analytics Dashboard
                </h1>
                <p className="text-gray-400 mt-2">Surveillez les performances de votre contenu</p>
            </div>

            <div className="bg-gray-900 rounded-xl p-4 mb-6 border border-purple-900">
                <div className="flex flex-wrap items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-400">Période:</span>
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="bg-gray-800 border border-purple-800 rounded-lg px-3 py-2 text-white"
                        >
                            <option value="7days">7 derniers jours</option>
                            <option value="30days">30 derniers jours</option>
                            <option value="90days">90 derniers jours</option>
                        </select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="px-3 py-2 bg-gray-800 rounded-lg border border-purple-800 hover:bg-gray-700">
                            Exporter PDF
                        </button>
                        <button className="px-3 py-2 bg-cyan-600 rounded-lg hover:bg-cyan-500">
                            Actualiser
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                {[
                    { title: 'Visiteurs', value: analyticsData.visitors.total, change: analyticsData.visitors.change, icon: '👥', color: 'bg-blue-500' },
                    { title: 'Écoutes', value: analyticsData.plays.total, change: analyticsData.plays.change, icon: '🎵', color: 'bg-purple-500' },
                    { title: 'Téléchargements', value: analyticsData.downloads.total, change: analyticsData.downloads.change, icon: '📥', color: 'bg-cyan-500' },
                    { title: 'Revenus', value: formatCurrency(analyticsData.revenue.total), change: analyticsData.revenue.change, icon: '💰', color: 'bg-green-500' },
                    { title: 'Taux de conversion', value: `${analyticsData.conversion.rate}%`, change: analyticsData.conversion.change, icon: '📊', color: 'bg-yellow-500' }
                ].map((stat, index) => (
                    <div key={index} className="bg-gray-900 rounded-xl p-6 border border-purple-900">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-400 text-sm">{stat.title}</p>
                                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                                <p className={`text-sm mt-2 ${stat.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {stat.change >= 0 ? '↑' : '↓'} {Math.abs(stat.change)}%
                                </p>
                            </div>
                            <div className={`${stat.color} p-3 rounded-lg text-2xl`}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-900 rounded-xl p-6 border border-purple-900">
                    <h2 className="text-xl font-semibold mb-4 text-cyan-400">Visiteurs</h2>
                    <div className="h-64">
                        <div className="flex items-end space-x-1 h-full">
                            {chartData.visitors.slice(0, getChartLabels().length).map((value, index) => (
                                <div key={index} className="flex flex-col items-center flex-1">
                                    <div
                                        className="w-full bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-lg transition-all hover:opacity-80"
                                        style={{ height: `${(value / Math.max(...chartData.visitors)) * 80}%` }}
                                    />
                                    <span className="text-xs text-gray-400 mt-2">{getChartLabels()[index]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 rounded-xl p-6 border border-purple-900">
                    <h2 className="text-xl font-semibold mb-4 text-purple-400">Revenus</h2>
                    <div className="h-64">
                        <div className="flex items-end space-x-1 h-full">
                            {chartData.revenue.slice(0, getChartLabels().length).map((value, index) => (
                                <div key={index} className="flex flex-col items-center flex-1">
                                    <div
                                        className="w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-lg transition-all hover:opacity-80"
                                        style={{ height: `${(value / Math.max(...chartData.revenue)) * 80}%` }}
                                    />
                                    <span className="text-xs text-gray-400 mt-2">{getChartLabels()[index]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-900 rounded-xl p-6 border border-purple-900">
                    <h2 className="text-xl font-semibold mb-4 text-yellow-400">Contenu Populaire</h2>
                    <div className="space-y-4">
                        {topContent.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-lg flex items-center justify-center">
                                        <span className="text-sm font-bold">#{item.id}</span>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-medium truncate">{item.title}</p>
                                        <p className="text-sm text-gray-400">{formatNumber(item.plays)} écoutes</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-semibold">{item.completion}%</div>
                                    <div className={`text-xs ${item.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {item.growth >= 0 ? '+' : ''}{item.growth}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-900 rounded-xl p-6 border border-purple-900">
                    <h2 className="text-xl font-semibold mb-4 text-green-400">Audience</h2>

                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-3">Pays</h3>
                        <div className="space-y-2">
                            {audienceData.countries.map((country, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="text-sm">{country.country}</span>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-20 bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-cyan-500 h-2 rounded-full"
                                                style={{ width: `${country.percent}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-gray-400 w-8">{country.percent}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium mb-3">Appareils</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {audienceData.devices.map((device, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-2xl mb-2">
                                        {device.device === 'Mobile' && '📱'}
                                        {device.device === 'Desktop' && '💻'}
                                        {device.device === 'Tablet' && '📟'}
                                    </div>
                                    <div className="text-lg font-semibold">{device.percent}%</div>
                                    <div className="text-sm text-gray-400">{device.device}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 border border-purple-900">
                <h2 className="text-xl font-semibold mb-4 text-pink-400">Performances Détaillées</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="border-b border-gray-700">
                            <th className="text-left py-3 px-4">Titre</th>
                            <th className="text-right py-3 px-4">Écoutes</th>
                            <th className="text-right py-3 px-4">Taux de completion</th>
                            <th className="text-right py-3 px-4">Revenus</th>
                            <th className="text-right py-3 px-4">Croissance</th>
                        </tr>
                        </thead>
                        <tbody>
                        {topContent.map((item) => (
                            <tr key={item.id} className="border-b border-gray-800 hover:bg-gray-800">
                                <td className="py-3 px-4">{item.title}</td>
                                <td className="text-right py-3 px-4">{formatNumber(item.plays)}</td>
                                <td className="text-right py-3 px-4">
                                    <div className="flex items-center justify-end">
                                        <div className="w-16 bg-gray-700 rounded-full h-2 mr-2">
                                            <div
                                                className="bg-cyan-500 h-2 rounded-full"
                                                style={{ width: `${item.completion}%` }}
                                            />
                                        </div>
                                        {item.completion}%
                                    </div>
                                </td>
                                <td className="text-right py-3 px-4">
                                    {formatCurrency(item.plays * 0.1)}
                                </td>
                                <td className="text-right py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${item.growth >= 0 ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'}`}>
                      {item.growth >= 0 ? '+' : ''}{item.growth}%
                    </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;