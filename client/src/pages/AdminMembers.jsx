import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import {
    Lock,
    LogOut,
    Users,
    FileText,
    CheckCircle,
    XCircle,
    AlertCircle,
    Clock,
    Eye,
    Stethoscope,
    GraduationCap,
    MapPin,
    Mail,
    Phone,
    Calendar,
    Award,
    Loader2
} from 'lucide-react'

// Mot de passe admin (à améliorer avec Supabase Auth plus tard)
const ADMIN_PASSWORD = "ACAFEM2025"

function AdminMembers() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const [pendingMembers, setPendingMembers] = useState([])
    const [approvedMembers, setApprovedMembers] = useState([])
    const [activeTab, setActiveTab] = useState('pending')
    const [selectedMember, setSelectedMember] = useState(null)
    const [processingId, setProcessingId] = useState(null)

    // Vérifier si déjà connecté
    useEffect(() => {
        const auth = localStorage.getItem('acafem_admin_auth')
        if (auth === 'true') {
            setIsAuthenticated(true)
            fetchMembers()
        }
    }, [])

    // Récupérer les membres
    const fetchMembers = async () => {
        setLoading(true)

        // Membres en attente
        const { data: pending, error: pendingError } = await supabase
            .from('profiles')
            .select('*')
            .eq('status', 'pending')
            .order('created_at', { ascending: false })

        if (pendingError) {
            console.error('Erreur:', pendingError)
        } else {
            setPendingMembers(pending || [])
        }

        // Membres approuvés
        const { data: approved, error: approvedError } = await supabase
            .from('profiles')
            .select('*')
            .eq('status', 'approved')
            .order('created_at', { ascending: false })

        if (approvedError) {
            console.error('Erreur:', approvedError)
        } else {
            setApprovedMembers(approved || [])
        }

        setLoading(false)
    }

    // Connexion
    const handleLogin = (e) => {
        e.preventDefault()
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true)
            localStorage.setItem('acafem_admin_auth', 'true')
            setError('')
            fetchMembers()
        } else {
            setError('Mot de passe incorrect')
        }
    }

    // Déconnexion
    const handleLogout = () => {
        setIsAuthenticated(false)
        localStorage.removeItem('acafem_admin_auth')
    }

    // Valider un membre
    const handleApprove = async (id) => {
        setProcessingId(id)
        const { error } = await supabase
            .from('profiles')
            .update({ status: 'approved' })
            .eq('id', id)

        if (error) {
            setError('Erreur lors de la validation')
        } else {
            setSuccess('Membre validé avec succès !')
            fetchMembers()
            setSelectedMember(null)
        }
        setProcessingId(null)
    }

    // Refuser un membre
    const handleReject = async (id) => {
        if (!confirm('Êtes-vous sûr de vouloir refuser cette demande ?')) return

        setProcessingId(id)
        const { error } = await supabase
            .from('profiles')
            .update({ status: 'rejected' })
            .eq('id', id)

        if (error) {
            setError('Erreur lors du refus')
        } else {
            setSuccess('Demande refusée')
            fetchMembers()
            setSelectedMember(null)
        }
        setProcessingId(null)
    }

    // Format date
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    // PAGE DE CONNEXION
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 to-primary-700 px-4">
                <div className="bg-white rounded-3xl p-10 shadow-2xl max-w-md w-full">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock className="w-10 h-10 text-primary-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
                        <p className="text-gray-500 mt-2">Gestion des Membres ACAFEM</p>
                    </div>

                    <form onSubmit={handleLogin}>
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center">
                                <AlertCircle size={16} className="mr-2" />
                                {error}
                            </div>
                        )}

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="Entrez le mot de passe"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors"
                        >
                            Se connecter
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    // PAGE ADMIN
    return (
        <div className="min-h-screen bg-gray-100 pt-20">
            {/* Header */}
            <div className="bg-white shadow-sm border-b sticky top-20 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-900 flex items-center">
                        <Users className="mr-2 text-primary-500" />
                        Gestion des Membres
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut size={18} className="mr-2" />
                        Déconnexion
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Messages */}
                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-center">
                        <AlertCircle size={20} className="mr-3" />
                        {error}
                        <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-red-600">×</button>
                    </div>
                )}
                {success && (
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-600 flex items-center">
                        <CheckCircle size={20} className="mr-3" />
                        {success}
                        <button onClick={() => setSuccess('')} className="ml-auto text-green-400 hover:text-green-600">×</button>
                    </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mr-4">
                                <Clock className="text-yellow-600" size={24} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{pendingMembers.length}</div>
                                <div className="text-sm text-gray-500">En attente</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                                <CheckCircle className="text-green-600" size={24} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{approvedMembers.length}</div>
                                <div className="text-sm text-gray-500">Validés</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                                <Stethoscope className="text-primary-600" size={24} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {approvedMembers.filter(m => m.type === 'membre').length}
                                </div>
                                <div className="text-sm text-gray-500">Médecins</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mr-4">
                                <GraduationCap className="text-secondary-600" size={24} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {approvedMembers.filter(m => m.type === 'etudiant').length}
                                </div>
                                <div className="text-sm text-gray-500">Étudiantes</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab('pending')}
                        className={`px-6 py-3 rounded-xl font-medium transition-colors flex items-center ${activeTab === 'pending'
                                ? 'bg-yellow-500 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Clock size={18} className="mr-2" />
                        En attente ({pendingMembers.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('approved')}
                        className={`px-6 py-3 rounded-xl font-medium transition-colors flex items-center ${activeTab === 'approved'
                                ? 'bg-green-500 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <CheckCircle size={18} className="mr-2" />
                        Validés ({approvedMembers.length})
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Liste des membres */}
                    <div className="lg:col-span-2">
                        {loading && (
                            <div className="text-center py-12">
                                <Loader2 className="w-8 h-8 text-primary-500 animate-spin mx-auto" />
                            </div>
                        )}

                        {!loading && activeTab === 'pending' && pendingMembers.length === 0 && (
                            <div className="bg-white rounded-2xl p-12 text-center">
                                <CheckCircle className="w-16 h-16 text-green-300 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-gray-900">Aucune demande en attente</h3>
                                <p className="text-gray-500">Toutes les demandes ont été traitées.</p>
                            </div>
                        )}

                        <div className="space-y-4">
                            {(activeTab === 'pending' ? pendingMembers : approvedMembers).map((member) => (
                                <div
                                    key={member.id}
                                    onClick={() => setSelectedMember(member)}
                                    className={`bg-white rounded-xl p-4 shadow-sm cursor-pointer transition-all hover:shadow-md ${selectedMember?.id === member.id ? 'ring-2 ring-primary-500' : ''
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${member.type === 'membre' ? 'bg-primary-100' : 'bg-secondary-100'
                                                }`}>
                                                {member.type === 'membre' ? (
                                                    <Stethoscope className="text-primary-600" size={20} />
                                                ) : (
                                                    <GraduationCap className="text-secondary-600" size={20} />
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900">
                                                    {member.prenom} {member.nom}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {member.type === 'membre' ? member.specialite : member.universite}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`text-xs font-bold px-2 py-1 rounded-full ${member.type === 'membre'
                                                    ? 'bg-primary-100 text-primary-700'
                                                    : 'bg-secondary-100 text-secondary-700'
                                                }`}>
                                                {member.type === 'membre' ? 'MÉDECIN' : 'ÉTUDIANTE'}
                                            </div>
                                            <div className="text-xs text-gray-400 mt-1">
                                                {formatDate(member.created_at)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Détails du membre sélectionné */}
                    <div className="lg:col-span-1">
                        {selectedMember ? (
                            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-40">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-bold text-gray-900">Détails</h3>
                                    <button
                                        onClick={() => setSelectedMember(null)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        ×
                                    </button>
                                </div>

                                <div className="space-y-4 text-sm">
                                    <div className="flex items-center">
                                        <Mail size={16} className="mr-3 text-gray-400" />
                                        <span>{selectedMember.email}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Phone size={16} className="mr-3 text-gray-400" />
                                        <span>{selectedMember.telephone}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin size={16} className="mr-3 text-gray-400" />
                                        <span>{selectedMember.ville}, {selectedMember.pays}</span>
                                    </div>
                                    {selectedMember.type === 'membre' && (
                                        <>
                                            <div className="flex items-center">
                                                <Award size={16} className="mr-3 text-gray-400" />
                                                <span>N° Ordre: {selectedMember.numero_ordre}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Calendar size={16} className="mr-3 text-gray-400" />
                                                <span>{selectedMember.annees_experience} ans d'expérience</span>
                                            </div>
                                            {selectedMember.document_attestation && (
                                                <div className="pt-4 border-t">
                                                    <a
                                                        href={selectedMember.document_attestation}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center text-primary-600 hover:underline"
                                                    >
                                                        <FileText size={16} className="mr-2" />
                                                        Voir le document attestation
                                                    </a>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {selectedMember.type === 'etudiant' && (
                                        <div className="flex items-center">
                                            <GraduationCap size={16} className="mr-3 text-gray-400" />
                                            <span>{selectedMember.annee_etude}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                {selectedMember.status === 'pending' && (
                                    <div className="flex gap-3 mt-6 pt-6 border-t">
                                        <button
                                            onClick={() => handleApprove(selectedMember.id)}
                                            disabled={processingId === selectedMember.id}
                                            className="flex-1 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center justify-center"
                                        >
                                            {processingId === selectedMember.id ? (
                                                <Loader2 className="animate-spin" size={20} />
                                            ) : (
                                                <>
                                                    <CheckCircle size={18} className="mr-2" />
                                                    Valider
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => handleReject(selectedMember.id)}
                                            disabled={processingId === selectedMember.id}
                                            className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center"
                                        >
                                            <XCircle size={18} className="mr-2" />
                                            Refuser
                                        </button>
                                    </div>
                                )}

                                {selectedMember.status === 'approved' && (
                                    <div className="mt-6 pt-6 border-t">
                                        <div className="flex items-center text-green-600 bg-green-50 px-4 py-3 rounded-xl">
                                            <CheckCircle size={18} className="mr-2" />
                                            Membre validé
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="bg-gray-100 rounded-2xl p-8 text-center border-2 border-dashed border-gray-300">
                                <Eye className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500">
                                    Sélectionnez un membre pour voir les détails
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminMembers
