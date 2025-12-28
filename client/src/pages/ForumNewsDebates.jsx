import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, MessageSquare, Newspaper, Plus } from 'lucide-react'
import NewDiscussionModal from '../components/NewDiscussionModal'

const discussions = [
    {
        id: 1,
        title: "Réforme de la CMU : Quels impacts pour nous ?",
        author: "Dr. L. Tendo",
        date: "Il y a 6 heures",
        replies: 42,
        views: 520,
        tags: ["CMU", "Politique"]
    },
    {
        id: 2,
        title: "Digitalisation du dossier patient : Pour ou contre ?",
        author: "Dr. S. Kuate",
        date: "Il y a 2 jours",
        replies: 56,
        views: 890,
        tags: ["Innovation", "Débat"]
    },
    {
        id: 3,
        title: "Revue de presse médicale - Décembre 2024",
        author: "Comité Communication",
        date: "Il y a 4 jours",
        replies: 5,
        views: 130,
        tags: ["Actu", "Revue"]
    }
]

function ForumNewsDebates() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="pt-24 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link to="/forum" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-4 transition-colors">
                        <ArrowLeft size={20} className="mr-2" />
                        Retour au Forum
                    </Link>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                                <Newspaper className="mr-3 text-blue-500" size={32} />
                                Actualités & Débats
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Politiques de santé, réformes du secteur et innovations médicales.
                            </p>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="btn bg-blue-600 text-white hover:bg-blue-700 flex items-center px-4 py-2 rounded-lg transition-colors"
                        >
                            <Plus size={20} className="mr-2" />
                            Lancer un débat
                        </button>
                    </div>
                </div>

                {/* Discussions List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="divide-y divide-gray-100">
                        {discussions.map((discussion) => (
                            <div key={discussion.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer">
                                <div className="flex-1 min-w-0 pr-4">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors truncate">
                                        {discussion.title}
                                    </h3>
                                    <div className="flex items-center text-sm text-gray-500 gap-4">
                                        <span className="font-medium text-gray-700">{discussion.author}</span>
                                        <span>•</span>
                                        <span>{discussion.date}</span>
                                        <div className="flex gap-2">
                                            {discussion.tags.map(tag => (
                                                <span key={tag} className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-xs">
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
                category="Actualités & Débats"
            />
        </div>
    )
}

export default ForumNewsDebates
