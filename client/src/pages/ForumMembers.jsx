import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Send, Menu, Loader2, Lock, Paperclip } from 'lucide-react'
import { supabase } from '../lib/supabase'
import ChatSidebar from '../components/Chat/ChatSidebar'
import ChatBubble from '../components/Chat/ChatBubble'

function ForumMembers() {
    const [loading, setLoading] = useState(true)
    const [accessDenied, setAccessDenied] = useState(false)
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)

    // Chat State
    const [currentChannel, setCurrentChannel] = useState('general') // general, cas-cliniques, annonces
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [sending, setSending] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [uploading, setUploading] = useState(false)

    const messagesEndRef = useRef(null)
    const fileInputRef = useRef(null)

    useEffect(() => {
        checkAccess()
    }, [])

    useEffect(() => {
        if (profile) {
            fetchMessages()
            const unsubscribe = subscribeToMessages()
            return () => { unsubscribe() }
        }
    }, [currentChannel, profile])

    const checkAccess = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession()

            if (!session) {
                setAccessDenied(true)
                setLoading(false)
                return
            }

            setUser(session.user)

            const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single()

            if (!profileData || profileData.status !== 'approved' || profileData.type !== 'membre') {
                setAccessDenied(true)
            } else {
                setProfile(profileData)
            }
        } catch (error) {
            console.error('Auth check error:', error)
            setAccessDenied(true)
        } finally {
            setLoading(false)
        }
    }

    const subscribeToMessages = () => {
        const subscription = supabase
            .channel(`public:messages:${currentChannel}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `channel_id=eq.${currentChannel}`
            }, payload => {
                setMessages(prev => [...prev, payload.new])
                scrollToBottom()
            })
            .subscribe()

        return () => supabase.removeChannel(subscription)
    }

    const fetchMessages = async () => {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('channel_id', currentChannel)
            .order('created_at', { ascending: true })
            .limit(100)

        if (!error && data) {
            setMessages(data)
            scrollToBottom()
        }
    }

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
    }

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (!newMessage.trim() || sending) return

        setSending(true)
        try {
            const { error } = await supabase
                .from('messages')
                .insert([{
                    content: newMessage.trim(),
                    user_id: user.id,
                    channel_id: currentChannel,
                    created_at: new Date().toISOString()
                }])

            if (error) throw error
            setNewMessage('')
            scrollToBottom()
        } catch (error) {
            console.error('Error sending message:', error)
            alert("Erreur d'envoi: " + error.message)
        } finally {
            setSending(false)
        }
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        // Limit size (e.g. 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("Fichier trop volumineux (Max 5MB)")
            return
        }

        setUploading(true)
        try {
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${currentChannel}/${fileName}`

            // 1. Upload to Storage
            const { error: uploadError } = await supabase.storage
                .from('chat-uploads')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('chat-uploads')
                .getPublicUrl(filePath)

            // 3. Send Message with Attachment
            const { error: msgError } = await supabase
                .from('messages')
                .insert([{
                    content: "📎 " + file.name, // Display text
                    user_id: user.id,
                    channel_id: currentChannel,
                    file_url: publicUrl,
                    file_type: file.type, // Store MIME type
                    created_at: new Date().toISOString()
                }])

            if (msgError) throw msgError
            scrollToBottom()

        } catch (error) {
            console.error('Upload error:', error)
            alert("Erreur lors de l'upload: " + error.message)
        } finally {
            setUploading(false)
            e.target.value = null // Reset input
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
            </div>
        )
    }

    if (accessDenied) {
        return (
            <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
                <div className="max-w-md mx-auto text-center bg-white p-8 rounded-3xl shadow-lg">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="text-red-600" size={40} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Accès Réservé</h1>
                    <p className="text-gray-600 mb-8">
                        Cet espace de discussion est exclusivement réservé aux <strong>Membres Validés</strong> de l'ACAFEM (Médecins).
                    </p>
                    <div className="space-y-4">
                        <Link to="/connexion" className="block w-full py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors">
                            Se connecter
                        </Link>
                        <Link to="/forum" className="block w-full py-3 bg-white text-gray-700 font-bold rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors">
                            Retour au Forum
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="h-screen bg-gray-100 flex flex-col pt-16">
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <ChatSidebar
                    currentChannel={currentChannel}
                    onChangeChannel={setCurrentChannel}
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col bg-white w-full">
                    {/* Chat Header */}
                    <div className="h-16 border-b border-gray-200 flex items-center px-4 justify-between bg-white shadow-sm z-10">
                        <div className="flex items-center">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="mr-4 md:hidden text-gray-500 hover:text-gray-700"
                            >
                                <Menu size={24} />
                            </button>
                            <div>
                                <h2 className="font-bold text-gray-900 flex items-center">
                                    <span className="text-lg">#{currentChannel}</span>
                                </h2>
                                <p className="text-xs text-gray-500 hidden sm:block">
                                    Discussion sécurisée entre membres
                                </p>
                            </div>
                        </div>
                        <Link to="/forum" className="text-sm text-gray-500 hover:text-primary-600 flex items-center">
                            <ArrowLeft size={16} className="mr-1" />
                            <span className="hidden sm:inline">Quitter</span>
                        </Link>
                    </div>

                    {/* Messages List */}
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                        {messages.map((msg) => (
                            <ChatBubble
                                key={msg.id}
                                message={msg}
                                isMe={msg.user_id === user.id}
                                profile={msg.user_id === user.id ? profile : null} // Optimization: only pass my profile for "me", simplistic for others
                            />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-200">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-2 max-w-4xl mx-auto">
                            {/* Attachment Button */}
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className="p-3 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors disabled:opacity-50"
                                title="Joindre un fichier"
                            >
                                {uploading ? <Loader2 className="animate-spin" size={24} /> : <Paperclip size={24} />}
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                className="hidden"
                                accept="image/*,application/pdf"
                            />

                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder={`Envoyer un message dans #${currentChannel}...`}
                                className="flex-1 px-4 py-3 bg-gray-100 border-0 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!newMessage.trim() || sending}
                                className="p-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                {sending ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForumMembers
