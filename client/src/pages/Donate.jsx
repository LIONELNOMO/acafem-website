import { Link } from 'react-router-dom'
import {
    Heart,
    Users,
    GraduationCap,
    Baby,
    Shield,
    Leaf,
    Globe,
    Smartphone,
    TrendingUp,
    CheckCircle,
    CreditCard,
    Calendar,
    BookOpen,
    Target,
    HeartHandshake,
    Share2,
    Award,
    Building2
} from 'lucide-react'

// Impacts des dons
const impactCategories = [
    {
        title: "Pour les Femmes Médecins",
        icon: <Users className="w-8 h-8" />,
        color: "primary",
        impacts: [
            { text: "Formation de 500 femmes médecins sur le leadership", number: "500" },
            { text: "Formation de 500 étudiantes en fin de cycle", number: "500" },
            { text: "Mentorat pour 50 jeunes professionnelles", number: "50" },
            { text: "Organisation de 2 congrès nationaux", number: "2" },
            { text: "Publication du Manuel sur le leadership des femmes en santé", number: "1" }
        ]
    },
    {
        title: "Pour la Population",
        icon: <Heart className="w-8 h-8" />,
        color: "red",
        impacts: [
            { text: "Réduction de la mortalité maternelle et infantile", icon: <Baby size={16} /> },
            { text: "Amélioration de la santé reproductive", icon: <Heart size={16} /> },
            { text: "Lutte contre les violences faites aux femmes", icon: <Shield size={16} /> },
            { text: "Actions face au changement climatique", icon: <Leaf size={16} /> }
        ]
    },
    {
        title: "Pour la Profession",
        icon: <Award className="w-8 h-8" />,
        color: "secondary",
        impacts: [
            { text: "Création du Répertoire en ligne des Femmes Médecins", icon: <Globe size={16} /> },
            { text: "Plaidoyer pour combler l'écart salarial de 24%", icon: <TrendingUp size={16} /> },
            { text: "Accès aux technologies numériques", icon: <Smartphone size={16} /> },
            { text: "Représentation féminine : de 25% à 50% aux postes de direction", icon: <Target size={16} /> }
        ]
    }
]

// Options de don
const donationOptions = [
    {
        title: "Don Ponctuel",
        description: "Un geste unique pour soutenir nos actions immédiates.",
        icon: <CreditCard className="w-10 h-10 text-primary-500" />,
        cta: "Faire un don"
    },
    {
        title: "Don Mensuel",
        description: "Un soutien régulier pour nous permettre de planifier sur le long terme.",
        icon: <Calendar className="w-10 h-10 text-secondary-500" />,
        cta: "Devenir donateur mensuel"
    },
    {
        title: "Parrainage Formation",
        description: "Financez directement la formation d'une femme médecin ou étudiante.",
        icon: <GraduationCap className="w-10 h-10 text-yellow-500" />,
        cta: "Parrainer une formation"
    },
    {
        title: "Soutien à un Projet",
        description: "Choisissez un axe stratégique spécifique à soutenir.",
        icon: <Target className="w-10 h-10 text-accent-500" />,
        cta: "Choisir un projet"
    }
]

// Autres formes de soutien
const otherSupport = [
    { icon: <Users size={24} />, title: "Devenir membre actif", desc: "Rejoignez notre réseau de femmes médecins engagées." },
    { icon: <Building2 size={24} />, title: "Partenariat institutionnel", desc: "Entreprises et organisations, collaborons ensemble." },
    { icon: <BookOpen size={24} />, title: "Offrir votre expertise", desc: "Mentorat, formation, conseil... Partagez vos compétences." },
    { icon: <Share2 size={24} />, title: "Partager nos actions", desc: "Relayez nos actualités sur vos réseaux sociaux." }
]

function Donate() {
    return (
        <div className="pt-20 bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-secondary-600 py-24 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1600&h=900&fit=crop')] bg-cover bg-center opacity-10"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-8">
                        <Heart className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Soutenez l'ACAFEM</h1>
                    <p className="text-xl md:text-2xl text-primary-100 leading-relaxed max-w-3xl mx-auto">
                        "Votre soutien permet à l'ACAFEM de poursuivre ses missions au service de la santé des femmes camerounaises et du leadership féminin en santé."
                    </p>
                </div>
            </section>

            {/* Section 1: Pourquoi nous soutenir */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Impact de votre don</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Pourquoi nous soutenir ?</h2>
                        <div className="w-24 h-1 bg-secondary-500 mx-auto rounded-full mt-4"></div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {impactCategories.map((cat, idx) => (
                            <div key={idx} className={`bg-white rounded-3xl p-8 shadow-lg border-t-4 border-${cat.color}-500 hover:shadow-xl transition-shadow`}>
                                <div className={`inline-flex items-center justify-center w-16 h-16 bg-${cat.color}-100 text-${cat.color}-600 rounded-2xl mb-6`}>
                                    {cat.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-6">{cat.title}</h3>
                                <ul className="space-y-4">
                                    {cat.impacts.map((impact, i) => (
                                        <li key={i} className="flex items-start">
                                            <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-${cat.color}-100 text-${cat.color}-600 mr-3`}>
                                                {impact.number ? (
                                                    <span className="text-xs font-bold">{impact.number}</span>
                                                ) : (
                                                    impact.icon
                                                )}
                                            </div>
                                            <span className="text-gray-600 text-sm">{impact.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 2: Comment contribuer */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-secondary-600 font-semibold text-sm uppercase tracking-wider">Faites la différence</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Comment contribuer ?</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {donationOptions.map((option, idx) => (
                            <div key={idx} className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-primary-50 transition-colors group cursor-pointer border border-gray-100">
                                <div className="mb-4 group-hover:scale-110 transition-transform">
                                    {option.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{option.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                                <button className="w-full py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors">
                                    {option.cta}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Transparence */}
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold mb-4 flex items-center">
                                    <CheckCircle className="mr-3 text-green-400" size={28} />
                                    Notre engagement de transparence
                                </h3>
                                <ul className="space-y-3 text-gray-300">
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                                        Association dotée de l'autonomie financière
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                                        Présence d'une Commissaire aux Comptes élue
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                                        Rapport financier annuel disponible sur demande
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                                        100% de vos dons servent nos missions
                                    </li>
                                </ul>
                            </div>
                            <div className="flex-shrink-0 text-center">
                                <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Award className="w-16 h-16 text-yellow-400" />
                                </div>
                                <p className="text-sm text-gray-400">Depuis 1991</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Autres formes de soutien */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Autres formes de soutien</h2>
                        <p className="text-gray-600 mt-2">Pas seulement financier... Votre engagement compte aussi !</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {otherSupport.map((item, idx) => (
                            <Link key={idx} to="/contact" className="group">
                                <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100 h-full">
                                    <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm">{item.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <HeartHandshake className="w-16 h-16 mx-auto mb-6 text-white/80" />
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ensemble, transformons la santé au Cameroun</h2>
                    <p className="text-xl text-white/80 mb-8">
                        Chaque contribution, quelle que soit sa forme, nous rapproche de notre vision : un leadership féminin fort au service de la santé.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-white text-primary-700 font-bold rounded-xl hover:bg-primary-50 transition-colors shadow-lg">
                            Faire un don maintenant
                        </button>
                        <Link to="/contact" className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
                            Nous contacter
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Donate
