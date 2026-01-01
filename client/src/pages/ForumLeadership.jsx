import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Briefcase, Plus, Lock, User, GraduationCap, Stethoscope, Send, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

function ForumLeadership() {
    const [loading, setLoading] = useState(true)
    const [accessDenied, setAccessDenied] = useState(false)
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)

    // Posts State (Using 'messages' table but treated as posts)
    const [posts, setPosts] = useState([])
    const [newPost, setNewPost] = useState('')
    const [sending, setSending] = useState(false)
    const CHANNEL_ID = 'leadership'

    useEffect(() => {
        checkAccess()
    }, [])

    const checkAccess = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession()

            if (!session) {
                setAccessDenied(true)
                setLoading(false)
                return
            }

            setUser(session.user)

            // Fetch Profile to check Role & Status
            const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single()

            if (!profileData || profileData.status !== 'approved' || (profileData.type !== 'membre' && profileData.type !== 'etudiant')) {
                setAccessDenied(true) // Only Approved Members & Students
            } else {
                setProfile(profileData)
                fetchPosts()
                subscribeToPosts()
            }
        } catch (error) {
            console.error('Auth check error:', error)
            setAccessDenied(true)
        } finally {
            setLoading(false)
        }
    }

    const subscribeToPosts = () => {
        const subscription = supabase
            .channel('public:messages:leadership')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `channel_id=eq.${CHANNEL_ID}`
            }, payload => {
                // Fetch the full profile for the new post author if needed
                // For simplicity, we just add it. In a real app we'd join dynamically.
                setPosts(prev => [payload.new, ...prev])
            })
            .subscribe()

        return () => supabase.removeChannel(subscription)
    }

    const fetchPosts = async () => {
        // Here we ideally want to join with profiles to get author info.
        // Supabase JS doesn't do deep joins easily without a View. 
        // We will fetch messages and then valid profiles, OR just fetch messages 
        // and rely on a client-side fetch for authors if we want to be perfect.
        // For this version: We fetch messages.

        const { data, error } = await supabase
            .from('messages')
            .select(`
                *,
                profiles:user_id (nom, prenom, type, specialite, universite)
            `)
            .eq('channel_id', CHANNEL_ID)
            .order('created_at', { ascending: false })
            .limit(50)

        if (!error && data) {
            setPosts(data)
        }
    }

    const handleSendPost = async (e) => {
        e.preventDefault()
        if (!newPost.trim() || sending) return

        setSending(true)
        try {
            const { error } = await supabase
                .from('messages')
                .insert([{
                    content: newPost.trim(),
                    channel_id: CHANNEL_ID,
                    user_id: user.id
                }])

            if (error) throw error
            setNewPost('')
            // Auto update handled by realtime
        } catch (error) {
            alert("Erreur: " + error.message)
        } finally {
            setSending(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" />
            </div>
        )
    }

    // --- ACCESS DENIED VIEW ---
    if (accessDenied) {
        return (
            <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="text-gray-400" size={48} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Accès Réservé</h1>
                    <p className="text-xl text-gray-600 mb-8">
                        L'espace <strong>Leadership & Carrière</strong> est exclusivement réservé aux membres validés et aux étudiants du programme de tutorat.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 text-left">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-lg mb-2 flex items-center">
                                <Stethoscope className="mr-2 text-primary-600" size={20} />
                                Médecins
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">
                                Rejoignez le réseau ACAFEM pour accéder aux offres et au mentorat.
                            </p>
                            <Link to="/inscription-membre" className="text-primary-600 font-bold hover:underline">
                                Devenir Membre →
                            </Link>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-lg mb-2 flex items-center">
                                <GraduationCap className="mr-2 text-secondary-600" size={20} />
                                Étudiantes
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">
                                Inscrivez-vous au programme de tutorat pour booster votre carrière.
                            </p>
                            <Link to="/inscription-etudiant" className="text-secondary-600 font-bold hover:underline">
                                S'inscrire au Tutorat →
                            </Link>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Link to="/connexion" className="btn bg-gray-900 text-white px-8 py-3 rounded-xl hover:bg-black transition-colors">
                            Se connecter
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    // --- MAIN DASHBOARD VIEW ---
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8">
                    <Link to="/forum" className="inline-flex items-center text-gray-500 hover:text-yellow-600 mb-4 transition-colors">
                        <ArrowLeft size={20} className="mr-2" />
                        Retour au Forum
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                                <Briefcase className="mr-3 text-yellow-500" size={32} />
                                Leadership & Carrière
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Opportunités, Offres de Mentorat et Conseils Carrière.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow-sm border text-gray-700">
                                {profile?.type === 'membre' ? '👩‍⚕️ Médecin' : '🎓 Étudiante'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Input Area (New Opportunity) */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
                    <div className="flex gap-4">
                        <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 font-bold">
                                {profile?.prenom[0]}{profile?.nom[0]}
                            </div>
                        </div>
                        <div className="flex-1">
                            <textarea
                                value={newPost}
                                onChange={(e) => setNewPost(e.target.value)}
                                placeholder="Partagez une opportunité, une offre de mentorat ou posez une question..."
                                className="w-full border-0 bg-transparent resize-none focus:ring-0 text-lg placeholder-gray-400 min-h-[80px]"
                            />
                            <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-2">
                                <div className="text-xs text-gray-400">
                                    Visible par tous les membres et étudiantes
                                </div>
                                <button
                                    onClick={handleSendPost}
                                    disabled={!newPost.trim() || sending}
                                    className="bg-yellow-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-yellow-600 transition-colors disabled:opacity-50 flex items-center"
                                >
                                    {sending ? <Loader2 className="animate-spin mr-2" size={18} /> : <Send size={18} className="mr-2" />}
                                    Publier
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid Layout for Posts */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow flex flex-col">
                            {/* Author */}
                            <div className="flex items-center mb-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 ${post.profiles?.type === 'membre' ? 'bg-primary-600' : 'bg-secondary-600'
                                    }`}>
                                    {post.profiles?.prenom?.[0] || '?'}{post.profiles?.nom?.[0] || '?'}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm">
                                        {post.profiles?.prenom} {post.profiles?.nom}
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        {post.profiles?.type === 'membre'
                                            ? post.profiles.specialite || 'Médecin'
                                            : `Étudiante • ${post.profiles?.universite || 'FMSB'}`
                                        }
                                    </p>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
                                    {post.content}
                                </p>
                            </div>

                            {/* Footer */}
                            <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-end text-xs text-gray-400">
                                <div>
                                    {new Date(post.created_at).toLocaleDateString()}
                                </div>
                                <div className="flex gap-2">
                                    <span className="px-2 py-1 bg-gray-100 rounded text-gray-600 cursor-pointer hover:bg-gray-200">
                                        Contacter
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {posts.length === 0 && (
                        <div className="col-span-full py-12 text-center text-gray-400">
                            Aucune publication pour le moment. Soyez la première !
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default ForumLeadership
