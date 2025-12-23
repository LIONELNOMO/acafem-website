import { useState } from 'react'
import {
    Calendar,
    Clock,
    User,
    ArrowRight,
    Search,
    Tag
} from 'lucide-react'

const newsData = [
    {
        id: 1,
        title: 'L\'ACAFEM lance sa nouvelle campagne nationale de dépistage',
        excerpt: 'Une initiative majeure pour améliorer l\'accès au dépistage du cancer du col de l\'utérus dans toutes les régions du Cameroun.',
        content: 'Lorem ipsum dolor sit amet...',
        category: 'Santé',
        author: 'Dr. Marie Nkolo',
        date: '15 Décembre 2024',
        readTime: '5 min',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=400&fit=crop',
        featured: true
    },
    {
        id: 2,
        title: 'Partenariat historique avec l\'OMS pour la santé maternelle',
        excerpt: 'L\'ACAFEM signe un accord de collaboration avec l\'Organisation Mondiale de la Santé pour renforcer ses programmes.',
        content: 'Lorem ipsum dolor sit amet...',
        category: 'Partenariat',
        author: 'Bureau ACAFEM',
        date: '10 Décembre 2024',
        readTime: '3 min',
        image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=400&fit=crop',
        featured: false
    },
    {
        id: 3,
        title: 'Formation de 200 sages-femmes dans la région de l\'Ouest',
        excerpt: 'Un programme intensif de formation continue pour améliorer les compétences des professionnels de santé.',
        content: 'Lorem ipsum dolor sit amet...',
        category: 'Formation',
        author: 'Dr. Jeanne Fotso',
        date: '5 Décembre 2024',
        readTime: '4 min',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop',
        featured: false
    },
    {
        id: 4,
        title: 'Journée mondiale de lutte contre le SIDA : l\'ACAFEM mobilisée',
        excerpt: 'Notre association a organisé des séances de sensibilisation et de dépistage gratuit dans 5 villes du pays.',
        content: 'Lorem ipsum dolor sit amet...',
        category: 'Événement',
        author: 'Bureau ACAFEM',
        date: '1 Décembre 2024',
        readTime: '6 min',
        image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&h=400&fit=crop',
        featured: false
    },
    {
        id: 5,
        title: 'Rapport d\'impact 2023 : des résultats exceptionnels',
        excerpt: 'Découvrez les réalisations de l\'ACAFEM au cours de l\'année écoulée et notre impact sur les communautés.',
        content: 'Lorem ipsum dolor sit amet...',
        category: 'Rapport',
        author: 'Bureau ACAFEM',
        date: '25 Novembre 2024',
        readTime: '8 min',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=400&fit=crop',
        featured: false
    },
    {
        id: 6,
        title: 'L\'ACAFEM au Forum National de la Santé',
        excerpt: 'Notre présidente a présenté nos recommandations pour améliorer les politiques de santé reproductive.',
        content: 'Lorem ipsum dolor sit amet...',
        category: 'Événement',
        author: 'Dr. Marie Nkolo',
        date: '20 Novembre 2024',
        readTime: '5 min',
        image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=400&fit=crop',
        featured: false
    }
]

const categories = ['Tous', 'Santé', 'Formation', 'Partenariat', 'Événement', 'Rapport']

function News() {
    const [selectedCategory, setSelectedCategory] = useState('Tous')
    const [searchTerm, setSearchTerm] = useState('')

    const featuredNews = newsData.find(n => n.featured)
    const regularNews = newsData.filter(n => !n.featured)

    const filteredNews = regularNews.filter(news => {
        const matchesCategory = selectedCategory === 'Tous' || news.category === selectedCategory
        const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            news.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="bg-gradient-to-br from-primary-600 to-secondary-600 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Actualités
                    </h1>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto">
                        Restez informé des dernières nouvelles et activités de l'ACAFEM.
                    </p>
                </div>
            </section>

            {/* Featured Article */}
            {featuredNews && (
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
                            <div className="grid lg:grid-cols-2">
                                <div className="relative h-64 lg:h-auto">
                                    <img
                                        src={featuredNews.image}
                                        alt={featuredNews.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-4 py-2 bg-accent-500 text-white text-sm font-bold rounded-full">
                                            À la Une
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 lg:p-12 flex flex-col justify-center">
                                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                                        <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full font-medium">
                                            {featuredNews.category}
                                        </span>
                                        <div className="flex items-center">
                                            <Calendar size={16} className="mr-1" />
                                            {featuredNews.date}
                                        </div>
                                    </div>
                                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                                        {featuredNews.title}
                                    </h2>
                                    <p className="text-gray-600 text-lg mb-6">
                                        {featuredNews.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                                <User size={20} className="text-primary-600" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{featuredNews.author}</div>
                                                <div className="text-sm text-gray-500 flex items-center">
                                                    <Clock size={14} className="mr-1" />
                                                    {featuredNews.readTime} de lecture
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn-primary">
                                            Lire l'article
                                            <ArrowRight size={18} className="ml-2" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Filters */}
            <section className="py-8 bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Rechercher un article..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
                            <Tag size={20} className="text-gray-400 flex-shrink-0" />
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === category
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* News Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredNews.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-gray-500 text-lg">Aucun article trouvé.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredNews.map((news) => (
                                <article key={news.id} className="card group cursor-pointer">
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={news.image}
                                            alt={news.title}
                                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary-600 text-xs font-medium rounded-full">
                                                {news.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                            <div className="flex items-center">
                                                <Calendar size={14} className="mr-1" />
                                                {news.date}
                                            </div>
                                            <div className="flex items-center">
                                                <Clock size={14} className="mr-1" />
                                                {news.readTime}
                                            </div>
                                        </div>

                                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                                            {news.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                            {news.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <User size={16} className="text-gray-500" />
                                                </div>
                                                <span className="text-sm text-gray-600">{news.author}</span>
                                            </div>
                                            <ArrowRight size={18} className="text-primary-500 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="flex justify-center mt-12">
                        <div className="flex items-center space-x-2">
                            <button className="w-10 h-10 rounded-lg bg-primary-500 text-white font-medium">1</button>
                            <button className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium">2</button>
                            <button className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium">3</button>
                            <span className="px-2 text-gray-400">...</span>
                            <button className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium">10</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default News
