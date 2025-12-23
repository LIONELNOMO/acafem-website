import { useState } from 'react'
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send,
    MessageCircle,
    CheckCircle
} from 'lucide-react'

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        // Simulation d'envoi
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 5000)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // Numéro WhatsApp de la fondatrice (à remplacer)
    const whatsappNumber = '237600000000'
    const whatsappMessage = encodeURIComponent('Bonjour, je souhaite contacter l\'ACAFEM...')
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="bg-gradient-to-br from-primary-600 to-secondary-600 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Contactez-Nous
                    </h1>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto">
                        Nous sommes à votre écoute. N'hésitez pas à nous contacter
                        pour toute question ou demande d'information.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            {/* WhatsApp CTA */}
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block bg-gradient-to-r from-green-500 to-green-600 rounded-3xl p-8 text-white hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl"
                            >
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                                        <MessageCircle size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">WhatsApp</h3>
                                        <p className="text-white/80">Contactez la Présidente</p>
                                    </div>
                                </div>
                                <p className="text-white/90 mb-4">
                                    Pour une réponse rapide, contactez directement notre Présidente via WhatsApp.
                                </p>
                                <div className="flex items-center text-white font-semibold">
                                    Envoyer un message
                                    <Send size={18} className="ml-2" />
                                </div>
                            </a>

                            {/* Contact Cards */}
                            <div className="bg-white rounded-3xl shadow-lg p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Nos coordonnées</h3>

                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <MapPin className="text-primary-600" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Adresse</h4>
                                            <p className="text-gray-600">
                                                Quartier [Nom du quartier]<br />
                                                Yaoundé, Cameroun
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Phone className="text-secondary-600" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Téléphone</h4>
                                            <p className="text-gray-600">
                                                +237 6XX XXX XXX<br />
                                                +237 6XX XXX XXX
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Mail className="text-accent-600" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Email</h4>
                                            <p className="text-gray-600">
                                                contact@acafem.org<br />
                                                info@acafem.org
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Clock className="text-yellow-600" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Horaires</h4>
                                            <p className="text-gray-600">
                                                Lun - Ven: 8h00 - 17h00<br />
                                                Sam: 9h00 - 13h00
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-3xl shadow-xl p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Envoyez-nous un message
                                </h2>
                                <p className="text-gray-600 mb-8">
                                    Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                                </p>

                                {submitted ? (
                                    <div className="text-center py-12">
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle className="text-green-500" size={40} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Message envoyé !</h3>
                                        <p className="text-gray-600">
                                            Merci pour votre message. Nous vous répondrons très bientôt.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Nom complet *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                    placeholder="Votre nom"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email *
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                    placeholder="votre@email.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Téléphone
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                    placeholder="+237 6XX XXX XXX"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Sujet *
                                                </label>
                                                <select
                                                    name="subject"
                                                    required
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                                                >
                                                    <option value="">Sélectionnez un sujet</option>
                                                    <option value="info">Demande d'information</option>
                                                    <option value="partnership">Partenariat</option>
                                                    <option value="donation">Don / Soutien</option>
                                                    <option value="volunteer">Bénévolat</option>
                                                    <option value="media">Presse / Médias</option>
                                                    <option value="other">Autre</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Message *
                                            </label>
                                            <textarea
                                                name="message"
                                                required
                                                rows={6}
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                                                placeholder="Votre message..."
                                            ></textarea>
                                        </div>

                                        <button type="submit" className="btn-primary w-full py-4 text-lg">
                                            <Send size={20} className="mr-2" />
                                            Envoyer le message
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section (placeholder) */}
            <section className="h-96 bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500">
                            Carte Google Maps<br />
                            (À intégrer avec l'adresse réelle)
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact
