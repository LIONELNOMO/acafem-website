import React from 'react'

export default function ChatBubble({ message, isMe, profile }) {
    return (
        <div className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}>
            {!isMe && (
                <div className="flex-shrink-0 mr-3">
                    {profile?.photo_url ? (
                        <img
                            src={profile.photo_url}
                            alt={profile.nom}
                            className="w-8 h-8 rounded-full object-cover border border-gray-200"
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xs">
                            {profile?.prenom?.[0]}{profile?.nom?.[0]}
                        </div>
                    )}
                </div>
            )}

            <div className={`max-w-[70%] sm:max-w-[60%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                {!isMe && (
                    <span className="text-xs text-gray-500 mb-1 ml-1">
                        Dr. {profile?.nom} • {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                )}

                <div className={`px-4 py-2 rounded-2xl shadow-sm text-sm break-words relative group ${isMe
                    ? 'bg-primary-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                    }`}>
                    {/* Media Display */}
                    {message.file_url && (
                        <div className="mb-2">
                            {message.file_type?.startsWith('image/') ? (
                                <a href={message.file_url} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={message.file_url}
                                        alt="attachment"
                                        className="max-w-[200px] max-h-[200px] rounded-lg border border-white/20 object-cover cursor-zoom-in hover:opacity-90 transition-opacity"
                                    />
                                </a>
                            ) : (
                                <a
                                    href={message.file_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-2 p-2 rounded-lg border ${isMe ? 'bg-primary-700 border-primary-500' : 'bg-gray-50 border-gray-200'} hover:opacity-80 transition-opacity`}
                                >
                                    <div className="p-1 bg-white/20 rounded">📄</div>
                                    <span className="underline truncate max-w-[150px]">Voir le fichier</span>
                                </a>
                            )}
                        </div>
                    )}

                    {message.content}

                    {/* Timestamp for own messages inside bubble */}
                    {isMe && (
                        <div className="text-[10px] text-primary-200 text-right mt-1 opacity-70">
                            {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
