import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import {
    MessageCircle,
    Users,
    Heart,
    Briefcase,
    Megaphone,
    Newspaper,
    Lock,
    ArrowRight,
    ShieldCheck,
    MessageSquare,
    Stethoscope,
    BookOpen,
    GraduationCap,
    CheckCircle
} from 'lucide-react'

const forumCategories = [
    {
        id: 'membres',
        title: "Espace Membres",
        description: "Discussions réservées, partage de ressources et témoignages entre consoeurs.",
        icon: <Users className="w-8 h-8 text-primary-500" />,
        color: "primary",
        topics: 124,
        access: "Privé",
        path: "/forum/membres"
    },
    {
        id: 'sante',
        title: "Questions Santé",
        description: "Échanges sur la santé reproductive, maternelle, VIH/SIDA et pratiques traditionnelles.",
        icon: <Heart className="w-8 h-8 text-red-500" />,
        color: "red",
        topics: 85,
        access: "Public",
        path: "/forum/sante"
    },
    {
        id: 'leadership',
        title: "Leadership & Carrière",
        description: "Mentorat, opportunités de formation et équilibre vie pro/perso.",
        icon: <Briefcase className="w-8 h-8 text-yellow-500" />,
        color: "yellow",
        topics: 56,
        access: "Public",
        path: "/forum/leadership"
    },
    {
        id: 'plaidoyer',
        title: "Plaidoyer & Engagement",
        description: "Lutte contre les violences, équité salariale et droits des femmes.",
        icon: <Megaphone className="w-8 h-8 text-purple-500" />,
        color: "purple",
        topics: 42,
        access: "Public",
        path: "/forum/plaidoyer"
    },
    {
        id: 'debats',
        title: "Actualités & Débats",
        description: "Politiques de santé, réformes du secteur et innovations.",
        icon: <Newspaper className="w-8 h-8 text-blue-500" />,
        color: "blue",
        topics: 38,
        access: "Public",
        path: "/forum/debats"
    }
]

const recentDiscussions = [
    {
        title: "Comment concilier gardes de nuit et vie de famille ?",
        author: "Dr. E. Mballa",
        category: "Leadership & Carrière",
        replies: 12,
        time: "Il y a 2h"
    },
    {
        title: "Nouveaux protocoles de prise en charge de l'éclampsie",
        author: "Pr. H. Gonsu",
        category: "Questions Santé",
        replies: 8,
        time: "Il y a 5h"
    },
    {
        title: "Appel à témoignages : Violences en milieu hospitalier",
        author: "Commission Éthique",
        category: "Plaidoyer & Engagement",
        replies: 24,
        time: "Hier"
    }
]

function Forum() {
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession()

            if (session) {
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single()

                if (data) setProfile(data)
            }
        } catch (error) {
            console.error('Error fetching profile:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="pt-20 bg-gray-50 min-h-screen">
            {/* Hero Section */}
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-800 to-primary-600 py-20 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1600&h=900&fit=crop')] bg-cover bg-center opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

                    {loading ? (
                        <div className="animate-pulse flex flex-col items-center">
                            <div className="h-4 w-48 bg-white/20 rounded mb-4"></div>
                            <div className="h-10 w-96 bg-white/20 rounded mb-8"></div>
                        </div>
                    ) : profile ? (
                        // Affichage Carte Membre si connecté
                        <div className="flex flex-col items-center animate-fade-in">
                            <h1 className="text-3xl md:text-4xl font-bold mb-8">Ravis de vous revoir, Dr. {profile.nom} !</h1>

                            {/* Carte Membre */}
                            <div className={`w-full max-w-md rounded-3xl p-6 shadow-2xl text-white text-left transform transition-transform hover:scale-105 duration-300 ${profile.type === 'membre'
                                ? 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20'
                                : 'bg-gradient-to-br from-secondary-600/90 to-secondary-800/90 backdrop-blur-md'
                                }`}>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center">
                                        {profile.type === 'membre' ? (
                                            <Stethoscope className="mr-2 text-secondary-400" size={24} />
                                        ) : (
                                            <GraduationCap className="mr-2 text-white" size={24} />
                                        )}
                                        <span className="font-bold tracking-widest">ACAFEM</span>
                                    </div>
                                    <div className="text-xs bg-white/20 px-3 py-1 rounded-full font-bold tracking-wider">
                                        {profile.type === 'membre' ? 'MEMBRE' : 'TUTORAT'}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <div className="text-2xl font-bold uppercase tracking-wide">
                                        {profile.prenom} {profile.nom}
                                    </div>
                                    {profile.type === 'membre' && profile.specialite && (
                                        <div className="text-secondary-300 font-medium mt-1">
                                            {profile.specialite}
                                        </div>
                                    )}
                                    {profile.type !== 'membre' && profile.universite && (
                                        <div className="text-white/80 mt-1">
                                            {profile.universite}
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                                    {profile.type === 'membre' && profile.numero_ordre && (
                                        <div>
                                            <div className="text-white/50 text-xs uppercase tracking-wider mb-1">N° Ordre</div>
                                            <div className="font-mono font-medium">{profile.numero_ordre}</div>
                                        </div>
                                    )}
                                    {!profile.type === 'membre' && profile.annee_etude && (
                                        <div>
                                            <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Année</div>
                                            <div className="font-medium">{profile.annee_etude}</div>
                                        </div>
                                    )}
                                    <div>
                                        <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Région</div>
                                        <div className="font-medium">{profile.region || profile.ville}</div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                    <div className="flex items-center text-xs text-secondary-300">
                                        <CheckCircle size={14} className="mr-1" />
                                        Membre vérifié
                                    </div>
                                    <div className="text-xs text-white/50">
                                        Depuis {new Date(profile.created_at).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-4">
                                <Link to="/espace-membre" className="btn bg-white text-primary-900 hover:bg-gray-100 font-bold px-6 py-3 rounded-xl shadow-lg transition-colors">
                                    Accéder à mon espace
                                </Link>
                            </div>
                        </div>
                    ) : (
                        // Affichage Public (Non connecté)
                        <div className="animate-fade-in">
                            <div className="inline-flex items-center justify-center p-3 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                                <MessageCircle size={32} />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">Forum Communautaire</h1>
                            <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8">
                                Un espace bienveillant d'échange, de partage d'expériences et de solidarité pour toutes les femmes médecins et sympathisants.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
                                {/* Médecin CTA */}
                                <Link to="/inscription-membre" className="group relative px-8 py-4 bg-white rounded-xl shadow-xl overflow-hidden hover:-translate-y-1 transition-all duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-r from-secondary-50 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="relative flex items-center gap-4">
                                        <div className="bg-secondary-100 p-2 rounded-lg text-secondary-600 group-hover:rotate-12 transition-transform duration-300">
                                            <Stethoscope size={24} />
                                        </div>
                                        <div className="text-left">
                                            <span className="block text-xs font-bold text-secondary-500 uppercase tracking-wider">Professionnelle</span>
                                            <span className="block text-lg font-bold text-gray-900">Rejoindre comme Médecin</span>
                                        </div>
                                        <ArrowRight className="text-gray-300 group-hover:text-secondary-500 group-hover:translate-x-1 transition-all ml-2" />
                                    </div>
                                </Link>

                                {/* Étudiante CTA */}
                                <Link to="/inscription-etudiant" className="group relative px-8 py-4 bg-primary-900/40 backdrop-blur-md border border-white/10 rounded-xl shadow-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:bg-primary-900/60">
                                    <div className="relative flex items-center gap-4">
                                        <div className="bg-blue-500/20 p-2 rounded-lg text-blue-300 group-hover:rotate-12 transition-transform duration-300">
                                            <BookOpen size={24} />
                                        </div>
                                        <div className="text-left">
                                            <span className="block text-xs font-bold text-blue-300 uppercase tracking-wider">En formation</span>
                                            <span className="block text-lg font-bold text-white">Rejoindre comme Étudiante</span>
                                        </div>
                                        <ArrowRight className="text-white/30 group-hover:text-blue-300 group-hover:translate-x-1 transition-all ml-2" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content - Categories */}
                    <div className="lg:col-span-2 space-y-8">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                            <MessageSquare className="mr-2 text-primary-500" />
                            Espaces de Discussion
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            {forumCategories.map(cat => (
                                <Link
                                    to={cat.path}
                                    key={cat.id}
                                    className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 group cursor-pointer block"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 rounded-xl bg-${cat.color}-50 group-hover:bg-${cat.color}-100 transition-colors`}>
                                            {cat.icon}
                                        </div>
                                        {cat.access === "Privé" && (
                                            <span className="flex items-center text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                                <Lock size={12} className="mr-1" /> Membres
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{cat.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{cat.description}</p>
                                    <div className="flex items-center text-sm text-gray-400">
                                        <span className="font-medium text-gray-900 mr-1">{cat.topics}</span> discussions
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Recent Discussions Preview */}
                        <div className="mt-12">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Discussions Récentes</h3>
                            <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
                                {recentDiscussions.map((discussion, idx) => (
                                    <div key={idx} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-between">
                                        <div>
                                            <div className="text-xs font-bold text-primary-600 mb-1 uppercase tracking-wide">
                                                {discussion.category}
                                            </div>
                                            <h4 className="text-lg font-bold text-gray-900 mb-1">{discussion.title}</h4>
                                            <div className="text-sm text-gray-500 flex items-center gap-2">
                                                <span>Par {discussion.author}</span>
                                                <span>•</span>
                                                <span>{discussion.time}</span>
                                            </div>
                                        </div>
                                        <div className="hidden md:flex flex-col items-center text-gray-400 bg-gray-50 px-4 py-2 rounded-lg">
                                            <span className="text-lg font-bold text-gray-700">{discussion.replies}</span>
                                            <span className="text-xs">réponses</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Rules & Info */}
                    <div className="space-y-8">
                        {/* Rules Card */}
                        <div className="bg-white rounded-2xl shadow-lg border-t-4 border-secondary-500 overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                    <ShieldCheck className="mr-2 text-secondary-500" />
                                    Charte du Forum
                                </h3>
                                <ul className="space-y-4">
                                    {[
                                        "Respect et bienveillance obligatoires",
                                        "Confidentialité des échanges (secret médical)",
                                        "Solidarité et entraide entre femmes",
                                        "Pas de publicité non sollicitée",
                                        "Échanges constructifs et professionnels"
                                    ].map((rule, idx) => (
                                        <li key={idx} className="flex items-start text-sm text-gray-600">
                                            <div className="min-w-[6px] h-[6px] rounded-full bg-secondary-400 mt-1.5 mr-3"></div>
                                            {rule}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-secondary-50 p-4 text-center">
                                <Link to="/about" className="text-secondary-700 text-sm font-semibold hover:underline">
                                    Lire la charte complète
                                </Link>
                            </div>
                        </div>

                        {/* Join CTA */}
                        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-white text-center">
                            <Users size={48} className="mx-auto mb-4 text-primary-200" />
                            <h3 className="text-xl font-bold mb-2">Pas encore membre ?</h3>
                            <p className="text-primary-100 text-sm mb-6">
                                Rejoignez l'ACAFEM pour accéder aux espaces privés et participer pleinement à la vie de l'association.
                            </p>
                            <Link to="/contact" className="inline-block w-full py-3 bg-white text-primary-700 font-bold rounded-xl hover:bg-primary-50 transition-colors">
                                Devenir membre
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forum
