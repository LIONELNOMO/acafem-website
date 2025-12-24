import { useState } from 'react'
import {
    Calendar,
    Tag,
    ArrowRight,
    Search,
    Filter,
    Award,
    Users,
    BookOpen,
    Megaphone
} from 'lucide-react'

// Catégories
const categories = [
    "Toutes",
    "Événements",
    "Comptes-rendus",
    "Publications",
    "Nominations",
    "Partenariats",
    "Formations",
    "Candidatures"
]

// Données des articles actualisées avec les demandes
const newsData = [
    {
        id: 1,
        title: "Plan Stratégique ACAFEM 2025-2028 : Une nouvelle ère pour le leadership féminin en santé",
        excerpt: "Lancement officiel de notre feuille de route pour les 3 prochaines années. Découvrez nos 3 axes stratégiques, nos objectifs chiffrés et la mobilisation pour l'élection du nouveau Comité Exécutif.",
        category: "Événements",
        date: "20 Décembre 2024",
        author: "Comité Exécutif",
        image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=1200&h=600&fit=crop", // Image "Meeting stratégique"
        featured: true,
        tags: ["Stratégie", "Leadership", "Avenir"]
    },
    {
        id: 2,
        title: "Préparation du 2ème Congrès National des Femmes Médecins",
        excerpt: "En route vers 2030 : l'ACAFEM prépare son grand rassemblement scientifique. Appel à communications ouvert pour toutes les membres.",
        category: "Événements",
        date: "15 Janvier 2025",
        author: "Comité Scientifique",
        image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=600&h=400&fit=crop", // Conférence
        featured: false,
        tags: ["Congrès", "Science"]
    },
    {
        id: 3,
        title: "Formation Leadership : 500 nouvelles expertes formées",
        excerpt: "Retour sur notre session de formation intensive. Thématiques spéciales et développement de carrière au programme pour nos jeunes médecins.",
        category: "Formations",
        date: "10 Décembre 2024",
        author: "Pôle Formation",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop", // Femme noire leader
        featured: false,
        tags: ["Formation", "Mentorat"]
    },
    {
        id: 4,
        title: "Plaidoyer : Forum de haut niveau sur la santé maternelle",
        excerpt: "L'ACAFEM porte la voix des femmes médecins auprès des instances gouvernementales pour réduire la mortalité maternelle.",
        category: "Comptes-rendus",
        date: "05 Décembre 2024",
        author: "Commission Plaidoyer",
        image: "https://images.unsplash.com/photo-1576091160550-217358c71619?w=600&h=400&fit=crop", // Professionnels santé
        featured: false,
        tags: ["Plaidoyer", "Santé Publique"]
    },
    {
        id: 5,
        title: "Bienvenue à nos nouveaux membres !",
        excerpt: "L'ACAFEM s'agrandit ! Nous visons 244 membres d'ici 2028. Découvrez les profils de celles qui nous ont rejoints ce mois-ci.",
        category: "Nominations",
        date: "01 Décembre 2024",
        author: "Secrétariat Général",
        image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600&h=400&fit=crop", // Groupe femmes
        featured: false,
        tags: ["Membership", "Communauté"]
    },
    {
        id: 6,
        title: "Partenariat international avec l'AIFM",
        excerpt: "Renforcement de notre collaboration avec l'Association Internationale des Femmes Médecins pour des projets d'envergure.",
        category: "Partenariats",
        date: "28 Novembre 2024",
        author: "Relations Internationales",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop", // Poignée de main / Monde
        featured: false,
        tags: ["International", "Coopération"]
    }
]

function News() {
    const [activeCategory, setActiveCategory] = useState("Toutes")
    const featuredArticle = newsData.find(item => item.featured)
    const otherArticles = newsData.filter(item => !item.featured)

    const filteredArticles = activeCategory === "Toutes"
        ? otherArticles
        : otherArticles.filter(item => item.category === activeCategory)

    return (
        <div className="pt-20 bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-900 to-secondary-900 py-16 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Actualités & Événements</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Restez informée des dernières actions, réalisations et annonces de l'ACAFEM.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Featured Article */}
                {activeCategory === "Toutes" && featuredArticle && (
                    <div className="mb-16">
                        <div className="text-primary-600 font-bold tracking-wide uppercase text-sm mb-4 flex items-center">
                            <Megaphone size={16} className="mr-2" />
                            À la une • Article Stratégique
                        </div>
                        <article className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow flex flex-col md:flex-row group cursor-pointer">
                            <div className="md:w-1/2 relative overflow-hidden">
                                <img
                                    src={featuredArticle.image}
                                    alt={featuredArticle.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                                    {featuredArticle.category}
                                </div>
                            </div>
                            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                                <div className="flex items-center text-gray-500 text-sm mb-4">
                                    <Calendar size={16} className="mr-2" />
                                    {featuredArticle.date}
                                    <span className="mx-2">•</span>
                                    <Users size={16} className="mr-2" />
                                    {featuredArticle.author}
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight group-hover:text-primary-600 transition-colors">
                                    {featuredArticle.title}
                                </h2>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    {featuredArticle.excerpt}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {featuredArticle.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                                <button className="inline-flex items-center text-primary-600 font-bold hover:text-primary-700 text-lg group-hover:translate-x-2 transition-transform">
                                    Lire l'article complet
                                    <ArrowRight size={20} className="ml-2" />
                                </button>
                            </div>
                        </article>
                    </div>
                )}

                {/* Filters */}
                <div className="mb-12 border-b border-gray-200 pb-4 overflow-x-auto">
                    <div className="flex space-x-2 md:space-x-4 min-w-max">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${activeCategory === cat
                                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* News Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredArticles.map(article => (
                        <article key={article.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group border border-gray-100">
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-primary-700 px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm">
                                    {article.category}
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center text-gray-400 text-xs mb-3">
                                    <Calendar size={14} className="mr-1" />
                                    {article.date}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-primary-600 transition-colors line-clamp-2">
                                    {article.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                    <span className="text-xs font-medium text-gray-500">Par {article.author}</span>
                                    <button className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center">
                                        Lire plus <ArrowRight size={14} className="ml-1" />
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Empty State */}
                {filteredArticles.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                        <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-bold text-gray-900">Aucune actualité trouvée</h3>
                        <p className="text-gray-500">Essayez de sélectionner une autre catégorie.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default News
