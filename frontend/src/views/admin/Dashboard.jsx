import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
    const { t } = useTranslation();
    const [stats, setStats] = useState({
        totalVisitors: 12458,
        totalPlays: 89234,
        totalDownloads: 15623,
        totalRevenue: 8425
    });

    const [analyticsData, setAnalyticsData] = useState({
        visitors: [120, 210, 180, 350, 420, 380, 290],
        plays: [520, 630, 710, 580, 820, 930, 750],
        revenue: [1200, 1500, 1800, 2100, 1900, 2300, 2500]
    });

    const upcomingEvents = [
        { id: 1, name: 'AfroFuture Festival', date: '2023-11-15', location: 'Paris', tickets: 142, capacity: 200 },
        { id: 2, name: 'Nuit Électronique', date: '2023-11-22', location: 'Lyon', tickets: 89, capacity: 150 },
        { id: 3, name: 'Solaris Beach Party', date: '2023-12-05', location: 'Marseille', tickets: 203, capacity: 300 }
    ];

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

        const particleInterval = setInterval(createParticle, 400);

        return () => clearInterval(particleInterval);
    }, []);

    const formatNumber = (num) => {
        return new Intl.NumberFormat('fr-FR').format(num);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
            <div className="particle-container fixed inset-0 pointer-events-none z-0"></div>

            <div className="pt-16 flex">
                <main className="flex-1 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[
                            { title: 'Visiteurs', value: stats.totalVisitors, change: '+12%', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', color: 'bg-blue-500' },
                            { title: 'Écoutes', value: stats.totalPlays, change: '+24%', icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z', color: 'bg-purple-500' },
                            { title: 'Téléchargements', value: stats.totalDownloads, change: '+8%', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4', color: 'bg-cyan-500' },
                            { title: 'Revenus', value: formatCurrency(stats.totalRevenue), change: '+18%', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-green-500' },
                        ].map((stat, index) => (
                            <div key={index} className="bg-gray-900 bg-opacity-50 rounded-xl p-6 border border-purple-900 hover:border-cyan-400 transition-all">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-gray-400 text-sm">{stat.title}</p>
                                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                                        <p className="text-green-400 text-sm mt-2">{stat.change}</p>
                                    </div>
                                    <div className={`${stat.color} p-3 rounded-lg`}>
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gray-900 bg-opacity-50 col-span-3 lg:col-span-1 rounded-xl p-6 border border-purple-900">
                            <h2 className="text-xl font-semibold mb-4 text-cyan-400">Activité du site</h2>
                            <div className="h-64 flex items-end space-x-2">
                                {analyticsData.visitors.map((value, index) => (
                                    <div key={index} className="flex-1 flex flex-col items-center">
                                        <div
                                            className="w-full bg-gradient-to-t from-purple-600 to-cyan-500 rounded-t-lg"
                                            style={{ height: `${value / 10}px` }}
                                        ></div>
                                        <span className="text-xs text-gray-400 mt-2">{['L', 'M', 'M', 'J', 'V', 'S', 'D'][index]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-span-3 lg:col-span-2 bg-gray-900 bg-opacity-50 rounded-xl p-6 border border-purple-900 mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-yellow-400">Événements à venir</h2>
                                <button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-400 transition-all">
                                    + Ajouter un événement
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-gray-800 rounded-lg">
                                    <thead>
                                    <tr>
                                        {['Nom', 'Date', 'Lieu', 'Billets vendus', 'Capacité', 'Actions'].map((header, index) => (
                                            <th key={index} className="px-6 py-3 text-left text-sm font-medium text-gray-400 border-b border-purple-900">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {upcomingEvents.map((event) => (
                                        <tr key={event.id} className="hover:bg-gray-700 transition-all">
                                            <td className="px-6 py-4 whitespace-nowrap">{event.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{new Date(event.date).toLocaleDateString('fr-FR')}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{event.location}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{formatNumber(event.tickets)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{formatNumber(event.capacity)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className="bg-purple-600 px-3 py-1 rounded-lg text-sm hover:bg-purple-500 transition-all mr-2">Éditer</button>
                                                <button className="bg-red-600 px-3 py-1 rounded-lg text-sm hover:bg-red-500 transition-all">Supprimer</button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
export default Dashboard;