import { Link } from 'react-router-dom'
import {
    Heart,
    Users,
    BookOpen,
    Megaphone,
    Stethoscope,
    ArrowRight,
    CheckCircle,
    Quote,
    Calendar,
    MapPin,
    ChevronRight,
    Target,
    Globe,
    UserCircle,
    Award
} from 'lucide-react'

// Hero Section Component
function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-600"></div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl"></div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6">
                            <Stethoscope size={16} className="mr-2" />
                            <span>Depuis 1991 | Affiliée à l'AIFM depuis 1919</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-2">
                            ACAFEM
                        </h1>
                        <h2 className="text-2xl md:text-3xl font-heading font-semibold text-white/90 mb-6">
                            Association Camerounaise des Femmes Médecins
                        </h2>

                        <div className="bg-white/10 backdrop-blur-sm border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg max-w-xl mx-auto lg:mx-0">
                            <p className="text-lg text-white font-serif italic">
                                « Soigner avec un cœur de mères, et de filles »
                            </p>
                        </div>

                        <div className="bg-gradient-to-r from-primary-400/20 to-secondary-400/20 rounded-xl p-4 mb-8 border border-white/10">
                            <p className="text-sm text-yellow-100 font-semibold uppercase tracking-wider mb-1">Vision 2025-2028</p>
                            <p className="text-white/90">Leadership féminin et solidarité des femmes médecins au service de la santé et de l'éthique.</p>
                        </div>

                        <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl">
                            Depuis 34 ans, l'ACAFEM rassemble les femmes médecins camerounaises
                            pour transformer le secteur de la santé, promouvoir l'équité des sexes
                            et améliorer la santé des populations.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            {/* Bleu Ciel - Lumineux et accueillant */}
                            <Link to="/projets" className="group inline-flex items-center justify-center px-7 py-3.5 bg-gradient-to-r from-sky-400 to-sky-500 text-white font-semibold rounded-xl hover:from-sky-500 hover:to-sky-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 tracking-wide">
                                <span className="mr-2">✨</span>
                                <span className="font-heading">Découvrir nos projets</span>
                            </Link>
                            {/* Bleu Royal - Confiance et professionnalisme */}
                            <Link to="/contact" className="group inline-flex items-center justify-center px-7 py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 tracking-wide">
                                <span className="mr-2">👩‍⚕️</span>
                                <span className="font-heading">Devenir membre</span>
                            </Link>
                            {/* Bleu Marine/Indigo - Profondeur et engagement */}
                            <Link to="/don" className="group inline-flex items-center justify-center px-7 py-3.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 tracking-wide">
                                <span className="mr-2">💙</span>
                                <span className="font-heading">Faire un don</span>
                            </Link>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative hidden lg:block">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl blur-2xl opacity-30 animate-pulse-slow"></div>
                            <img
                                src="/images/famille acafem.png"
                                alt="Femmes médecins ACAFEM"
                                className="relative rounded-3xl shadow-2xl w-full h-[550px] object-cover"
                            />

                            {/* Floating Card */}
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl">
                                <div className="flex items-center space-x-4">
                                    <div className="w-14 h-14 bg-secondary-100 rounded-full flex items-center justify-center">
                                        <Heart className="text-secondary-600" size={28} />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">34 Ans</div>
                                        <div className="text-gray-500 text-sm">d'engagement</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-80">
                <div className="flex flex-col items-center text-white/80 text-sm font-medium">
                    <span className="mb-2">Découvrez notre impact</span>
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
                        <div className="w-1 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// Urgency Banner Section
function UrgencySection() {
    return (
        <div className="bg-gradient-to-r from-accent-600 to-accent-500 text-white py-3 overflow-hidden shadow-lg relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center md:justify-between text-center md:text-left gap-2">
                <div className="flex items-center gap-2 font-bold animate-pulse-slow">
                    <Target size={20} />
                    <span>PLAN STRATÉGIQUE 2025-2028 LANCÉ !</span>
                </div>
                <div className="hidden md:flex items-center gap-6 text-sm font-medium opacity-90">
                    <span className="flex items-center gap-1"><Users size={16} /> Objectif : 500 membres</span>
                    <span className="w-1 h-1 bg-white rounded-full"></span>
                    <span className="flex items-center gap-1"><BookOpen size={16} /> 500 femmes à former</span>
                </div>
                <Link to="/contact" className="text-sm font-bold underline hover:text-white/80 transition-colors flex items-center gap-1">
                    Rejoignez le mouvement <ArrowRight size={14} />
                </Link>
            </div>
        </div>
    )
}

// Stats / Key Figures Section
function StatsSection() {
    const stats = [
        {
            value: "34 ANS",
            label: "D'engagement (1991-2025)",
            color: "text-primary-500",
            icon: <Calendar className="w-6 h-6 mb-2 mx-auto text-primary-300" />
        },
        {
            value: "122 → 500",
            label: "Objectif membres 2028",
            color: "text-secondary-500",
            icon: <Users className="w-6 h-6 mb-2 mx-auto text-secondary-300" />
        },
        {
            value: "10",
            label: "Branches régionales actives",
            color: "text-accent-500",
            icon: <MapPin className="w-6 h-6 mb-2 mx-auto text-accent-300" />
        },
        {
            value: "25%",
            label: "Femmes aux postes de direction",
            sub: "contre 70% de femmes en santé",
            color: "text-yellow-500",
            icon: <Target className="w-6 h-6 mb-2 mx-auto text-yellow-300" />
        },
    ]

    return (
        <section className="py-16 bg-white -mt-10 relative z-10 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
                    <div className="text-center mb-10">
                        <h3 className="section-title text-2xl md:text-3xl">L'ACAFEM en chiffres</h3>
                        <p className="section-subtitle mt-2">Des réalisations concrètes pour un impact mesurable</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                {stat.icon}
                                <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                                <div className="text-gray-600 font-medium text-sm md:text-base">{stat.label}</div>
                                {stat.sub && <div className="text-gray-400 text-xs mt-1">{stat.sub}</div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

// About / History Section
function AboutSection() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Qui sommes-nous ?</span>
                        <h2 className="section-title mt-2 text-left mb-6">Une histoire de 34 ans au service de la santé</h2>

                        <div className="space-y-6 text-gray-600 leading-relaxed">
                            <p>
                                <strong className="text-gray-900">L'Association Camerounaise des Femmes Médecins (ACAFEM)</strong> a été créée en <strong className="text-primary-600">1991</strong> avec une mission claire : tisser des liens de solidarité entre les femmes médecins camerounaises et œuvrer pour l'amélioration de la santé des populations.
                            </p>
                            <p>
                                Affiliée à <strong className="text-gray-900">l'Association Internationale des Femmes Médecins (AIFM)</strong>, fondée en 1919, l'ACAFEM s'inscrit dans un réseau mondial de professionnelles engagées.
                            </p>
                            <p>
                                En partenariat avec la <strong className="text-gray-900">Coalition Internationale pour la Santé des Femmes (CISF)</strong>, nous promouvons les droits en matière de sexualité et de reproduction pour toutes les femmes au Cameroun.
                            </p>
                            <div className="bg-primary-50 p-6 rounded-xl border-l-4 border-primary-500">
                                <p className="font-medium text-primary-900 italic">
                                    "Notre engagement : transformer les défis en opportunités, faire entendre la voix des femmes médecins et bâtir un système de santé équitable."
                                </p>
                            </div>
                        </div>

                        <Link to="/a-propos" className="btn-outline mt-8 group">
                            En savoir plus sur notre histoire
                            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="relative">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src="/images/action2.jpg"
                                alt="Action terrain ACAFEM"
                                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                            {/* Mission Badges Overlay */}
                            <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-4">
                                <div className="bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg">
                                    <Globe className="text-primary-500 mb-2" size={24} />
                                    <div className="font-bold text-gray-900 text-sm">Réseau Mondial</div>
                                    <div className="text-xs text-gray-500">Affiliation AIFM</div>
                                </div>
                                <div className="bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg">
                                    <UserCircle className="text-secondary-500 mb-2" size={24} />
                                    <div className="font-bold text-gray-900 text-sm">Partenariats</div>
                                    <div className="text-xs text-gray-500">CISF & Gouvernement</div>
                                </div>
                            </div>
                        </div>
                        {/* Decorative blob */}
                        <div className="absolute -z-10 -top-10 -right-10 w-64 h-64 bg-accent-100 rounded-full blur-3xl"></div>
                        <div className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 bg-primary-100 rounded-full blur-3xl"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// Action Domains Section
function ActionDomainsSection() {
    const domains = [
        {
            icon: <Stethoscope size={40} className="text-primary-500" />,
            title: "Bien-être des Femmes Médecins",
            desc: "Nous œuvrons pour améliorer les conditions de travail, promouvoir le leadership féminin et lutter contre les inégalités. Mentoring et formation continue.",
            points: ["Formation scientifiques", "Formations génératrices de revenu", "Programmes de leadership", "Équité salariale"]
        },
        {
            icon: <Heart size={40} className="text-secondary-500" />,
            title: "Santé des Populations",
            desc: "Actions concrètes pour réduire la mortalité maternelle, promouvoir la santé reproductive et lutter contre les violences faites aux femmes.",
            points: ["Mortalité maternelle", "Santé reproductive", "Violences faites aux femmes"]
        },
        {
            icon: <UserCircle size={40} className="text-accent-500" />,
            title: "Gouvernance & Partenariat",
            desc: "Renforcer la voix collective des femmes médecins pour influencer les politiques de santé et faire progresser la parité aux postes de direction.",
            points: ["Parité directionnelle", "Plaidoyer politique", "Partenariats stratégiques"]
        }
    ]

    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Nos Axes Stratégiques</span>
                    <h2 className="section-title mt-2">Trois grands domaines d'action</h2>
                    <p className="section-subtitle">Un engagement sur trois fronts pour transformer le secteur de la santé</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {domains.map((domain, index) => (
                        <div key={index} className="card p-8 group hover:-translate-y-2 transition-all duration-300 border-t-4 border-transparent hover:border-primary-500">
                            <div className="mb-6 bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                {domain.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{domain.title}</h3>
                            <p className="text-gray-600 mb-6 text-sm leading-relaxed">{domain.desc}</p>
                            <ul className="space-y-2">
                                {domain.points.map((pt, i) => (
                                    <li key={i} className="flex items-center text-sm text-gray-700">
                                        <CheckCircle size={14} className="text-green-500 mr-2 flex-shrink-0" />
                                        {pt}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// Missions Detail Section
function MissionsDetailSection() {
    const missions = [
        { icon: <UserCircle size={24} />, title: "Collaboration", text: "Encourager l'amitié entre médecins." },
        { icon: <Megaphone size={24} />, title: "Plaidoyer", text: "Sensibiliser sur la santé femme/homme." },
        { icon: <Award size={24} />, title: "Leadership", text: "Promouvoir les femmes leaders." },
        { icon: <Users size={24} />, title: "Échanges", text: "Espaces de discussion santé." },
        { icon: <Target size={24} />, title: "Égalité", text: "Œuvrer pour l'équité médicale." },
    ]

    return (
        <section className="py-20 bg-primary-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold font-heading mb-4">Nos 5 Missions Fondamentales</h2>
                    <div className="w-24 h-1 bg-secondary-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-5 gap-6">
                    {missions.map((m, i) => (
                        <div key={i} className="text-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                            <div className="mx-auto w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center mb-4 text-white shadow-lg">
                                {m.icon}
                            </div>
                            <h4 className="font-bold text-lg mb-2">{m.title}</h4>
                            <p className="text-sm text-white/70">{m.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// Testimonials Section
function TestimonialsSection() {
    const testimonials = [
        {
            content: "Grâce à l'ACAFEM, j'ai trouvé un réseau de mentorat qui m'a permis de prendre confiance en mes capacités. Aujourd'hui, je dirige mon propre service.",
            author: 'Dr. Audrey M.',
            role: 'Médecin Généraliste, Littoral',
            image: 'https://i.pravatar.cc/100?img=1'
        },
        {
            content: "Les formations de l'ACAFEM m'ont ouvert les yeux sur l'importance du leadership féminin en santé. Je me prépare à devenir une leader.",
            author: 'Sarah K.',
            role: 'Étudiante en 7e année',
            image: 'https://i.pravatar.cc/100?img=5'
        },
        {
            content: "L'ACAFEM n'est pas qu'une association, c'est une famille. Ensemble, nous avons prouvé que les femmes médecins peuvent transformer le système.",
            author: 'Pr. Jeanne E.',
            role: 'Membre Fondatrice',
            image: 'https://i.pravatar.cc/100?img=3'
        }
    ]

    return (
        <section className="py-24 bg-gradient-to-br from-primary-600 to-secondary-600 relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-60 h-60 border border-white rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-white/70 font-semibold text-sm uppercase tracking-wider">Témoignages</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2">
                        Elles témoignent
                    </h2>
                    <p className="text-white/80 mt-4 text-lg">Des voix qui inspirent, des parcours qui transforment</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                            <Quote className="text-white/30 mb-4" size={40} />
                            <p className="text-white/90 text-lg leading-relaxed mb-6">
                                "{testimonial.content}"
                            </p>
                            <div className="flex items-center space-x-4">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.author}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                                />
                                <div>
                                    <div className="text-white font-semibold">{testimonial.author}</div>
                                    <div className="text-white/60 text-sm">{testimonial.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// News Preview
function NewsPreview() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Actualités</span>
                        <h2 className="section-title mt-2 text-left">À la Une</h2>
                    </div>
                    <Link to="/actualites" className="text-primary-600 font-medium hover:text-primary-700 flex items-center">
                        Toutes les actualités <ArrowRight size={16} className="ml-1" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Article 1 */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group">
                        <div className="h-48 overflow-hidden">
                            <img src="/images/action1.jpg" alt="Plan stratégique" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-6">
                            <div className="text-sm text-primary-500 font-medium mb-2">15 Mars 2025</div>
                            <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">Plan Stratégique 2025-2028</h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">L'Assemblée Générale de mars 2025 a marqué le lancement de notre nouveau plan stratégique ambitieux...</p>
                            <Link to="/actualites" className="text-sm font-bold text-primary-600 hover:text-primary-700 flex items-center">
                                Lire la suite <ChevronRight size={14} className="ml-1" />
                            </Link>
                        </div>
                    </div>
                    {/* Article 2 */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group">
                        <div className="h-48 overflow-hidden">
                            <img src="/images/equipe.jpg" alt="Comité Exécutif" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-6">
                            <div className="text-sm text-primary-500 font-medium mb-2">10 Mars 2025</div>
                            <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">Nouveau Comité Exécutif</h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">Sept femmes leaders élues pour piloter l'ACAFEM vers de nouveaux sommets...</p>
                            <Link to="/actualites" className="text-sm font-bold text-primary-600 hover:text-primary-700 flex items-center">
                                Lire la suite <ChevronRight size={14} className="ml-1" />
                            </Link>
                        </div>
                    </div>
                    {/* Article 3 */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group">
                        <div className="h-48 overflow-hidden">
                            <img src="/images/action3.jpg" alt="Formation Leadership" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-6">
                            <div className="text-sm text-primary-500 font-medium mb-2">05 Mars 2025</div>
                            <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">Formation Leadership</h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">Le programme de renforcement des capacités débute avec une session sur le leadership stratégique...</p>
                            <Link to="/actualites" className="text-sm font-bold text-primary-600 hover:text-primary-700 flex items-center">
                                Lire la suite <ChevronRight size={14} className="ml-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// CTA / Action Grid
function FinalCTASection() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
                        {/* Column 1 */}
                        <div className="p-10 text-center hover:bg-white/5 transition-colors group">
                            <Stethoscope size={48} className="mx-auto text-secondary-400 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold text-white mb-3">VOUS ÊTES MÉDECIN ?</h3>
                            <p className="text-white/80 mb-8 leading-relaxed">Rejoignez nos 122 membres et participez à la transformation du secteur.</p>
                            <Link to="/inscription-membre" className="inline-block px-6 py-3 bg-white text-primary-900 font-bold rounded-lg hover:bg-gray-100 transition-colors w-full">
                                Devenir membre
                            </Link>
                        </div>
                        {/* Column 2 */}
                        <div className="p-10 text-center hover:bg-white/5 transition-colors group">
                            <BookOpen size={48} className="mx-auto text-yellow-400 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold text-white mb-3">VOUS ÊTES ÉTUDIANTE ?</h3>
                            <p className="text-white/80 mb-8 leading-relaxed">Bénéficiez de formations, mentorat et opportunités de leadership.</p>
                            <Link to="/inscription-etudiant" className="inline-block px-6 py-3 bg-white/10 border border-white text-white font-bold rounded-lg hover:bg-white hover:text-primary-900 transition-colors w-full">
                                S'inscrire au programme
                            </Link>
                        </div>
                        {/* Column 3 */}
                        <div className="p-10 text-center hover:bg-white/5 transition-colors group">
                            <Heart size={48} className="mx-auto text-accent-500 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold text-white mb-3">VOUS VOULEZ SOUTENIR ?</h3>
                            <p className="text-white/80 mb-8 leading-relaxed">Votre don finance nos formations, recherches et actions sur le terrain.</p>
                            <Link to="/don" className="inline-block px-6 py-3 bg-accent-500 text-white font-bold rounded-lg hover:bg-accent-600 transition-colors w-full shadow-lg">
                                Faire un don
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// Partners Section 
function PartnersSection() {
    return (
        <section className="py-12 border-t border-gray-100 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">Nos partenaires et affiliations</p>
                <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    <span className="text-xl font-bold text-gray-800 flex items-center gap-2"><Globe size={20} /> AIFM / MWIA</span>
                    <span className="text-xl font-bold text-gray-800 flex items-center gap-2"><Users size={20} /> CISF</span>
                    <span className="text-xl font-bold text-gray-800">MINSANTE</span>
                    <span className="text-xl font-bold text-gray-800">MINPROFF</span>
                </div>
            </div>
        </section>
    )
}

// Main Home Page Component
function Home() {
    return (
        <div className="animate-fade-in">
            <HeroSection />
            <UrgencySection />
            <StatsSection />
            <AboutSection />
            <ActionDomainsSection />
            <MissionsDetailSection />
            <TestimonialsSection />
            <NewsPreview />
            <FinalCTASection />
            <PartnersSection />
        </div>
    )
}

export default Home
