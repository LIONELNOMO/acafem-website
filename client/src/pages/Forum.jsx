import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    MessageCircle,
    ThumbsUp,
    Eye,
    Clock,
    User,
    Search,
    Plus,
    Crown,
    Pin,
    CheckCircle,
    Filter,
    ChevronRight,
    Send
} from 'lucide-react'

const forumTopics = [
    {
        id: 1,
        title: 'Conseils pour un suivi de grossesse réussi',
        author: 'Dr. Marie Nkolo',
        authorRole: 'president',
        avatar: 'https://i.pravatar.cc/100?img=47',
        category: 'Santé Maternelle',
        replies: 24,
        views: 156,
        lastActivity: 'Il y a 2 heures',
        isPinned: true,
        excerpt: 'Voici les points essentiels à respecter pour un suivi de grossesse optimal...'
    },
    {
        id: 2,
        title: 'Questions sur la contraception moderne',
        author: 'Jeanne M.',
        authorRole: 'member',
        avatar: 'https://i.pravatar.cc/100?img=5',
        category: 'Planning Familial',
        replies: 18,
        views: 89,
        lastActivity: 'Il y a 5 heures',
        isPinned: false,
        excerpt: 'Je souhaiterais avoir des informations sur les différentes méthodes contraceptives...'
    },
    {
        id: 3,
        title: 'Mon expérience avec la campagne de dépistage ACAFEM',
        author: 'Patricia K.',
        authorRole: 'member',
        avatar: 'https://i.pravatar.cc/100?img=9',
        category: 'Témoignage',
        replies: 31,
        views: 234,
        lastActivity: 'Il y a 1 jour',
        isPinned: true,
        excerpt: 'Je voulais partager mon témoignage après avoir participé à la campagne...'
    },
    {
        id: 4,
        title: 'Comment prévenir les infections sexuellement transmissibles ?',
        author: 'Dr. Pascaline F.',
        authorRole: 'doctor',
        avatar: 'https://i.pravatar.cc/100?img=44',
        category: 'Prévention',
        replies: 42,
        views: 312,
        lastActivity: 'Il y a 2 jours',
        isPinned: false,
        excerpt: 'Un guide complet sur les méthodes de prévention des IST...'
    },
    {
        id: 5,
        title: 'Alimentation pendant la grossesse : vos conseils ?',
        author: 'Nicole A.',
        authorRole: 'member',
        avatar: 'https://i.pravatar.cc/100?img=12',
        category: 'Santé Maternelle',
        replies: 28,
        views: 145,
        lastActivity: 'Il y a 3 jours',
        isPinned: false,
        excerpt: 'Je suis enceinte de 3 mois et j\'aimerais avoir vos conseils sur l\'alimentation...'
    },
    {
        id: 6,
        title: 'Réponses aux questions fréquentes sur le cancer du sein',
        author: 'Dr. Marie Nkolo',
        authorRole: 'president',
        avatar: 'https://i.pravatar.cc/100?img=47',
        category: 'Prévention',
        replies: 56,
        views: 421,
        lastActivity: 'Il y a 4 jours',
        isPinned: true,
        excerpt: 'Suite à vos nombreuses questions, voici un récapitulatif sur le dépistage...'
    }
]

const categories = ['Tous', 'Santé Maternelle', 'Planning Familial', 'Prévention', 'Témoignage']

function getRoleBadge(role) {
    switch (role) {
        case 'president':
            return (
                <span className="inline-flex items-center px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full">
                    <Crown size={12} className="mr-1" />
                    Présidente
                </span>
            )
        case 'doctor':
            return (
                <span className="inline-flex items-center px-2 py-0.5 bg-primary-500 text-white text-xs font-bold rounded-full">
                    <CheckCircle size={12} className="mr-1" />
                    Médecin
                </span>
            )
        default:
            return null
    }
}

function Forum() {
    const [selectedCategory, setSelectedCategory] = useState('Tous')
    const [searchTerm, setSearchTerm] = useState('')

    const pinnedTopics = forumTopics.filter(t => t.isPinned)
    const regularTopics = forumTopics.filter(t => !t.isPinned)

    const filteredTopics = regularTopics.filter(topic => {
        const matchesCategory = selectedCategory === 'Tous' || topic.category === selectedCategory
        const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="bg-gradient-to-br from-primary-600 to-secondary-600 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Forum Communautaire
                            </h1>
                            <p className="text-xl text-white/80 max-w-2xl">
                                Échangez avec notre communauté et posez vos questions à nos experts.
                            </p>
                        </div>
                        <button className="mt-6 md:mt-0 btn-primary bg-white text-primary-600 hover:bg-gray-100">
                            <Plus size={18} className="mr-2" />
                            Nouvelle Discussion
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <div className="text-2xl font-bold text-gray-900">1,234</div>
                            <div className="text-gray-500 text-sm">Discussions</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">5,678</div>
                            <div className="text-gray-500 text-sm">Réponses</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">890</div>
                            <div className="text-gray-500 text-sm">Membres</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-primary-600">Dr. Marie N.</div>
                            <div className="text-gray-500 text-sm">Présidente active</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters */}
            <section className="py-6 bg-gray-50 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Rechercher une discussion..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
                            <Filter size={20} className="text-gray-400 flex-shrink-0" />
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === category
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-white text-gray-600 hover:bg-gray-100 border'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Forum Content */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Pinned Topics */}
                    {pinnedTopics.length > 0 && selectedCategory === 'Tous' && (
                        <div className="mb-8">
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                <Pin size={20} className="mr-2 text-primary-500" />
                                Discussions épinglées
                            </h2>
                            <div className="space-y-4">
                                {pinnedTopics.map((topic) => (
                                    <TopicCard key={topic.id} topic={topic} isPinned />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Regular Topics */}
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-4">
                            {selectedCategory === 'Tous' ? 'Toutes les discussions' : selectedCategory}
                        </h2>

                        {filteredTopics.length === 0 ? (
                            <div className="text-center py-16 bg-white rounded-2xl">
                                <MessageCircle size={48} className="mx-auto text-gray-300 mb-4" />
                                <p className="text-gray-500">Aucune discussion trouvée.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredTopics.map((topic) => (
                                    <TopicCard key={topic.id} topic={topic} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-12 bg-primary-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Vous avez une question ?
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Notre présidente et nos médecins membres sont là pour vous répondre.
                    </p>
                    <button className="btn-primary">
                        <Send size={18} className="mr-2" />
                        Poser une question
                    </button>
                </div>
            </section>
        </div>
    )
}

function TopicCard({ topic, isPinned = false }) {
    return (
        <div className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer border ${isPinned ? 'border-primary-200 bg-primary-50/30' : 'border-gray-100'
            }`}>
            <div className="flex items-start space-x-4">
                {/* Avatar */}
                <img
                    src={topic.avatar}
                    alt={topic.author}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-2 mb-2">
                        {isPinned && (
                            <Pin size={14} className="text-primary-500" />
                        )}
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                            {topic.category}
                        </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 hover:text-primary-600 transition-colors mb-1">
                        {topic.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-1 mb-3">
                        {topic.excerpt}
                    </p>

                    <div className="flex items-center flex-wrap gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-600">{topic.author}</span>
                            {getRoleBadge(topic.authorRole)}
                        </div>
                        <div className="flex items-center text-gray-500">
                            <Clock size={14} className="mr-1" />
                            {topic.lastActivity}
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="hidden sm:flex flex-col items-end space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                        <MessageCircle size={16} className="mr-1" />
                        {topic.replies}
                    </div>
                    <div className="flex items-center">
                        <Eye size={16} className="mr-1" />
                        {topic.views}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forum
