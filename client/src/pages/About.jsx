import {
    Heart,
    Target,
    Eye,
    Award,
    Users,
    CheckCircle,
    Calendar,
    MapPin,
    Clock,
    Building2
} from 'lucide-react'

function About() {
    const values = [
        { icon: <Heart className="text-accent-500" />, title: 'Compassion', desc: 'Nous mettons l\'humain au cœur de toutes nos actions' },
        { icon: <Target className="text-primary-500" />, title: 'Excellence', desc: 'Nous visons les plus hauts standards de qualité médicale' },
        { icon: <Eye className="text-secondary-500" />, title: 'Transparence', desc: 'Nous rendons compte de nos actions avec honnêteté' },
        { icon: <Award className="text-yellow-500" />, title: 'Intégrité', desc: 'Nous agissons avec éthique et professionnalisme' },
    ]

    const timeline = [
        {
            year: '1991-1995',
            title: 'Les fondements',
            president: 'Dr ABENG Barbara',
            image: 'https://i.pravatar.cc/150?img=47',
            desc: 'Adoption des statuts et règlement intérieur. Création de relations d\'amitié entre femmes médecins. Début de réflexion sur les questions sanitaires.'
        },
        {
            year: '1995-1998',
            title: 'Recherche et visibilité',
            president: 'Dr Lilian Tendo Wambua & Dr Rosa Befidi Mengue',
            image: 'https://i.pravatar.cc/150?img=44',
            desc: 'Recherche nationale sur les pratiques traditionnelles affectant la santé reproductive. Représentation dans les conférences nationales et internationales.'
        },
        {
            year: '1998-2003',
            title: 'Expansion territoriale',
            president: 'Dr Florence Tumasang',
            image: 'https://i.pravatar.cc/150?img=45',
            desc: 'Prévention et promotion de la santé de reproduction. Vulgarisation de l\'agent de santé communautaire. Prévention mère-enfant du VIH. Création des 5 premières branches régionales.'
        },
        {
            year: '2003-2010',
            title: 'Structuration des actions',
            president: 'Dr Adelaide Kouinche',
            image: 'https://i.pravatar.cc/150?img=43',
            desc: 'Lutte contre le VIH chez les adolescents. Éducation à la vie familiale. Organisation en 5 axes : renforcement des capacités, formation des formateurs, sensibilisation communautaire.'
        },
        {
            year: '2010-2013',
            title: 'Centres d\'écoute',
            president: 'Dr Julienne Nouthe Djubgang',
            image: 'https://i.pravatar.cc/150?img=41',
            desc: 'Renforcement de l\'offre de santé reproductive pour adolescents/jeunes. Création de centres d\'écoute. Système de référence et contre-référence.'
        },
        {
            year: '2013-2024',
            title: 'Mise en réseau et leadership',
            president: 'Pr Anne Esther Njom Nlend',
            image: 'https://i.pravatar.cc/150?img=49',
            desc: 'Mise en réseau des femmes médecins. Plaidoyer et leadership. Partenariats nationaux et internationaux. Nombreuses activités programmatiques.'
        },
        {
            year: '2025-2028',
            title: 'Nouveau mandat',
            president: 'Nouveau Comité Exécutif',
            image: '/images/equipe.jpg',
            desc: 'Élection du nouveau Comité Exécutif (mars 2025). Lancement du Plan Stratégique 2025-2028. Vision : Leadership féminin et solidarité.'
        },
    ]

    const team = [
        { name: 'Pr AGNES ESIENE', role: 'Présidente', image: '/images/IMAGE PRESIDENTE.jpeg' },
        { name: 'Pr HORTENSE GONSU KAMGA', role: 'Vice-Présidente', image: '/images/equipe.jpg' },
        { name: 'Dr Lilian Ngwana Ngwongem', role: 'Secrétaire Générale', image: '/images/equipe.jpg' },
        { name: 'Dr Gertrude Mete Ngono', role: 'Secrétaire Générale Adjointe', image: '/images/SECRETAIRE GENERALE.jpeg' },
        { name: 'Dr Annick Ndoumba', role: 'Trésorière', image: '/images/TRESORIERE IMAGE.jpeg' },
        { name: 'Dr Caroline Mvilongo Tsimi', role: 'Trésorière Adjointe', image: '/images/TRESORIERE ADJOINTE.jpeg' },
        { name: 'Dr Christiane Nsahlai', role: 'Commissaire aux Comptes', image: '/images/COMMISSAIRE AU COMPTE.jpeg' },
    ]

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-secondary-600 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        À Propos de l'ACAFEM
                    </h1>
                    <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                        L'Association Camerounaise des Femmes Médecins (ACAFEM), créée en 1991,
                        est affiliée à l'Association Internationale des Femmes Médecins (AIFM).
                        Apolitique et à but non lucratif, elle est régie par la loi n° 90-53 du 19 décembre 1990.
                    </p>

                    {/* Info Badges - Elegant Compact Design */}
                    <div className="flex flex-wrap justify-center items-center gap-3 mt-10">
                        <div className="group flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 cursor-default">
                            <MapPin className="text-yellow-300" size={16} />
                            <span className="text-white/70 text-sm">Siège</span>
                            <span className="text-white font-semibold text-sm">Yaoundé</span>
                        </div>

                        <div className="hidden md:block w-px h-6 bg-gradient-to-b from-transparent via-yellow-400/60 to-transparent"></div>

                        <div className="group flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 cursor-default">
                            <Clock className="text-yellow-300" size={16} />
                            <span className="text-white/70 text-sm">Durée</span>
                            <span className="text-white font-semibold text-sm">Illimitée</span>
                        </div>

                        <div className="hidden md:block w-px h-6 bg-gradient-to-b from-transparent via-yellow-400/60 to-transparent"></div>

                        <div className="group flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 cursor-default">
                            <Building2 className="text-yellow-300" size={16} />
                            <span className="text-white/70 text-sm">Personnalité</span>
                            <span className="text-white font-semibold text-sm">Morale & autonomie financière</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-10">
                            <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mb-6">
                                <Target className="text-white" size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre Mission</h2>
                            <p className="text-gray-700 leading-relaxed">
                                L'ACAFEM œuvre à l'amélioration de la santé reproductive et sexuelle des populations
                                camerounaises à travers la promotion, l'éducation à la santé, le plaidoyer et les
                                services. Nous nous engageons à offrir des soins de qualité accessibles à tous.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-3xl p-10">
                            <div className="w-16 h-16 bg-secondary-500 rounded-2xl flex items-center justify-center mb-6">
                                <Eye className="text-white" size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre Vision</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Nous aspirons à un Cameroun où chaque femme, chaque famille, a accès à des soins
                                de santé reproductive de qualité. Un pays où l'éducation à la santé est une
                                priorité et où les droits des femmes sont pleinement respectés.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Nos Valeurs</span>
                        <h2 className="section-title mt-2">Ce qui nous guide</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                                <p className="text-gray-600">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Notre Histoire</span>
                        <h2 className="section-title mt-2">Un parcours riche</h2>
                    </div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200 hidden lg:block"></div>

                        <div className="space-y-12">
                            {timeline.map((item, index) => (
                                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                                    <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12'}`}>
                                        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                            <div className="flex gap-4">
                                                {/* Photo */}
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={item.image}
                                                        alt={item.president}
                                                        className="w-20 h-20 rounded-full object-cover border-4 border-primary-100 shadow-md"
                                                    />
                                                </div>
                                                {/* Content */}
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        <Calendar className="text-primary-500" size={16} />
                                                        <span className="text-primary-600 font-bold text-sm">{item.year}</span>
                                                    </div>
                                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                                                    <p className="text-secondary-600 font-medium text-sm mb-2">{item.president}</p>
                                                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Center dot */}
                                    <div className="hidden lg:flex w-2/12 justify-center">
                                        <div className="w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow"></div>
                                    </div>

                                    <div className="hidden lg:block w-5/12"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Notre Équipe</span>
                        <h2 className="section-title mt-2">Le Bureau Exécutif</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {team.map((member, index) => (
                            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group">
                                <div className="aspect-square overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="text-sm md:text-base font-bold text-gray-900">{member.name}</h3>
                                    <p className="text-primary-600 font-medium text-sm">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-24 bg-gradient-to-r from-primary-600 to-secondary-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-5xl font-bold text-white mb-2">30+</div>
                            <div className="text-white/70">Années d'expérience</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-white mb-2">100+</div>
                            <div className="text-white/70">Médecins membres</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-white mb-2">50K+</div>
                            <div className="text-white/70">Bénéficiaires</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-white mb-2">8</div>
                            <div className="text-white/70">Régions couvertes</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About
