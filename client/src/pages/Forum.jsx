import { Link } from 'react-router-dom'
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
    MessageSquare
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
    return (
        <div className="pt-20 bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-800 to-primary-600 py-20 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1600&h=900&fit=crop')] bg-cover bg-center opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                        <MessageCircle size={32} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Forum Communautaire</h1>
                    <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8">
                        Un espace bienveillant d'échange, de partage d'expériences et de solidarité pour toutes les femmes médecins et sympathisants.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button className="btn bg-white text-primary-700 hover:bg-primary-50">
                            Commencer une discussion
                        </button>
                        <button className="btn border border-white text-white hover:bg-white/10">
                            Se connecter
                        </button>
                    </div>
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
