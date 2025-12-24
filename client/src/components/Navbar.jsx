import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Heart, User } from 'lucide-react'

const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'À Propos', path: '/a-propos' },
    { name: 'Projets', path: '/projets' },
    { name: 'Actualités', path: '/actualites' },
    { name: 'Forum', path: '/forum' },
    { name: 'Contact', path: '/contact' },
]

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-4">
                        <div className="bg-white p-1.5 rounded-full shadow-lg border-2 border-primary-200">
                            <img
                                src="/images/logo acafem.jpeg"
                                alt="ACAFEM Logo"
                                className="h-16 w-16 rounded-full object-contain"
                            />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className={`font-heading font-bold text-2xl tracking-tight ${scrolled ? 'text-primary-700' : 'text-white'}`}>
                                ACAFEM
                            </h1>
                            <p className={`text-xs font-medium uppercase tracking-wider ${scrolled ? 'text-gray-500' : 'text-white/90'}`}>
                                Femmes Médecins du Cameroun
                            </p>
                        </div>
                    </Link>
                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${location.pathname === link.path
                                    ? 'bg-primary-500 text-white'
                                    : scrolled
                                        ? 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <Link
                            to="/connexion"
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${scrolled ? 'text-gray-700 hover:bg-primary-50' : 'text-white/90 hover:bg-white/10'
                                }`}
                        >
                            <User size={18} />
                            <span>Connexion</span>
                        </Link>
                        <Link to="/don" className="btn-primary flex items-center space-x-2">
                            <Heart size={18} />
                            <span>Faire un Don</span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`lg:hidden p-2 rounded-lg ${scrolled ? 'text-gray-700' : 'text-white'}`}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="lg:hidden bg-white rounded-2xl shadow-xl mt-2 p-4 animate-in slide-in-from-top">
                        <div className="flex flex-col space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`px-4 py-3 rounded-lg font-medium transition-all ${location.pathname === link.path
                                        ? 'bg-primary-500 text-white'
                                        : 'text-gray-700 hover:bg-primary-50'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <hr className="my-2" />
                            <Link
                                to="/connexion"
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-primary-50 flex items-center"
                            >
                                <User size={18} className="mr-2" />
                                Connexion
                            </Link>
                            <Link
                                to="/don"
                                onClick={() => setIsOpen(false)}
                                className="btn-primary justify-center"
                            >
                                <Heart size={18} className="mr-2" />
                                Faire un Don
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
