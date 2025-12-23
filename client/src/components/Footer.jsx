import { Link } from 'react-router-dom'
import {
    MapPin,
    Phone,
    Mail,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Heart,
    ArrowUp
} from 'lucide-react'

const quickLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'À Propos', path: '/a-propos' },
    { name: 'Nos Projets', path: '/projets' },
    { name: 'Actualités', path: '/actualites' },
    { name: 'Forum', path: '/forum' },
    { name: 'Contact', path: '/contact' },
]

const services = [
    'Santé Reproductive',
    'Éducation à la Santé',
    'Plaidoyer',
    'Formations Médicales',
    'Campagnes de Sensibilisation',
]

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* About Column */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="bg-white p-1.5 rounded-full shadow-lg">
                                <img
                                    src="/images/logo acafem.jpeg"
                                    alt="ACAFEM"
                                    className="h-16 w-16 rounded-full object-contain"
                                />
                            </div>
                            <div>
                                <h3 className="font-heading font-bold text-xl text-white">ACAFEM</h3>
                                <p className="text-sm text-gray-400">Depuis 1990</p>
                            </div>
                        </div>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            L'Association Camerounaise des Femmes Médecins œuvre à l'amélioration
                            de la santé reproductive et sexuelle des populations camerounaises.
                        </p>
                        <div className="flex space-x-3">
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors">
                                <Linkedin size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors">
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-heading font-bold text-lg mb-6 text-white">Liens Rapides</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-primary-400 transition-colors flex items-center"
                                    >
                                        <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-heading font-bold text-lg mb-6 text-white">Nos Services</h4>
                        <ul className="space-y-3">
                            {services.map((service) => (
                                <li key={service} className="text-gray-400 flex items-center">
                                    <span className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></span>
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-heading font-bold text-lg mb-6 text-white">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <MapPin size={20} className="text-primary-400 flex-shrink-0 mt-1" />
                                <span className="text-gray-400">Yaoundé, Cameroun</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone size={20} className="text-primary-400 flex-shrink-0" />
                                <span className="text-gray-400">+237 6XX XXX XXX</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={20} className="text-primary-400 flex-shrink-0" />
                                <span className="text-gray-400">contact@acafem.org</span>
                            </li>
                        </ul>
                        <Link
                            to="/don"
                            className="mt-6 inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold rounded-lg hover:from-accent-600 hover:to-accent-700 transition-all shadow-lg"
                        >
                            <Heart size={18} className="mr-2" />
                            Soutenez-nous
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <p className="text-gray-500 text-sm text-center md:text-left">
                            © {new Date().getFullYear()} ACAFEM - Association Camerounaise des Femmes Médecins.
                            Tous droits réservés.
                        </p>
                        <button
                            onClick={scrollToTop}
                            className="mt-4 md:mt-0 w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                        >
                            <ArrowUp size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
