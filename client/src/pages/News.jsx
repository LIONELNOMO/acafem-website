import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import {
    Calendar,
    ArrowRight,
    Users,
    Megaphone,
    BookOpen
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

// Article par défaut (Plan Stratégique) - sera affiché si aucun article featured n'existe
const defaultFeaturedArticle = {
    id: 0,
    title: "Plan Stratégique ACAFEM 2025-2028 : Une nouvelle ère pour le leadership féminin en santé",
    excerpt: "Lancement officiel de notre feuille de route pour les 3 prochaines années. Découvrez nos 3 axes stratégiques, nos objectifs chiffrés et la mobilisation pour l'élection du nouveau Comité Exécutif.",
    category: "Événements",
    created_at: "2024-12-20",
    author: "Comité Exécutif",
    image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=1200&h=600&fit=crop",
    featured: true
}

function News() {
    const [activeCategory, setActiveCategory] = useState("Toutes")
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)

    // Charger les articles depuis Supabase
    useEffect(() => {
        fetchArticles()
    }, [])

    const fetchArticles = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Erreur lors du chargement:', error)
            setArticles([])
        } else {
            setArticles(data || [])
        }
        setLoading(false)
    }

    // Filtrer les articles
    const filteredArticles = activeCategory === "Toutes"
        ? articles
        : articles.filter(item => item.category === activeCategory)

    // Formater la date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }

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
                {/* Featured Article (Statique) */}
                {activeCategory === "Toutes" && (
                    <div className="mb-16">
                        <div className="text-primary-600 font-bold tracking-wide uppercase text-sm mb-4 flex items-center">
                            <Megaphone size={16} className="mr-2" />
                            À la une • Article Stratégique
                        </div>
                        <article className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow flex flex-col md:flex-row group cursor-pointer">
                            <div className="md:w-1/2 relative overflow-hidden">
                                <img
                                    src={defaultFeaturedArticle.image}
                                    alt={defaultFeaturedArticle.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 min-h-[300px]"
                                />
                                <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                                    {defaultFeaturedArticle.category}
                                </div>
                            </div>
                            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                                <div className="flex items-center text-gray-500 text-sm mb-4">
                                    <Calendar size={16} className="mr-2" />
                                    {formatDate(defaultFeaturedArticle.created_at)}
                                    <span className="mx-2">•</span>
                                    <Users size={16} className="mr-2" />
                                    {defaultFeaturedArticle.author}
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight group-hover:text-primary-600 transition-colors">
                                    {defaultFeaturedArticle.title}
                                </h2>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    {defaultFeaturedArticle.excerpt}
                                </p>
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

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                        <p className="text-gray-500 mt-4">Chargement des actualités...</p>
                    </div>
                )}

                {/* News Grid */}
                {!loading && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredArticles.map(article => (
                            <article key={article.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group border border-gray-100">
                                <div className="relative h-56 overflow-hidden bg-gray-100">
                                    {article.image ? (
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-secondary-100">
                                            <BookOpen className="w-16 h-16 text-primary-300" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-primary-700 px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm">
                                        {article.category}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center text-gray-400 text-xs mb-3">
                                        <Calendar size={14} className="mr-1" />
                                        {formatDate(article.created_at)}
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
                )}

                {/* Empty State */}
                {!loading && filteredArticles.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                        <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-bold text-gray-900">Aucune actualité dans cette catégorie</h3>
                        <p className="text-gray-500">Les nouvelles actualités apparaîtront ici.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default News
