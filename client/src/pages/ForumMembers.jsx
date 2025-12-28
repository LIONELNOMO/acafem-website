import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, MessageSquare, Lock, Users, Plus } from 'lucide-react'
import NewDiscussionModal from '../components/NewDiscussionModal'

// Données simulées pour les discussions
const discussions = [
    {
        id: 1,
        title: "Retours d'expérience : Installation en cabinet privé",
        author: "Dr. Sarah N.",
        date: "Il y a 2 jours",
        replies: 15,
        views: 120,
        tags: ["Installation", "Privé"]
    },
    {
        id: 2,
        title: "Opportunité de remplacement - Région Centre",
        author: "Dr. Marie K.",
        date: "Il y a 3 jours",
        replies: 5,
        views: 89,
        tags: ["Annonce", "Remplacement"]
    },
    {
        id: 3,
        title: "Conseils pour le concours de spécialisation",
        author: "Dr. Jeanne B.",
        date: "Il y a 1 semaine",
        replies: 34,
        views: 450,
        tags: ["Formation", "Spécialisation"]
    }
]

function ForumMembers() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="pt-24 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link to="/forum" className="inline-flex items-center text-gray-500 hover:text-primary-600 mb-4 transition-colors">
                        <ArrowLeft size={20} className="mr-2" />
                        Retour au Forum
                    </Link>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                                <Users className="mr-3 text-primary-500" size={32} />
                                Espace Membres
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Discussions réservées, partage de ressources et témoignages entre consoeurs.
                            </p>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="btn-primary flex items-center"
                        >
                            <Plus size={20} className="mr-2" />
                            Nouvelle Discussion
                        </button>
                    </div>
                </div>

                {/* Warning / Info Banner */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded-r-lg">
                    <div className="flex items-start">
                        <Lock className="text-blue-500 mt-1 mr-3 flex-shrink-0" size={20} />
                        <div>
                            <h3 className="font-bold text-blue-900">Espace Privé</h3>
                            <p className="text-blue-700 text-sm">
                                Cet espace est strictement réservé aux membres validés de l'ACAFEM.
                                Veuillez respecter la confidentialité des échanges.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Discussions List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="divide-y divide-gray-100">
                        {discussions.map((discussion) => (
                            <div key={discussion.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer">
                                <div className="flex-1 min-w-0 pr-4">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors truncate">
                                        {discussion.title}
                                    </h3>
                                    <div className="flex items-center text-sm text-gray-500 gap-4">
                                        <span className="font-medium text-gray-700">{discussion.author}</span>
                                        <span>•</span>
                                        <span>{discussion.date}</span>
                                        <div className="flex gap-2">
                                            {discussion.tags.map(tag => (
                                                <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 text-gray-400">
                                    <div className="text-center">
                                        <span className="block font-bold text-gray-700 text-lg">{discussion.replies}</span>
                                        <span className="text-xs">réponses</span>
                                    </div>
                                    <div className="text-center hidden sm:block">
                                        <span className="block font-bold text-gray-700 text-lg">{discussion.views}</span>
                                        <span className="text-xs">vues</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modal */}
                <NewDiscussionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    category="Espace Membres"
                />
            </div>
        </div>
    )
}

export default ForumMembers
