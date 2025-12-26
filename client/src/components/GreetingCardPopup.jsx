import { useState, useEffect } from 'react'
import { X, Sparkles } from 'lucide-react'

function GreetingCardPopup() {
    const [isOpen, setIsOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Vérifie si l'utilisateur a déjà vu la carte aujourd'hui
        const lastSeen = localStorage.getItem('greetingCardSeen')
        const today = new Date().toDateString()

        if (lastSeen !== today) {
            // Petit délai pour une apparition plus naturelle
            const timer = setTimeout(() => {
                setIsOpen(true)
                setTimeout(() => setIsVisible(true), 50)
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleClose = () => {
        setIsVisible(false)
        setTimeout(() => {
            setIsOpen(false)
            // Marquer comme vu pour aujourd'hui
            localStorage.setItem('greetingCardSeen', new Date().toDateString())
        }, 300)
    }

    if (!isOpen) return null

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
                }`}
            onClick={handleClose}
        >
            {/* Overlay avec effet festif */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/90 to-secondary-900/90 backdrop-blur-sm">
                {/* Particules décoratives */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-pulse"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                            }}
                        >
                            <Sparkles
                                size={Math.random() * 20 + 10}
                                className="text-yellow-400/30"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Container de la carte */}
            <div
                className={`relative max-w-2xl w-full transform transition-all duration-500 ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* En-tête festif */}
                <div className="text-center mb-4">
                    <div className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full text-white font-bold shadow-lg animate-bounce">
                        <Sparkles size={20} />
                        <span>🎄 Meilleurs Vœux 2025 ! 🎉</span>
                        <Sparkles size={20} />
                    </div>
                </div>

                {/* Carte de vœux */}
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-white/50">
                    {/* Image de la carte */}
                    <img
                        src="/images/carte de voeux.jpg"
                        alt="Carte de vœux ACAFEM 2025"
                        className="w-full h-auto"
                    />

                    {/* Bouton fermer */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 group"
                        aria-label="Fermer"
                    >
                        <X size={20} className="text-gray-600 group-hover:text-gray-900" />
                    </button>
                </div>

                {/* Message de clôture */}
                <div className="text-center mt-4">
                    <p className="text-white/80 text-sm">
                        Cliquez n'importe où pour fermer
                    </p>
                </div>
            </div>
        </div>
    )
}

export default GreetingCardPopup
