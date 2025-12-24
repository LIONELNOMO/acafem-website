import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import {
    User,
    Mail,
    Phone,
    MapPin,
    BookOpen,
    GraduationCap,
    Building,
    CheckCircle,
    AlertCircle,
    ArrowRight,
    MessageCircle,
    Loader2,
    Sparkles
} from 'lucide-react'

// Liste des pays (principaux)
const pays = [
    "Cameroun",
    "France",
    "Belgique",
    "Suisse",
    "Canada",
    "États-Unis",
    "Côte d'Ivoire",
    "Sénégal",
    "Gabon",
    "Congo",
    "Maroc",
    "Tunisie",
    "Autre"
]

// Années d'études en médecine
const anneesEtude = [
    "1ère année",
    "2ème année",
    "3ème année",
    "4ème année",
    "5ème année",
    "6ème année",
    "7ème année",
    "Internat",
    "Résidanat"
]

function RegisterStudent() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        // Informations personnelles
        nom: '',
        prenom: '',
        email: '',
        password: '',
        confirmPassword: '',
        telephone: '',

        // Informations académiques
        universite: '',
        anneeEtude: '',

        // Localisation
        pays: 'Cameroun',
        ville: ''
    })

    // Gestion des changements de champs
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    // Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        // Validations
        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas')
            setLoading(false)
            return
        }

        if (formData.password.length < 6) {
            setError('Le mot de passe doit contenir au moins 6 caractères')
            setLoading(false)
            return
        }

        try {
            // 1. Créer le compte utilisateur avec Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        nom: formData.nom,
                        prenom: formData.prenom,
                        type: 'etudiant'
                    }
                }
            })

            if (authError) throw authError

            // 2. Créer le profil étudiante dans la table profiles
            const { error: profileError } = await supabase
                .from('profiles')
                .insert([{
                    id: authData.user.id,
                    type: 'etudiant',
                    status: 'pending',
                    nom: formData.nom,
                    prenom: formData.prenom,
                    email: formData.email,
                    telephone: formData.telephone,
                    universite: formData.universite,
                    annee_etude: formData.anneeEtude,
                    pays: formData.pays,
                    ville: formData.ville,
                    created_at: new Date().toISOString()
                }])

            if (profileError) throw profileError

            // Succès !
            setSuccess(true)

        } catch (err) {
            console.error('Erreur inscription:', err)
            setError(err.message || 'Une erreur est survenue lors de l\'inscription')
        } finally {
            setLoading(false)
        }
    }

    // Message de succès après inscription
    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 pt-24 pb-12 px-4">
                <div className="max-w-xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>

                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            Demande envoyée avec succès ! 🎉
                        </h1>

                        <p className="text-gray-600 mb-6">
                            Votre demande d'inscription au programme de tutorat a été enregistrée.
                            Notre équipe va analyser votre profil et vous recevrez une confirmation par email.
                        </p>

                        <div className="bg-secondary-50 rounded-xl p-6 mb-6">
                            <div className="flex items-center justify-center mb-4">
                                <Sparkles className="text-secondary-600 mr-2" size={24} />
                                <span className="font-bold text-secondary-800">Programme Tutorat ACAFEM</span>
                            </div>
                            <p className="text-sm text-secondary-700">
                                Une fois validée, vous aurez accès à notre réseau de médecins
                                mentors et aux ressources exclusives pour étudiantes.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <Link
                                to="/"
                                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                Retour à l'accueil
                            </Link>
                            <Link
                                to="/connexion"
                                className="flex-1 px-6 py-3 bg-secondary-600 text-white font-medium rounded-xl hover:bg-secondary-700 transition-colors"
                            >
                                Se connecter
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Formulaire d'inscription
    return (
        <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 pt-24 pb-12 px-4">
            <div className="max-w-xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center px-4 py-2 bg-secondary-100 rounded-full text-secondary-700 text-sm font-medium mb-4">
                        <GraduationCap size={16} className="mr-2" />
                        Programme Tutorat
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        S'inscrire au Tutorat
                    </h1>
                    <p className="text-gray-600">
                        Bénéficiez de l'accompagnement de femmes médecins expérimentées
                    </p>
                </div>

                {/* Formulaire */}
                <div className="bg-white rounded-3xl shadow-xl p-8">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-start">
                            <AlertCircle size={20} className="mr-3 flex-shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Section: Informations Personnelles */}
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                <User className="mr-2 text-secondary-500" size={20} />
                                Informations Personnelles
                            </h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nom *
                                    </label>
                                    <input
                                        type="text"
                                        name="nom"
                                        value={formData.nom}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                                        placeholder="NGUEFACK"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Prénom *
                                    </label>
                                    <input
                                        type="text"
                                        name="prenom"
                                        value={formData.prenom}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                                        placeholder="Joëlle"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        <Mail size={14} className="inline mr-1" />
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                                        placeholder="joelle.nguefack@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        <Phone size={14} className="inline mr-1" />
                                        Téléphone *
                                    </label>
                                    <input
                                        type="tel"
                                        name="telephone"
                                        value={formData.telephone}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                                        placeholder="+237 6XX XXX XXX"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Mot de passe *
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        minLength={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Confirmer le mot de passe *
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section: Informations Académiques */}
                        <div className="pt-6 border-t">
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                <BookOpen className="mr-2 text-primary-500" size={20} />
                                Informations Académiques
                            </h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        <Building size={14} className="inline mr-1" />
                                        Université / Faculté *
                                    </label>
                                    <input
                                        type="text"
                                        name="universite"
                                        value={formData.universite}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                                        placeholder="FMSB Yaoundé"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Année d'étude *
                                    </label>
                                    <select
                                        name="anneeEtude"
                                        value={formData.anneeEtude}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                                    >
                                        <option value="">Sélectionnez...</option>
                                        {anneesEtude.map(a => (
                                            <option key={a} value={a}>{a}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Section: Localisation */}
                        <div className="pt-6 border-t">
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                <MapPin className="mr-2 text-accent-500" size={20} />
                                Pays de Résidence
                            </h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Pays *
                                    </label>
                                    <select
                                        name="pays"
                                        value={formData.pays}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                                    >
                                        {pays.map(p => (
                                            <option key={p} value={p}>{p}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Ville *
                                    </label>
                                    <input
                                        type="text"
                                        name="ville"
                                        value={formData.ville}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                                        placeholder="Yaoundé"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Bouton de soumission */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-secondary-600 text-white font-bold rounded-xl hover:bg-secondary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin mr-2" size={20} />
                                        Envoi en cours...
                                    </>
                                ) : (
                                    <>
                                        S'inscrire au Programme Tutorat
                                        <ArrowRight className="ml-2" size={20} />
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Lien vers connexion */}
                        <p className="text-center text-gray-600 text-sm">
                            Déjà inscrite ?{' '}
                            <Link to="/connexion" className="text-secondary-600 font-medium hover:underline">
                                Se connecter
                            </Link>
                        </p>
                    </form>
                </div>

                {/* Info contact */}
                <div className="mt-6 bg-primary-50 rounded-2xl p-6 border border-primary-200">
                    <div className="flex items-start">
                        <MessageCircle className="text-primary-600 mr-4 flex-shrink-0" size={24} />
                        <div>
                            <h3 className="font-bold text-primary-800 mb-1">
                                Besoin d'informations ?
                            </h3>
                            <p className="text-sm text-primary-700 mb-3">
                                Pour toute question sur le programme de tutorat,
                                n'hésitez pas à nous contacter.
                            </p>
                            <a
                                href="https://wa.me/237699598514?text=Bonjour,%20j'ai%20une%20question%20concernant%20le%20programme%20de%20tutorat%20ACAFEM."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm font-medium text-primary-700 hover:text-primary-800"
                            >
                                <MessageCircle size={16} className="mr-1" />
                                +237 699 598 514
                            </a>
                        </div>
                    </div>
                </div>

                {/* Lien vers inscription membre */}
                <div className="mt-4 text-center">
                    <p className="text-gray-600 text-sm">
                        Vous êtes déjà médecin ?{' '}
                        <Link to="/inscription-membre" className="text-primary-600 font-medium hover:underline">
                            Devenir membre ACAFEM →
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RegisterStudent
