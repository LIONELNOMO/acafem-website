import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import {
    User,
    Mail,
    Phone,
    MapPin,
    Stethoscope,
    Award,
    Calendar,
    FileText,
    Upload,
    CheckCircle,
    AlertCircle,
    ArrowRight,
    MessageCircle,
    Loader2
} from 'lucide-react'

// Spécialités médicales disponibles
const specialites = [
    "Médecine Générale",
    "Cardiologie",
    "Pédiatrie",
    "Gynécologie-Obstétrique",
    "Chirurgie Générale",
    "Dermatologie",
    "Ophtalmologie",
    "ORL",
    "Neurologie",
    "Psychiatrie",
    "Radiologie",
    "Anesthésie-Réanimation",
    "Médecine Interne",
    "Pneumologie",
    "Gastro-entérologie",
    "Néphrologie",
    "Endocrinologie",
    "Rhumatologie",
    "Oncologie",
    "Autre"
]

// Régions du Cameroun
const regions = [
    "Adamaoua",
    "Centre",
    "Est",
    "Extrême-Nord",
    "Littoral",
    "Nord",
    "Nord-Ouest",
    "Ouest",
    "Sud",
    "Sud-Ouest"
]

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
    "Autre"
]

function RegisterMember() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const [uploading, setUploading] = useState(false)

    const [formData, setFormData] = useState({
        // Informations personnelles
        nom: '',
        prenom: '',
        email: '',
        password: '',
        confirmPassword: '',
        telephone: '',

        // Informations professionnelles
        specialite: '',
        numeroOrdre: '',
        anneesExperience: '',

        // Localisation
        pays: 'Cameroun',
        region: '',
        ville: '',

        // Document
        documentAttestation: null,
        documentUrl: ''
    })

    // Gestion des changements de champs
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    // Upload du document d'attestation
    const handleDocumentUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        // Vérifier le type (image ou PDF)
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
        if (!validTypes.includes(file.type)) {
            setError('Veuillez sélectionner une image (JPG, PNG) ou un PDF')
            return
        }

        // Vérifier la taille (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('Le fichier ne doit pas dépasser 5 Mo')
            return
        }

        setUploading(true)
        setError('')

        // Générer un nom unique
        const fileExt = file.name.split('.').pop()
        const fileName = `attestations/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

        const { data, error: uploadError } = await supabase.storage
            .from('documents')
            .upload(fileName, file)

        if (uploadError) {
            setError('Erreur lors du téléchargement: ' + uploadError.message)
            setUploading(false)
            return
        }

        // Récupérer l'URL publique
        const { data: urlData } = supabase.storage
            .from('documents')
            .getPublicUrl(fileName)

        setFormData(prev => ({
            ...prev,
            documentAttestation: file,
            documentUrl: urlData.publicUrl
        }))
        setUploading(false)
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

        if (!formData.documentUrl) {
            setError('Veuillez télécharger un document attestant votre statut de médecin')
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
                        type: 'membre'
                    }
                }
            })

            if (authError) throw authError

            // 2. Créer le profil membre dans la table profiles
            const { error: profileError } = await supabase
                .from('profiles')
                .insert([{
                    id: authData.user.id,
                    type: 'membre',
                    status: 'pending',
                    nom: formData.nom,
                    prenom: formData.prenom,
                    email: formData.email,
                    telephone: formData.telephone,
                    specialite: formData.specialite,
                    numero_ordre: formData.numeroOrdre,
                    annees_experience: parseInt(formData.anneesExperience),
                    pays: formData.pays,
                    region: formData.region,
                    ville: formData.ville,
                    document_attestation: formData.documentUrl,
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
            <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 pt-24 pb-12 px-4">
                <div className="max-w-xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>

                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            Demande envoyée avec succès ! 🎉
                        </h1>

                        <p className="text-gray-600 mb-6">
                            Votre demande d'adhésion a été enregistrée. Notre équipe va analyser
                            vos informations et vous recevrez une confirmation par email.
                        </p>

                        <div className="bg-primary-50 rounded-xl p-6 mb-6">
                            <p className="text-sm text-primary-800 mb-4">
                                <strong>Prochaine étape :</strong> Contactez notre Secrétaire Générale
                                Adjointe sur WhatsApp pour les informations concernant la cotisation.
                            </p>

                            <a
                                href="https://wa.me/237699598514?text=Bonjour,%20je%20viens%20de%20soumettre%20ma%20demande%20d'adhésion%20à%20l'ACAFEM.%20Je%20souhaiterais%20avoir%20des%20informations%20sur%20la%20cotisation."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-full px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors"
                            >
                                <MessageCircle className="mr-2" size={20} />
                                Contacter sur WhatsApp
                            </a>
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
                                className="flex-1 px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors"
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
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 pt-24 pb-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-medium mb-4">
                        <Stethoscope size={16} className="mr-2" />
                        Espace Médecins
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Devenir Membre ACAFEM
                    </h1>
                    <p className="text-gray-600">
                        Rejoignez notre communauté de femmes médecins camerounaises
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
                                <User className="mr-2 text-primary-500" size={20} />
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
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        placeholder="KAMGA"
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
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        placeholder="Marie"
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
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        placeholder="marie.kamga@email.com"
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
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section: Informations Professionnelles */}
                        <div className="pt-6 border-t">
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                <Award className="mr-2 text-secondary-500" size={20} />
                                Informations Professionnelles
                            </h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Spécialité *
                                    </label>
                                    <select
                                        name="specialite"
                                        value={formData.specialite}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    >
                                        <option value="">Sélectionnez...</option>
                                        {specialites.map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        N° Ordre des Médecins *
                                    </label>
                                    <input
                                        type="text"
                                        name="numeroOrdre"
                                        value={formData.numeroOrdre}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        placeholder="Ex: ONMC-12345"
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <Calendar size={14} className="inline mr-1" />
                                    Années d'expérience *
                                </label>
                                <input
                                    type="number"
                                    name="anneesExperience"
                                    value={formData.anneesExperience}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    max="60"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="Ex: 5"
                                />
                            </div>

                            {/* Upload Document */}
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <FileText size={14} className="inline mr-1" />
                                    Document attestant votre statut de médecin *
                                </label>
                                <p className="text-xs text-gray-500 mb-2">
                                    Carte de l'Ordre, diplôme, ou autre document officiel (JPG, PNG, PDF - max 5Mo)
                                </p>

                                <label className={`flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${formData.documentUrl
                                        ? 'border-green-400 bg-green-50'
                                        : 'border-gray-300 hover:border-primary-400 hover:bg-primary-50'
                                    }`}>
                                    {uploading ? (
                                        <div className="flex items-center text-gray-600">
                                            <Loader2 className="animate-spin mr-2" size={20} />
                                            <span>Téléchargement en cours...</span>
                                        </div>
                                    ) : formData.documentUrl ? (
                                        <div className="flex items-center text-green-600">
                                            <CheckCircle className="mr-2" size={20} />
                                            <span>Document téléchargé ✓</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center text-gray-600">
                                            <Upload className="mr-2" size={20} />
                                            <span>Cliquez pour télécharger un document</span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*,.pdf"
                                        onChange={handleDocumentUpload}
                                        className="hidden"
                                        disabled={uploading}
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Section: Localisation */}
                        <div className="pt-6 border-t">
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                <MapPin className="mr-2 text-accent-500" size={20} />
                                Localisation
                            </h2>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Pays *
                                    </label>
                                    <select
                                        name="pays"
                                        value={formData.pays}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    >
                                        {pays.map(p => (
                                            <option key={p} value={p}>{p}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Région {formData.pays === 'Cameroun' && '*'}
                                    </label>
                                    {formData.pays === 'Cameroun' ? (
                                        <select
                                            name="region"
                                            value={formData.region}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        >
                                            <option value="">Sélectionnez...</option>
                                            {regions.map(r => (
                                                <option key={r} value={r}>{r}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            name="region"
                                            value={formData.region}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            placeholder="Région/Province"
                                        />
                                    )}
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
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        placeholder="Yaoundé"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Bouton de soumission */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={loading || uploading}
                                className="w-full py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin mr-2" size={20} />
                                        Envoi en cours...
                                    </>
                                ) : (
                                    <>
                                        Soumettre ma demande d'adhésion
                                        <ArrowRight className="ml-2" size={20} />
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Lien vers connexion */}
                        <p className="text-center text-gray-600 text-sm">
                            Déjà membre ?{' '}
                            <Link to="/connexion" className="text-primary-600 font-medium hover:underline">
                                Se connecter
                            </Link>
                        </p>
                    </form>
                </div>

                {/* Info WhatsApp */}
                <div className="mt-6 bg-green-50 rounded-2xl p-6 border border-green-200">
                    <div className="flex items-start">
                        <MessageCircle className="text-green-600 mr-4 flex-shrink-0" size={24} />
                        <div>
                            <h3 className="font-bold text-green-800 mb-1">
                                Une question sur l'adhésion ?
                            </h3>
                            <p className="text-sm text-green-700 mb-3">
                                Contactez notre Secrétaire Générale Adjointe sur WhatsApp pour
                                toute information concernant la cotisation et le processus d'adhésion.
                            </p>
                            <a
                                href="https://wa.me/237699598514?text=Bonjour,%20j'ai%20une%20question%20concernant%20l'adhésion%20à%20l'ACAFEM."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm font-medium text-green-700 hover:text-green-800"
                            >
                                <MessageCircle size={16} className="mr-1" />
                                +237 699 598 514
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterMember
