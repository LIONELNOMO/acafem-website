import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, MessageSquare, Heart, Plus } from 'lucide-react'
import NewDiscussionModal from '../components/NewDiscussionModal'

const discussions = [
    {
        id: 1,
        title: "Nouveaux protocoles de prise en charge de l'éclampsie",
        author: "Pr. H. Gonsu",
        date: "Il y a 5 heures",
        replies: 8,
        views: 156,
        tags: ["Gynécologie", "Urgences"]
    },
    {
        id: 2,
        title: "Campagne de vaccination HPV : Retours terrain",
        author: "Dr. Lilian N.",
        date: "Il y a 1 jour",
        replies: 23,
        views: 310,
        tags: ["Santé Publique", "Prévention"]
    },
    {
        id: 3,
        title: "Prise en charge du diabète gestationnel en zone rurale",
        author: "Dr. Sophie M.",
        date: "Il y a 3 jours",
        replies: 12,
        views: 189,
        tags: ["Rural", "Diabète"]
    }
]

function ForumHealth() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="pt-24 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link to="/forum" className="inline-flex items-center text-gray-500 hover:text-red-600 mb-4 transition-colors">
                        <ArrowLeft size={20} className="mr-2" />
                        Retour au Forum
                    </Link>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                                <Heart className="mr-3 text-red-500" size={32} />
                                Questions Santé
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Échanges sur la santé reproductive, maternelle, VIH/SIDA et pratiques traditionnelles.
                            </p>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="btn bg-red-600 text-white hover:bg-red-700 flex items-center px-4 py-2 rounded-lg transition-colors"
                        >
                            <Plus size={20} className="mr-2" />
                            Poser une question
                        </button>
                    </div>
                </div>

                {/* Discussions List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="divide-y divide-gray-100">
                        {discussions.map((discussion) => (
                            <div key={discussion.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer">
                                <div className="flex-1 min-w-0 pr-4">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors truncate">
                                        {discussion.title}
                                    </h3>
                                    <div className="flex items-center text-sm text-gray-500 gap-4">
                                        <span className="font-medium text-gray-700">{discussion.author}</span>
                                        <span>•</span>
                                        <span>{discussion.date}</span>
                                        <div className="flex gap-2">
                                            {discussion.tags.map(tag => (
                                                <span key={tag} className="bg-red-50 text-red-600 px-2 py-0.5 rounded-full text-xs">
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
            </div>

            {/* Modal */}
            <NewDiscussionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                category="Questions Santé"
            />
        </div>
    )
}

export default ForumHealth
