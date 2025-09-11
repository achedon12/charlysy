import {useState} from "react";

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulaire envoyé:', formData);
        setIsSubmitted(true);

        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        }, 3000);
    };

    return (
        <div className="bg-gray-900 bg-opacity-50 rounded-2xl p-8 border border-purple-900">
            <h2 className="text-2xl font-bold mb-6 text-cyan-400">Envoyez un message</h2>

            {isSubmitted ? (
                <div className="bg-green-900 bg-opacity-30 p-6 rounded-xl border border-green-700 text-center">
                    <svg className="w-16 h-16 text-green-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-green-400 mb-2">Message envoyé!</h3>
                    <p className="text-gray-300">Je vous répondrai dans les plus brefs délais.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                Nom complet *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                                placeholder="Votre nom"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                                placeholder="votre@email.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                            Sujet *
                        </label>
                        <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        >
                            <option value="">Sélectionnez un sujet</option>
                            <option value="booking">Réservation pour événement</option>
                            <option value="collaboration">Collaboration musicale</option>
                            <option value="interview">Interview/Média</option>
                            <option value="other">Autre</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                            Message *
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="5"
                            className="w-full bg-gray-800 border border-purple-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                            placeholder="Décrivez votre projet ou demande..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                    >
                        Envoyer le message
                    </button>
                </form>
            )}
        </div>
    );
};

export default Form;