import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, MessageSquare, Briefcase, Plus } from 'lucide-react'
import NewDiscussionModal from '../components/NewDiscussionModal'

const discussions = [
    {
        id: 1,
        title: "Comment concilier gardes de nuit et vie de famille ?",
        author: "Dr. E. Mballa",
        date: "Il y a 2 heures",
        replies: 12,
        views: 245,
        tags: ["Équilibre", "Témoignage"]
    },
    {
        id: 2,
        title: "Programme de mentorat 2025 : Appel à candidatures",
        author: "Dr. P. Nkomo",
        date: "Il y a 4 jours",
        replies: 45,
        views: 890,
        tags: ["Mentorat", "Annonce"]
    },
    {
        id: 3,
        title: "Négocier son salaire en clinique privée",
        author: "Dr. A. Fouda",
        date: "Il y a 1 semaine",
        replies: 28,
        views: 560,
        tags: ["Carrière", "Finances"]
    }
]

function ForumLeadership() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="pt-24 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link to="/forum" className="inline-flex items-center text-gray-500 hover:text-yellow-600 mb-4 transition-colors">
                        <ArrowLeft size={20} className="mr-2" />
                        Retour au Forum
                    </Link>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                                <Briefcase className="mr-3 text-yellow-500" size={32} />
                                Leadership & Carrière
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Mentorat, opportunités de formation et équilibre vie professionnelle/personnelle.
                            </p>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="btn bg-yellow-500 text-white hover:bg-yellow-600 flex items-center px-4 py-2 rounded-lg transition-colors"
                        >
                            <Plus size={20} className="mr-2" />
                            Nouveau Sujet
                        </button>
                    </div>
                </div>

                {/* Discussions List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="divide-y divide-gray-100">
                        {discussions.map((discussion) => (
                            <div key={discussion.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer">
                                <div className="flex-1 min-w-0 pr-4">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-yellow-600 transition-colors truncate">
                                        {discussion.title}
                                    </h3>
                                    <div className="flex items-center text-sm text-gray-500 gap-4">
                                        <span className="font-medium text-gray-700">{discussion.author}</span>
                                        <span>•</span>
                                        <span>{discussion.date}</span>
                                        <div className="flex gap-2">
                                            {discussion.tags.map(tag => (
                                                <span key={tag} className="bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full text-xs">
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
                    category="Leadership & Carrière"
                />
            </div>
        </div>
    )
}

export default ForumLeadership
