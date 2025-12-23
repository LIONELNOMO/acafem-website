import { useState } from 'react'
import {
    Heart,
    CreditCard,
    Smartphone,
    Shield,
    CheckCircle,
    Users,
    BookOpen,
    Stethoscope,
    ArrowRight
} from 'lucide-react'

const donationAmounts = [5000, 10000, 25000, 50000, 100000]

const impactExamples = [
    { amount: '5 000 FCFA', impact: 'Permet un dépistage gratuit pour une femme' },
    { amount: '10 000 FCFA', impact: 'Finance une consultation prénatale complète' },
    { amount: '25 000 FCFA', impact: 'Offre un kit d\'accouchement sécurisé' },
    { amount: '50 000 FCFA', impact: 'Forme une sage-femme pendant une journée' },
    { amount: '100 000 FCFA', impact: 'Équipe une clinique mobile pour une mission' },
]

function Donate() {
    const [selectedAmount, setSelectedAmount] = useState(10000)
    const [customAmount, setCustomAmount] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('mobile')
    const [donationType, setDonationType] = useState('once')

    const handleAmountSelect = (amount) => {
        setSelectedAmount(amount)
        setCustomAmount('')
    }

    const handleCustomAmount = (e) => {
        setCustomAmount(e.target.value)
        setSelectedAmount(null)
    }

    const currentAmount = customAmount || selectedAmount

    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="bg-gradient-to-br from-accent-500 to-accent-600 py-20 relative overflow-hidden">
                {/* Decorative */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <Heart className="mx-auto text-white/80 mb-6" size={56} />
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Faites un Don
                    </h1>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto">
                        Votre générosité permet à l'ACAFEM de continuer sa mission et d'aider
                        des milliers de femmes camerounaises chaque année.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Donation Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-3xl shadow-xl p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                                    Choisissez votre don
                                </h2>

                                {/* Donation Type */}
                                <div className="mb-8">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Type de don
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setDonationType('once')}
                                            className={`p-4 rounded-xl border-2 transition-all ${donationType === 'once'
                                                    ? 'border-primary-500 bg-primary-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="font-semibold text-gray-900">Don unique</div>
                                            <div className="text-sm text-gray-500">Contribution ponctuelle</div>
                                        </button>
                                        <button
                                            onClick={() => setDonationType('monthly')}
                                            className={`p-4 rounded-xl border-2 transition-all ${donationType === 'monthly'
                                                    ? 'border-primary-500 bg-primary-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="font-semibold text-gray-900">Don mensuel</div>
                                            <div className="text-sm text-gray-500">Soutien régulier</div>
                                        </button>
                                    </div>
                                </div>

                                {/* Amount Selection */}
                                <div className="mb-8">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Montant du don (FCFA)
                                    </label>
                                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
                                        {donationAmounts.map((amount) => (
                                            <button
                                                key={amount}
                                                onClick={() => handleAmountSelect(amount)}
                                                className={`py-3 px-4 rounded-xl font-semibold transition-all ${selectedAmount === amount
                                                        ? 'bg-primary-500 text-white shadow-lg'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {amount.toLocaleString()}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            placeholder="Autre montant"
                                            value={customAmount}
                                            onChange={handleCustomAmount}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                            FCFA
                                        </span>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="mb-8">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Méthode de paiement
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setPaymentMethod('mobile')}
                                            className={`p-4 rounded-xl border-2 flex items-center space-x-4 transition-all ${paymentMethod === 'mobile'
                                                    ? 'border-primary-500 bg-primary-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                                <Smartphone className="text-yellow-600" size={24} />
                                            </div>
                                            <div className="text-left">
                                                <div className="font-semibold text-gray-900">Mobile Money</div>
                                                <div className="text-sm text-gray-500">MTN MoMo, Orange Money</div>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => setPaymentMethod('card')}
                                            className={`p-4 rounded-xl border-2 flex items-center space-x-4 transition-all ${paymentMethod === 'card'
                                                    ? 'border-primary-500 bg-primary-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                                <CreditCard className="text-blue-600" size={24} />
                                            </div>
                                            <div className="text-left">
                                                <div className="font-semibold text-gray-900">Carte bancaire</div>
                                                <div className="text-sm text-gray-500">Visa, Mastercard</div>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                {/* Donor Info (simplified) */}
                                <div className="mb-8">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Vos informations
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Nom complet"
                                            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                        <input
                                            type="tel"
                                            placeholder="Téléphone"
                                            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 sm:col-span-2"
                                        />
                                    </div>
                                </div>

                                {/* Submit */}
                                <button className="w-full btn-primary bg-accent-500 hover:bg-accent-600 py-4 text-lg">
                                    <Heart size={20} className="mr-2" />
                                    Donner {currentAmount?.toLocaleString() || '...'} FCFA
                                    {donationType === 'monthly' && ' / mois'}
                                </button>

                                {/* Security Notice */}
                                <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
                                    <Shield size={16} className="mr-2 text-green-500" />
                                    Paiement 100% sécurisé
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Impact Card */}
                            <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl p-8 text-white">
                                <h3 className="text-xl font-bold mb-6">Votre impact</h3>
                                <div className="space-y-4">
                                    {impactExamples.map((item, index) => (
                                        <div key={index} className="flex items-start space-x-3">
                                            <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-semibold">{item.amount}</div>
                                                <div className="text-white/80 text-sm">{item.impact}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Why Donate */}
                            <div className="bg-white rounded-3xl shadow-lg p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">
                                    Pourquoi nous soutenir ?
                                </h3>
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Users className="text-primary-600" size={20} />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">50 000+ bénéficiaires</div>
                                            <div className="text-sm text-gray-500">Des vies changées grâce à vous</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="w-10 h-10 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Stethoscope className="text-secondary-600" size={20} />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">100+ médecins</div>
                                            <div className="text-sm text-gray-500">Une équipe dévouée</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <BookOpen className="text-accent-600" size={20} />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">Transparence totale</div>
                                            <div className="text-sm text-gray-500">Rapports d'activité publics</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tax info */}
                            <div className="bg-gray-100 rounded-2xl p-6">
                                <h4 className="font-semibold text-gray-900 mb-2">Information fiscale</h4>
                                <p className="text-sm text-gray-600">
                                    L'ACAFEM est une association à but non lucratif.
                                    Un reçu fiscal vous sera envoyé par email.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Donate
