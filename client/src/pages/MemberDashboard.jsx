import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import {
    User,
    LogOut,
    CreditCard,
    Calendar,
    FileText,
    Users,
    Stethoscope,
    GraduationCap,
    MapPin,
    Phone,
    Mail,
    Award,
    CheckCircle,
    Clock,
    Loader2
} from 'lucide-react'

function MemberDashboard() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        try {
            // Vérifier la session
            const { data: { session } } = await supabase.auth.getSession()

            if (!session) {
                navigate('/connexion')
                return
            }

            setUser(session.user)

            // Récupérer le profil
            const { data: profileData, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single()

            if (error) throw error

            // Vérifier le statut
            if (profileData.status !== 'approved') {
                await supabase.auth.signOut()
                navigate('/connexion')
                return
            }

            setProfile(profileData)
        } catch (err) {
            console.error('Erreur:', err)
            navigate('/connexion')
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate('/')
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-primary-500 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Chargement...</p>
                </div>
            </div>
        )
    }

    if (!profile) {
        return null
    }

    const isMember = profile.type === 'membre'

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Bienvenue, {profile.prenom} ! 👋
                        </h1>
                        <p className="text-gray-600 mt-1">
                            {isMember ? 'Espace Membre ACAFEM' : 'Programme Tutorat ACAFEM'}
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="mt-4 md:mt-0 flex items-center px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut size={18} className="mr-2" />
                        Déconnexion
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Carte Membre Virtuelle */}
                    <div className="lg:col-span-1">
                        <div className={`rounded-3xl p-6 shadow-xl text-white ${isMember
                                ? 'bg-gradient-to-br from-primary-600 to-primary-800'
                                : 'bg-gradient-to-br from-secondary-600 to-secondary-800'
                            }`}>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                    {isMember ? (
                                        <Stethoscope className="mr-2" size={24} />
                                    ) : (
                                        <GraduationCap className="mr-2" size={24} />
                                    )}
                                    <span className="font-bold">ACAFEM</span>
                                </div>
                                <div className="text-xs bg-white/20 px-2 py-1 rounded-full">
                                    {isMember ? 'MEMBRE' : 'TUTORAT'}
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="text-2xl font-bold">
                                    {profile.prenom} {profile.nom}
                                </div>
                                {isMember && profile.specialite && (
                                    <div className="text-white/80 mt-1">
                                        {profile.specialite}
                                    </div>
                                )}
                                {!isMember && profile.universite && (
                                    <div className="text-white/80 mt-1">
                                        {profile.universite}
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                {isMember && profile.numero_ordre && (
                                    <div>
                                        <div className="text-white/60 text-xs">N° Ordre</div>
                                        <div className="font-medium">{profile.numero_ordre}</div>
                                    </div>
                                )}
                                {!isMember && profile.annee_etude && (
                                    <div>
                                        <div className="text-white/60 text-xs">Année</div>
                                        <div className="font-medium">{profile.annee_etude}</div>
                                    </div>
                                )}
                                <div>
                                    <div className="text-white/60 text-xs">Région</div>
                                    <div className="font-medium">{profile.region || profile.ville}</div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between">
                                <div className="flex items-center text-xs text-white/60">
                                    <CheckCircle size={14} className="mr-1 text-green-300" />
                                    Membre vérifié
                                </div>
                                <div className="text-xs text-white/60">
                                    Depuis {new Date(profile.created_at).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                                </div>
                            </div>
                        </div>

                        {/* Infos de contact */}
                        <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-4">Mes informations</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center text-gray-600">
                                    <Mail size={16} className="mr-3 text-gray-400" />
                                    {profile.email}
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Phone size={16} className="mr-3 text-gray-400" />
                                    {profile.telephone}
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <MapPin size={16} className="mr-3 text-gray-400" />
                                    {profile.ville}, {profile.pays}
                                </div>
                                {isMember && profile.annees_experience && (
                                    <div className="flex items-center text-gray-600">
                                        <Award size={16} className="mr-3 text-gray-400" />
                                        {profile.annees_experience} ans d'expérience
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Contenu principal */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Actions rapides */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Calendar className="text-primary-600" size={24} />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1">Événements</h3>
                                <p className="text-sm text-gray-600">
                                    Consultez les prochains événements et inscrivez-vous
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                                <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Users className="text-secondary-600" size={24} />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1">
                                    {isMember ? 'Annuaire' : 'Mentors'}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {isMember
                                        ? 'Trouvez d\'autres membres ACAFEM'
                                        : 'Découvrez les médecins mentors disponibles'
                                    }
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <FileText className="text-accent-600" size={24} />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1">Ressources</h3>
                                <p className="text-sm text-gray-600">
                                    Accédez aux documents et ressources exclusifs
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <User className="text-yellow-600" size={24} />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1">Mon profil</h3>
                                <p className="text-sm text-gray-600">
                                    Modifiez vos informations personnelles
                                </p>
                            </div>
                        </div>

                        {/* Actualités récentes */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-gray-900">Actualités membres</h3>
                                <Link to="/actualites" className="text-sm text-primary-600 hover:underline">
                                    Voir tout
                                </Link>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start p-4 bg-gray-50 rounded-xl">
                                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                                        <Calendar className="text-primary-600" size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Bienvenue dans l'espace membre !</h4>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Votre compte a été validé. Vous avez maintenant accès à toutes les fonctionnalités réservées aux membres.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start p-4 bg-gray-50 rounded-xl">
                                    <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                                        <Clock className="text-secondary-600" size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Nouvelles fonctionnalités à venir</h4>
                                        <p className="text-sm text-gray-600 mt-1">
                                            L'annuaire des membres et le forum seront bientôt disponibles. Restez connectée !
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MemberDashboard
