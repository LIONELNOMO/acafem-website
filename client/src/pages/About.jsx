import { useState } from 'react'
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
    Building2,
    Globe,
    AlertTriangle,
    Shield
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
            image: null,
            desc: 'Adoption des statuts et règlement intérieur. Création de relations d\'amitié entre femmes médecins. Début de réflexion sur les questions sanitaires.'
        },
        {
            year: '1995-1998',
            title: 'Recherche et visibilité',
            president: 'Dr Lilian Tendo Wambua ',
            image: '/images/lilian tendo.JPG',
            desc: 'Recherche nationale sur les pratiques traditionnelles affectant la santé reproductive. Représentation dans les conférences nationales et internationales.'
        },
        {
            year: '1998-2003',
            title: 'Expansion territoriale',
            president: 'Dr Florence Tumasang',
            image: null,
            desc: 'Prévention et promotion de la santé de reproduction. Vulgarisation de l\'agent de santé communautaire. Prévention mère-enfant du VIH. Création des 5 premières branches régionales.'
        },
        {
            year: '2003-2010',
            title: 'Structuration des actions',
            president: 'Dr Adelaide Kouinche',
            image: null,
            desc: 'Lutte contre le VIH chez les adolescents. Éducation à la vie familiale. Organisation en 5 axes : renforcement des capacités, formation des formateurs, sensibilisation communautaire.'
        },
        {
            year: '2010-2013',
            title: 'Centres d\'écoute',
            president: 'Dr Julienne Nouthe Djubgang',
            image: '/images/dr julienne.JPG',
            desc: 'Renforcement de l\'offre de santé reproductive pour adolescents/jeunes. Création de centres d\'écoute. Système de référence et contre-référence.'
        },
        {
            year: '2013-2024',
            title: 'Mise en réseau et leadership',
            president: 'Pr Anne Esther Njom Nlend',
            image: '/images/njom nlend.jpeg',
            desc: 'Mise en réseau des femmes médecins. Plaidoyer et leadership. Partenariats nationaux et internationaux. Nombreuses activités programmatiques.'
        },
        {
            year: '2025-2028',
            title: 'Nouveau mandat',
            president: 'Nouveau Comité Exécutif',
            image: "/images/plan strategique pour l'acafem.jpg",
            desc: 'Élection du nouveau Comité Exécutif (mars 2025). Lancement du Plan Stratégique 2025-2028. Vision : Leadership féminin et solidarité.'
        },
    ]

    const team = [
        { name: 'Pr AGNES ESIENE', role: 'Présidente', image: '/images/IMAGE PRESIDENTE.jpeg' },
        { name: 'Pr HORTENSE GONSU KAMGA', role: 'Vice-Présidente', image: '/images/Gomsu Hortense.jpeg' },
        { name: 'Dr Lilian Ngwana Ngwongem', role: 'Secrétaire Générale', image: '/images/Lilian.jpeg' },
        { name: 'Dr Gertrude Mete Ngono', role: 'Secrétaire Générale Adjointe', image: '/images/SECRETAIRE GENERALE.jpeg' },
        { name: 'Dr Annick Ndoumba', role: 'Trésorière', image: '/images/TRESORIERE IMAGE.jpeg' },
        { name: 'Dr Caroline Mvilongo Tsimi', role: 'Trésorière Adjointe', image: '/images/TRESORIERE ADJOINTE.jpeg' },
        { name: 'Dr Christiane Nsahlai', role: 'Commissaire aux Comptes', image: '/images/COMMISSAIRE AU COMPTE.jpeg' },
    ]

    // État pour le modal de visualisation de photo
    const [selectedImage, setSelectedImage] = useState(null)

    return (
        <div className="pt-20">
            {/* Modal pour afficher la photo en grand */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-3xl max-h-[90vh] animate-scale-in">
                        <img
                            src={selectedImage.image}
                            alt={selectedImage.name}
                            className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl object-contain"
                        />
                        <div className="mt-4 text-center text-white">
                            <h3 className="text-2xl font-bold">{selectedImage.name}</h3>
                            {selectedImage.role && <p className="text-lg text-white/80">{selectedImage.role}</p>}
                        </div>
                        <button
                            className="absolute -top-4 -right-4 w-10 h-10 bg-white text-gray-900 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors text-2xl font-bold"
                            onClick={() => setSelectedImage(null)}
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-secondary-600 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        À Propos de l'ACAFEM
                    </h1>
                    <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                        L'Association Camerounaise des Femmes Médecins (ACAFEM), créée en 1991,
                        est affiliée à l'Association Internationale des Femmes Médecins (MWIA).
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

            {/* Vision & Objectifs Stratégiques 2025-2028 */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Plan Stratégique</span>
                        <h2 className="section-title mt-2">Vision & Objectifs 2025-2028</h2>
                        <div className="w-24 h-1 bg-secondary-500 mx-auto rounded-full mt-4"></div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 mb-16">
                        {/* Vision Card */}
                        <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Eye size={120} />
                            </div>
                            <div className="relative z-10">
                                <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6">
                                    <Target className="mr-2" size={16} />
                                    Vision 2025-2028
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
                                    "Leadership féminin et solidarité des femmes médecins au service de la santé et de l'éthique"
                                </h3>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-bold text-primary-200 mb-2 uppercase tracking-wide text-sm">Notre But</h4>
                                        <p className="text-white/90 leading-relaxed">
                                            Contribuer à l'amélioration de la santé des populations camerounaises et aux conditions de travail de la femme médecin.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary-200 mb-2 uppercase tracking-wide text-sm"> Double Objectif Général</h4>
                                        <p className="text-white/90 leading-relaxed">
                                            Contribuer d'ici 2030 à l'amélioration du bien-être de la femme médecin et des étudiantes de dernière année de médecine. .
                                        </p>
                                        <p className="text-white/90 leading-relaxed">
                                            contribuer d'ici 2030 à l'amélioration de la santé de la population Générale .
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ancrage Institutionnel */}
                        <div className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-50 rounded-bl-full"></div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                                <Building2 className="mr-3 text-secondary-500" />
                                Ancrage Institutionnel
                            </h3>

                            <div className="space-y-8">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mr-4">
                                        <Globe size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg mb-2">Plan MWIA 2020-2025</h4>
                                        <p className="text-gray-600 bg-gray-50 p-4 rounded-lg border-l-4 border-primary-500 italic">
                                            "Une humanité : des solutions de santé grâce à nos partenariats"
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center text-secondary-600 mr-4">
                                        <CheckCircle size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg mb-2">Stratégie Nationale (SND-30)</h4>
                                        <p className="text-gray-600">
                                            Alignement complet avec la Stratégie Nationale de Développement 2020-2030 du Cameroun pour un impact durable.
                                        </p>

                                        <h5 className="font-bold text-gray-900 text-lg mb-2">Stratégie sectorielle de la Santé(SSS 2020-2030)</h5>
                                        <P>Alignement complet avec la SSS 2020-2030 pour promouvoir les modes de vie saint et améliorer l'accès au service de santé.  </P>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Structure Organisationnelle */}
                    <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
                        <div className="text-center mb-12">
                            <h3 className="text-2xl font-bold text-gray-900">Notre Organisation</h3>
                            <p className="text-gray-600 mt-2">Une structure solide pour soutenir nos actions</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">


                            {/* AG */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-default">
                                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4">
                                    <Users size={20} />
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">Assemblée Générale</h4>
                                <p className="text-sm text-gray-600">Plus haute autorité, réunion annuelle de tous les membres.</p>
                            </div>

                            {/* CA */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-default">
                                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4">
                                    <Users size={20} />
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">Conseil d'Administration</h4>
                                <p className="text-sm text-gray-600">definir la stratégie et supervisé le comité executif.</p>
                            </div>

                            {/* Comité Exécutif */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-default">
                                <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center text-secondary-600 mb-4">
                                    <Award size={20} />
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">Comité Exécutif</h4>
                                <p className="text-sm text-gray-600">Organe de direction élu pour le mandat 2025-2028.</p>
                            </div>

                            {/* Conseil Consultatif */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-default">
                                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-4">
                                    <Users size={20} />
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">Conseil Consultatif</h4>
                                <p className="text-sm text-gray-600">Organe d'orientation et de conseil stratégique.</p>
                            </div>

                            {/* Branches */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-default">
                                <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center text-accent-600 mb-4">
                                    <MapPin size={20} />
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">6 Branches Régionales</h4>
                                <p className="text-sm text-gray-600">Centre-Sud, Littoral-SO, Nord-Ouest, Ouest, Est, Nord.</p>
                            </div>
                        </div>

                        {/* Comités Spéciaux */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <h4 className="text-lg font-bold text-gray-900 mb-6 text-center">4 Comités d'Intérêt Spéciaux (2025-2028)</h4>
                            <div className="flex flex-wrap justify-center gap-4">
                                {['Gouvernance', 'Recherche scientifique et éthique', 'Socialisation', 'Recherche de financement'].map((comite, idx) => (
                                    <span key={idx} className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 shadow-sm flex items-center">
                                        <div className="w-2 h-2 bg-secondary-500 rounded-full mr-2"></div>
                                        {comite}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Engagement - Pratiques Néfastes */}
            <section className="py-24 bg-red-50 relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-100 rounded-bl-full opacity-50"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-full mb-4 text-red-600">
                            <Shield size={32} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Notre combat contre les pratiques néfastes</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Depuis sa création, l'ACAFEM mène des enquêtes sanitaires rigoureuses mettant en lumière et combattant les traditions dangereuses pour la santé.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Carte Principale - Excision */}
                        <div className="lg:col-span-3 bg-white rounded-2xl p-8 shadow-lg border-l-8 border-red-500 flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-shrink-0 bg-red-100 p-6 rounded-full">
                                <AlertTriangle className="text-red-600" size={48} />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Lutte contre l'Excision</h3>
                                <p className="text-gray-600 text-lg">
                                    Nous combattons activement les mutilations génitales féminines et leurs conséquences dévastatrices sur la santé physique et psychologique des femmes.
                                </p>
                            </div>
                        </div>

                        {/* Autres pratiques */}
                        {[
                            { title: "Pratiques post-partum à risque", desc: "Massages à l'eau chaude et risques hémorragiques" },
                            { title: "Malnutrition culturelle", desc: "Restrictions alimentaires privant la femme de nutriments essentiels" },
                            { title: "Mariages précoces", desc: "Lutte contre le mariage des adolescentes" },
                            { title: "Addictions juvéniles", desc: "Consommation de drogue par les jeunes" },
                            { title: "Allaitement", desc: "Problèmes liés à l'allaitement maternel" },
                            { title: "Santé sexuelle", desc: "Lutte contre les MST et le VIH/SIDA" }
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group border border-red-100">
                                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                    <AlertTriangle size={20} />
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                                <p className="text-gray-600 text-sm">{item.desc}</p>
                            </div>
                        ))}
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
                                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 group">
                                            <div className="flex flex-col sm:flex-row gap-8 items-center">
                                                {/* Photo avec cadre élégant doré */}
                                                <div
                                                    className={`flex-shrink-0 relative ${item.image ? 'cursor-pointer' : ''}`}
                                                    onClick={() => item.image && setSelectedImage({ image: item.image, name: item.president })}
                                                >
                                                    {/* Halo lumineux */}
                                                    <div className="absolute -inset-4 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                    {/* Anneau doré extérieur */}
                                                    <div className="absolute -inset-2 bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-500 rounded-full"></div>
                                                    {/* Anneau blanc intermédiaire */}
                                                    <div className="absolute -inset-1 bg-white rounded-full"></div>
                                                    {/* Anneau doré intérieur */}
                                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-300 via-yellow-200 to-amber-400 rounded-full"></div>
                                                    {/* Photo principale ou Avatar anonyme */}
                                                    {item.image ? (
                                                        <img
                                                            src={item.image}
                                                            alt={item.president}
                                                            className="relative w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-4 border-white shadow-2xl hover:scale-105 transition-transform"
                                                        />
                                                    ) : (
                                                        <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border-4 border-white shadow-2xl flex items-center justify-center">
                                                            <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                    {/* Brillance sur le cadre */}
                                                    <div className="absolute top-2 left-4 w-8 h-2 bg-white/60 rounded-full blur-sm transform -rotate-45"></div>
                                                    {/* Indicateur de clic (seulement si image disponible) */}
                                                    {item.image && (
                                                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs shadow-lg">
                                                            🔍
                                                        </div>
                                                    )}
                                                </div>
                                                {/* Content */}
                                                <div className="flex-1 text-center sm:text-left">
                                                    <div className="inline-flex items-center space-x-2 mb-4 bg-gradient-to-r from-primary-100 to-secondary-100 px-4 py-1.5 rounded-full shadow-sm">
                                                        <Calendar className="text-primary-600" size={16} />
                                                        <span className="text-primary-700 font-bold">{item.year}</span>
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">{item.title}</h3>
                                                    <p className="text-secondary-600 font-semibold text-lg mb-3">{item.president}</p>
                                                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
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
                                <div
                                    className="aspect-square overflow-hidden cursor-pointer relative"
                                    onClick={() => setSelectedImage({ image: member.image, name: member.name, role: member.role })}
                                >
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {/* Overlay au survol */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-2xl">🔍</span>
                                    </div>
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
                            <div className="text-5xl font-bold text-white mb-2">6</div>
                            <div className="text-white/70">Régions couvertes</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About
