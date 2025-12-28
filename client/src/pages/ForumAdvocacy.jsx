import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, MessageSquare, Megaphone, Plus } from 'lucide-react'
import NewDiscussionModal from '../components/NewDiscussionModal'

const discussions = [
    {
        id: 1,
        title: "Appel à témoignages : Violences en milieu hospitalier",
        author: "Commission Éthique",
        date: "Hier",
        replies: 24,
        views: 410,
        tags: ["VBG", "Témoignage"]
    },
    {
        id: 2,
        title: "Écart salarial : Préparation du rapport annuel",
        author: "Dr. C. Nsahlai",
        date: "Il y a 3 jours",
        replies: 18,
        views: 220,
        tags: ["Salaires", "Équité"]
    },
    {
        id: 3,
        title: "Harcèlement moral : Quels recours ?",
        author: "Anonyme",
        date: "Il y a 1 semaine",
        replies: 35,
        views: 670,
        tags: ["Juridique", "Harcèlement"]
    }
]

function ForumAdvocacy() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="pt-24 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link to="/forum" className="inline-flex items-center text-gray-500 hover:text-purple-600 mb-4 transition-colors">
                        <ArrowLeft size={20} className="mr-2" />
                        Retour au Forum
                    </Link>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                                <Megaphone className="mr-3 text-purple-500" size={32} />
                                Plaidoyer & Engagement
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Lutte contre les violences, équité salariale et droits des femmes médecins.
                            </p>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="btn bg-purple-600 text-white hover:bg-purple-700 flex items-center px-4 py-2 rounded-lg transition-colors"
                        >
                            <Plus size={20} className="mr-2" />
                            Lancer une action
                        </button>
                    </div>
                </div>

                {/* Discussions List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="divide-y divide-gray-100">
                        {discussions.map((discussion) => (
                            <div key={discussion.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer">
                                <div className="flex-1 min-w-0 pr-4">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors truncate">
                                        {discussion.title}
                                    </h3>
                                    <div className="flex items-center text-sm text-gray-500 gap-4">
                                        <span className="font-medium text-gray-700">{discussion.author}</span>
                                        <span>•</span>
                                        <span>{discussion.date}</span>
                                        <div className="flex gap-2">
                                            {discussion.tags.map(tag => (
                                                <span key={tag} className="bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full text-xs">
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
                    category="Plaidoyer & Engagement"
                />
            </div>
        </div>
    )
}

export default ForumAdvocacy
