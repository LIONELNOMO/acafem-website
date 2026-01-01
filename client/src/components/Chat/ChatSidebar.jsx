import React from 'react'
import { Hash, Activity, Lock, Volume2 } from 'lucide-react'

export default function ChatSidebar({ currentChannel, onChangeChannel, isOpen, onClose }) {

    const channels = [
        { id: 'general', name: 'Général', icon: Hash, desc: 'Discussions diverses' },
        { id: 'cas-cliniques', name: 'Cas Cliniques', icon: Activity, desc: 'Avis & Diagnostics' },
        { id: 'annonces', name: 'Annonces', icon: Volume2, desc: 'Infos officielles' },
    ]

    return (
        <div className={`
            fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out
            md:relative md:translate-x-0
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <h2 className="font-bold text-lg flex items-center">
                    <span className="bg-primary-500 w-2 h-2 rounded-full mr-2"></span>
                    Salons ACAFEM
                </h2>
                {/* Mobile close button */}
                <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white">
                    ✕
                </button>
            </div>

            <div className="p-4 space-y-6">
                <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
                        Salons Disponibles
                    </h3>
                    <div className="space-y-1">
                        {channels.map(channel => (
                            <button
                                key={channel.id}
                                onClick={() => {
                                    onChangeChannel(channel.id)
                                    if (window.innerWidth < 768) onClose()
                                }}
                                className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${currentChannel === channel.id
                                        ? 'bg-primary-600 text-white'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`}
                            >
                                <channel.icon size={18} className="mr-3" />
                                <div className="text-left">
                                    <div className="font-medium">#{channel.name}</div>
                                    <div className="text-[10px] opacity-70">{channel.desc}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-800 px-2">
                    <div className="flex items-center text-gray-400 text-sm">
                        <Lock size={14} className="mr-2" />
                        Connexion chiffrée
                    </div>
                </div>
            </div>
        </div>
    )
}
