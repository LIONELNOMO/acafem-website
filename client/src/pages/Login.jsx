import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import {
    Mail,
    Lock,
    LogIn,
    AlertCircle,
    Loader2,
    Clock,
    CheckCircle,
    XCircle,
    Stethoscope,
    GraduationCap
} from 'lucide-react'

function Login() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [pendingMessage, setPendingMessage] = useState('')

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    // Vérifier si déjà connecté
    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (session) {
                // Vérifier le statut du profil
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('status, type')
                    .eq('id', session.user.id)
                    .single()

                if (profile?.status === 'approved') {
                    navigate('/espace-membre')
                }
            }
        }
        checkSession()
    }, [navigate])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setPendingMessage('')
        setLoading(true)

        try {
            // 1. Se connecter avec Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password
            })

            if (authError) {
                if (authError.message.includes('Invalid login credentials')) {
                    throw new Error('Email ou mot de passe incorrect')
                }
                throw authError
            }

            // 2. Vérifier le statut du profil
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('status, type, nom, prenom')
                .eq('id', authData.user.id)
                .single()

            if (profileError) {
                // Le profil n'existe pas encore
                throw new Error('Profil non trouvé. Veuillez contacter l\'administration.')
            }

            // 3. Gérer selon le statut
            switch (profile.status) {
                case 'pending':
                    // Déconnecter et afficher message
                    await supabase.auth.signOut()
                    setPendingMessage(`Bonjour ${profile.prenom}, votre demande d'inscription est en cours d'analyse. Veuillez patienter, notre équipe vérifie vos informations.`)
                    break

                case 'rejected':
                    // Déconnecter et afficher message
                    await supabase.auth.signOut()
                    setError('Votre demande d\'inscription a été refusée. Veuillez contacter l\'administration pour plus d\'informations.')
                    break

                case 'approved':
                    // Rediriger vers l'espace membre
                    navigate('/espace-membre')
                    break

                default:
                    throw new Error('Statut de compte inconnu')
            }

        } catch (err) {
            console.error('Erreur connexion:', err)
            setError(err.message || 'Une erreur est survenue')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center px-4 pt-20">
            <div className="max-w-md w-full">
                {/* Card principale */}
                <div className="bg-white rounded-3xl shadow-xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <LogIn className="w-8 h-8 text-primary-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Connexion
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Accédez à votre espace ACAFEM
                        </p>
                    </div>

                    {/* Message d'erreur */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-start">
                            <XCircle size={20} className="mr-3 flex-shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Message d'attente */}
                    {pendingMessage && (
                        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-800 flex items-start">
                            <Clock size={20} className="mr-3 flex-shrink-0 mt-0.5 text-yellow-600" />
                            <div>
                                <p className="font-medium mb-1">Demande en cours d'analyse</p>
                                <p className="text-sm">{pendingMessage}</p>
                            </div>
                        </div>
                    )}

                    {/* Formulaire */}
                    {!pendingMessage && (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <Mail size={14} className="inline mr-1" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="votre@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <Lock size={14} className="inline mr-1" />
                                    Mot de passe
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin mr-2" size={20} />
                                        Connexion...
                                    </>
                                ) : (
                                    <>
                                        Se connecter
                                        <LogIn className="ml-2" size={20} />
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    {/* Bouton réessayer si en attente */}
                    {pendingMessage && (
                        <button
                            onClick={() => setPendingMessage('')}
                            className="w-full py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            Réessayer avec un autre compte
                        </button>
                    )}
                </div>

                {/* Options d'inscription */}
                <div className="mt-8 grid gap-4">
                    <p className="text-center text-gray-600 text-sm">
                        Pas encore de compte ?
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                        <Link
                            to="/inscription-membre"
                            className="flex items-center justify-center px-4 py-4 bg-white rounded-xl border-2 border-gray-200 hover:border-primary-400 hover:bg-primary-50 transition-all group"
                        >
                            <Stethoscope className="mr-2 text-primary-500 group-hover:scale-110 transition-transform" size={20} />
                            <div className="text-left">
                                <div className="font-bold text-gray-900 text-sm">Devenir Membre</div>
                                <div className="text-xs text-gray-500">Pour les médecins</div>
                            </div>
                        </Link>

                        <Link
                            to="/inscription-etudiant"
                            className="flex items-center justify-center px-4 py-4 bg-white rounded-xl border-2 border-gray-200 hover:border-secondary-400 hover:bg-secondary-50 transition-all group"
                        >
                            <GraduationCap className="mr-2 text-secondary-500 group-hover:scale-110 transition-transform" size={20} />
                            <div className="text-left">
                                <div className="font-bold text-gray-900 text-sm">Programme Tutorat</div>
                                <div className="text-xs text-gray-500">Pour les étudiantes</div>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Lien retour */}
                <div className="mt-6 text-center">
                    <Link to="/" className="text-sm text-gray-500 hover:text-primary-600">
                        ← Retour à l'accueil
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login
