import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Send, Heart, Loader2, User } from 'lucide-react'
import { supabase } from '../lib/supabase'
import ChatBubble from '../components/Chat/ChatBubble'

function ForumHealth() {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)

    // Chat State
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [sending, setSending] = useState(false)

    // Guest State
    const [isGuest, setIsGuest] = useState(false)
    const [guestName, setGuestName] = useState('')
    const [showGuestInput, setShowGuestInput] = useState(false)

    const messagesEndRef = useRef(null)
    const CHANNEL_ID = 'sante'

    // 1. Initialize Auth & Profile
    useEffect(() => {
        initSession()
    }, [])

    const initSession = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession()

            if (session) {
                // User Logged In
                setUser(session.user)
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single()

                if (profileData) setProfile(profileData)
            } else {
                // Visitor (Guest)
                setIsGuest(true)
                // Check if we have a stored guest name in localStorage
                const storedName = localStorage.getItem('acafem_guest_name')
                if (storedName) {
                    setGuestName(storedName)
                } else {
                    setShowGuestInput(true)
                }
            }

            // Load messages for everyone (Public Channel)
            fetchMessages()
            subscribeToMessages()

        } catch (error) {
            console.error('Init error:', error)
        } finally {
            setLoading(false)
        }
    }

    // 2. Real-time Subscription
    const subscribeToMessages = () => {
        const subscription = supabase
            .channel('public:messages:sante')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `channel_id=eq.${CHANNEL_ID}`
            }, payload => {
                setMessages(prev => [...prev, payload.new])
                scrollToBottom()
            })
            .subscribe()

        return () => supabase.removeChannel(subscription)
    }

    // 3. Fetch Messages
    const fetchMessages = async () => {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('channel_id', CHANNEL_ID)
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

    // 4. Send Message
    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (!newMessage.trim() || sending) return

        // If guest hasn't set a name yet, force them to
        if (isGuest && !guestName) {
            setShowGuestInput(true)
            return
        }

        setSending(true)
        try {
            const messageData = {
                content: newMessage.trim(),
                channel_id: CHANNEL_ID,
                created_at: new Date().toISOString()
            }

            if (user) {
                // Authenticated User
                messageData.user_id = user.id
                messageData.is_guest = false
            } else {
                // Guest User
                messageData.sender_name = guestName
                messageData.is_guest = true
                // user_id is nullable now
            }

            const { error } = await supabase
                .from('messages')
                .insert([messageData])

            if (error) throw error
            setNewMessage('')
            scrollToBottom()
        } catch (error) {
            console.error('Error sending message:', error)
            alert("Erreur: " + error.message)
        } finally {
            setSending(false)
        }
    }

    const handleGuestNameSubmit = (e) => {
        e.preventDefault()
        if (guestName.trim()) {
            localStorage.setItem('acafem_guest_name', guestName.trim())
            setShowGuestInput(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
            </div>
        )
    }

    return (
        <div className="h-screen bg-gray-50 flex flex-col pt-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm px-4 py-3 flex items-center justify-between z-10">
                <div className="flex items-center">
                    <Link to="/forum" className="mr-4 text-gray-500 hover:text-red-600 transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 flex items-center">
                            <Heart className="mr-2 text-red-500" size={24} />
                            Questions Santé
                        </h1>
                        <p className="text-xs text-gray-500">
                            Espace d'échange public • {isGuest ? (guestName ? `Invité: ${guestName}` : 'Visiteur') : `Connecté: Dr. ${profile?.nom || user.email}`}
                        </p>
                    </div>
                </div>

                {isGuest && guestName && (
                    <button
                        onClick={() => setShowGuestInput(true)}
                        className="text-xs text-blue-600 hover:underline"
                    >
                        Changer de nom
                    </button>
                )}
            </div>

            {/* Guest Name Modal/Overlay */}
            {isGuest && showGuestInput && (
                <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm animate-bounce-in">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <User className="text-red-500" size={32} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Bienvenue !</h2>
                            <p className="text-gray-600 text-sm">
                                Pour participer à la discussion, veuillez choisir un pseudonyme.
                            </p>
                        </div>
                        <form onSubmit={handleGuestNameSubmit}>
                            <input
                                type="text"
                                value={guestName}
                                onChange={(e) => setGuestName(e.target.value)}
                                placeholder="Votre nom ou pseudo..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 mb-4"
                                autoFocus
                                required
                            />
                            <button
                                type="submit"
                                className="w-full py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors"
                            >
                                Rejoindre la discussion
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                <div className="text-center py-8">
                    <div className="inline-block px-4 py-2 bg-red-50 rounded-full text-xs text-red-600 font-medium border border-red-100">
                        Bienvenue dans l'espace Questions Santé (Public)
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                        Cet espace est ouvert à tous. Soyez respectueux.
                    </p>
                </div>

                {messages.map((msg) => (
                    <ChatBubble
                        key={msg.id}
                        message={msg}
                        isMe={user ? msg.user_id === user.id : (msg.is_guest && msg.sender_name === guestName)}
                        // Profile logic:
                        // 1. If it's ME (User), use my profile
                        // 2. If it's a Guest message, profile is null (ChatBubble handles display via sender_name)
                        // 3. If it's another User, we don't have their profile loaded here without a join. 
                        //    Simplification: ChatBubble will show Initials or partial info if profile missing.
                        profile={msg.user_id === user?.id ? profile : null}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex gap-2 max-w-4xl mx-auto">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder={isGuest && !guestName ? "Entrez votre nom pour participer..." : "Posez votre question ou répondez..."}
                        className="flex-1 px-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                        onClick={() => {
                            if (isGuest && !guestName) setShowGuestInput(true)
                        }}
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim() || sending}
                        className="p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl"
                    >
                        {sending ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForumHealth
