import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import {
    Lock,
    LogOut,
    PlusCircle,
    Trash2,
    Edit,
    Save,
    X,
    Image,
    FileText,
    CheckCircle,
    AlertCircle,
    Upload,
    Users,
    MessageSquare,
    Mail
} from 'lucide-react'

// Mot de passe admin (à changer en production !)
const ADMIN_PASSWORD = "ACAFEM2025"

const categories = [
    "Événements",
    "Comptes-rendus",
    "Publications",
    "Nominations",
    "Partenariats",
    "Formations",
    "Candidatures"
]

function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [articles, setArticles] = useState([])
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [activeTab, setActiveTab] = useState('articles') // 'articles' or 'messages'

    // Formulaire
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: 'Événements',
        image: '',
        author: ''
    })

    // Vérifier si déjà connecté (session locale)
    useEffect(() => {
        const auth = localStorage.getItem('acafem_admin_auth')
        if (auth === 'true') {
            setIsAuthenticated(true)
            fetchArticles()
            fetchMessages()
        }
    }, [])

    // Récupérer les articles
    const fetchArticles = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Erreur:', error)
            setError('Erreur lors du chargement des articles')
        } else {
            setArticles(data || [])
        }
        setLoading(false)
    }

    // Récupérer les messages
    const fetchMessages = async () => {
        const { data, error } = await supabase
            .from('contact_messages')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Erreur messages:', error)
        } else {
            setMessages(data || [])
        }
    }

    // Marquer message comme lu
    const markAsRead = async (id, currentStatus) => {
        const { error } = await supabase
            .from('contact_messages')
            .update({ is_read: !currentStatus })
            .eq('id', id)

        if (!error) {
            fetchMessages()
        }
    }

    // Connexion
    const handleLogin = (e) => {
        e.preventDefault()
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true)
            localStorage.setItem('acafem_admin_auth', 'true')
            setError('')
            localStorage.setItem('acafem_admin_auth', 'true')
            setError('')
            fetchArticles()
            fetchMessages()
        } else {
            setError('Mot de passe incorrect')
        }
    }

    // Déconnexion
    const handleLogout = () => {
        setIsAuthenticated(false)
        localStorage.removeItem('acafem_admin_auth')
    }

    // Upload d'image vers Supabase Storage
    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        // Vérifier le type
        if (!file.type.startsWith('image/')) {
            setError('Veuillez sélectionner une image')
            return
        }

        // Vérifier la taille (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('L\'image ne doit pas dépasser 5 Mo')
            return
        }

        setUploading(true)
        setError('')

        // Générer un nom unique
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

        const { data, error } = await supabase.storage
            .from('images')
            .upload(fileName, file)

        if (error) {
            setError('Erreur upload: ' + error.message)
            setUploading(false)
            return
        }

        // Récupérer l'URL publique
        const { data: urlData } = supabase.storage
            .from('images')
            .getPublicUrl(fileName)

        setFormData({ ...formData, image: urlData.publicUrl })
        setSuccess('Image téléchargée avec succès !')
        setUploading(false)
    }

    // Soumettre article
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')

        if (!formData.title || !formData.excerpt || !formData.author) {
            setError('Veuillez remplir tous les champs obligatoires')
            setLoading(false)
            return
        }

        if (editingId) {
            // Modification
            const { error } = await supabase
                .from('articles')
                .update(formData)
                .eq('id', editingId)

            if (error) {
                setError('Erreur lors de la modification')
            } else {
                setSuccess('Article modifié avec succès !')
                setEditingId(null)
            }
        } else {
            // Création
            const { error } = await supabase
                .from('articles')
                .insert([formData])

            if (error) {
                setError('Erreur lors de la publication: ' + error.message)
            } else {
                setSuccess('Article publié avec succès !')
            }
        }

        // Reset
        setFormData({
            title: '',
            excerpt: '',
            content: '',
            category: 'Événements',
            image: '',
            author: ''
        })
        fetchArticles()
        setLoading(false)
    }

    // Éditer article
    const handleEdit = (article) => {
        setFormData({
            title: article.title,
            excerpt: article.excerpt,
            content: article.content || '',
            category: article.category,
            image: article.image || '',
            author: article.author
        })
        setEditingId(article.id)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Importer les données de démo
    const handleSeedData = async () => {
        if (!confirm('Voulez-vous ajouter les 5 articles de démonstration ?')) return

        setLoading(true)
        const demoArticles = [
            {
                title: "Préparation du 2ème Congrès National des Femmes Médecins",
                excerpt: "En route vers 2030 : l'ACAFEM prépare son grand rassemblement scientifique. Appel à communications ouvert pour toutes les membres.",
                content: "Le 2ème Congrès National des Femmes Médecins se tiendra bientôt. Ce rassemblement majeur visera à discuter des avancées médicales et du rôle de la femme médecin dans le système de santé camerounais. Nous attendons plus de 500 participantes venant de toutes les régions. Les soumissions de résumés sont ouvertes jusqu'au 30 Juin.",
                category: "Événements",
                image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=600&h=400&fit=crop",
                author: "Comité Scientifique"
            },
            {
                title: "Formation Leadership : 500 nouvelles expertes formées",
                excerpt: "Retour sur notre session de formation intensive. Thématiques spéciales et développement de carrière au programme pour nos jeunes médecins.",
                content: "Dans le cadre de notre plan stratégique, nous avons formé avec succès une nouvelle cohorte de femmes médecins. Ces sessions ont couvert le leadership, la gestion hospitalière et l'éthique médicale. Bravo à toutes les participantes !",
                category: "Formations",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop",
                author: "Pôle Formation"
            },
            {
                title: "Plaidoyer : Forum de haut niveau sur la santé maternelle",
                excerpt: "L'ACAFEM porte la voix des femmes médecins auprès des instances gouvernementales pour réduire la mortalité maternelle.",
                content: "Une délégation de l'ACAFEM a rencontré le Ministre de la Santé pour présenter nos recommandations. L'objectif est clair : réduire de moitié la mortalité maternelle d'ici 2030 grâce à une meilleure prise en charge et des équipements adéquats.",
                category: "Comptes-rendus",
                image: "https://images.unsplash.com/photo-1576091160550-217358c71619?w=600&h=400&fit=crop",
                author: "Commission Plaidoyer"
            },
            {
                title: "Bienvenue à nos nouveaux membres !",
                excerpt: "L'ACAFEM s'agrandit ! Nous visons 244 membres d'ici 2028. Découvrez les profils de celles qui nous ont rejoints ce mois-ci.",
                content: "Nous sommes ravies d'accueillir 15 nouvelles consoeurs ce mois-ci. Elles viennent enrichir notre association par leur diversité et leurs expertises variées. Bienvenue dans la grande famille ACAFEM !",
                category: "Nominations",
                image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600&h=400&fit=crop",
                author: "Secrétariat Général"
            },
            {
                title: "Partenariat international avec l'AIFM",
                excerpt: "Renforcement de notre collaboration avec l'Association Internationale des Femmes Médecins pour des projets d'envergure.",
                content: "L'ACAFEM renforce ses liens avec l'international. Ce partenariat stratégique permettra des échanges d'étudiantes, des projets de recherche conjoints et une meilleure visibilité du Cameroun sur la scène mondiale.",
                category: "Partenariats",
                image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop",
                author: "Relations Internationales"
            }
        ]

        const { error } = await supabase
            .from('articles')
            .insert(demoArticles)

        if (error) {
            setError('Erreur importation: ' + error.message)
        } else {
            setSuccess('Articles de démo importés !')
            fetchArticles()
        }
        setLoading(false)
    }

    // Supprimer article
    const handleDelete = async (id) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return

        const { error } = await supabase
            .from('articles')
            .delete()
            .eq('id', id)

        if (error) {
            setError('Erreur lors de la suppression')
        } else {
            setSuccess('Article supprimé')
            fetchArticles()
        }
    }

    // Annuler édition
    const cancelEdit = () => {
        setEditingId(null)
        setFormData({
            title: '',
            excerpt: '',
            content: '',
            category: 'Événements',
            image: '',
            author: ''
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
                        <h1 className="text-2xl font-bold text-gray-900">Espace Administrateur</h1>
                        <p className="text-gray-500 mt-2">ACAFEM - Gestion des Actualités</p>
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

    // PAGE ADMIN (Connecté)
    return (
        <div className="min-h-screen bg-gray-100 pt-20">
            {/* Header */}
            <div className="bg-white shadow-sm border-b sticky top-20 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-900 flex items-center">
                        <FileText className="mr-2 text-primary-500" />
                        Gestion des Actualités
                    </h1>
                    <div className="flex gap-4">
                        <Link
                            to="/admin-membres"
                            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                        >
                            <Users size={18} className="mr-2" />
                            Gérer les Membres
                        </Link>
                        <div className="flex bg-gray-100 p-1 rounded-lg">
                            <button
                                onClick={() => setActiveTab('articles')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'articles' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                Actualités
                            </button>
                            <button
                                onClick={() => setActiveTab('messages')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center ${activeTab === 'messages' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                Messages
                                {messages.filter(m => !m.is_read).length > 0 && (
                                    <span className="ml-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                        {messages.filter(m => !m.is_read).length}
                                    </span>
                                )}
                            </button>
                        </div>
                        <button
                            onClick={handleSeedData}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            Importer Démo
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <LogOut size={18} className="mr-2" />
                            Déconnexion
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'articles' ? (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Formulaire Article (existant) */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-40">
                                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                                    {editingId ? <Edit className="mr-2 text-yellow-500" /> : <PlusCircle className="mr-2 text-green-500" />}
                                    {editingId ? 'Modifier l\'article' : 'Nouvel article'}
                                </h2>

                                {error && (
                                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center">
                                        <AlertCircle size={16} className="mr-2" />
                                        {error}
                                    </div>
                                )}

                                {success && (
                                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm flex items-center">
                                        <CheckCircle size={16} className="mr-2" />
                                        {success}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            placeholder="Titre de l'article"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Résumé *</label>
                                        <textarea
                                            value={formData.excerpt}
                                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                            rows={3}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            placeholder="Court résumé de l'article"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Contenu complet</label>
                                        <textarea
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                            rows={6}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            placeholder="Texte complet de l'article..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        >
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Image size={14} className="inline mr-1" />
                                            Image de l'article
                                        </label>

                                        {/* Bouton Upload */}
                                        <div className="mb-3">
                                            <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-colors">
                                                <Upload size={20} className="mr-2 text-gray-500" />
                                                <span className="text-sm text-gray-600">
                                                    {uploading ? 'Téléchargement...' : 'Cliquez pour uploader une image'}
                                                </span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                    disabled={uploading}
                                                />
                                            </label>
                                        </div>

                                        {/* Séparateur OU */}
                                        <div className="flex items-center mb-3">
                                            <div className="flex-1 border-t border-gray-200"></div>
                                            <span className="px-3 text-xs text-gray-400 uppercase">ou</span>
                                            <div className="flex-1 border-t border-gray-200"></div>
                                        </div>

                                        {/* Champ URL */}
                                        <input
                                            type="url"
                                            value={formData.image}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            placeholder="Coller l'URL d'une image..."
                                        />

                                        {/* Aperçu de l'image */}
                                        {formData.image && (
                                            <div className="mt-3 relative">
                                                <img
                                                    src={formData.image}
                                                    alt="Aperçu"
                                                    className="w-full h-32 object-cover rounded-lg border"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, image: '' })}
                                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Auteur *</label>
                                        <input
                                            type="text"
                                            value={formData.author}
                                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            placeholder="Nom de l'auteur"
                                        />
                                    </div>

                                    <div className="flex gap-2 pt-4">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex-1 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                                        >
                                            <Save size={18} className="mr-2" />
                                            {loading ? 'En cours...' : (editingId ? 'Modifier' : 'Publier')}
                                        </button>
                                        {editingId && (
                                            <button
                                                type="button"
                                                onClick={cancelEdit}
                                                className="px-4 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-colors"
                                            >
                                                <X size={18} />
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Liste des articles */}
                        <div className="lg:col-span-2">
                            <h2 className="text-lg font-bold text-gray-900 mb-6">
                                Articles publiés ({articles.length})
                            </h2>

                            {loading && <p className="text-gray-500">Chargement...</p>}

                            <div className="space-y-4">
                                {articles.map((article) => (
                                    <div key={article.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-4">
                                        {article.image && (
                                            <img
                                                src={article.image}
                                                alt={article.title}
                                                className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                                            />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <span className="text-xs font-bold text-primary-600 uppercase">{article.category}</span>
                                                    <h3 className="font-bold text-gray-900 line-clamp-1">{article.title}</h3>
                                                    <p className="text-sm text-gray-500 line-clamp-2 mt-1">{article.excerpt}</p>
                                                    <p className="text-xs text-gray-400 mt-2">
                                                        Par {article.author} • {new Date(article.created_at).toLocaleDateString('fr-FR')}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2 flex-shrink-0">
                                                    <button
                                                        onClick={() => handleEdit(article)}
                                                        className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                                    >
                                                        <Edit size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(article.id)}
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {articles.length === 0 && !loading && (
                                    <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                                        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-500">Aucun article publié pour le moment</p>
                                        <p className="text-sm text-gray-400">Créez votre premier article !</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    // Onglet MESSAGES
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center">
                                <MessageSquare className="mr-2 text-primary-500" />
                                Boîte de réception ({messages.length})
                            </h2>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {messages.length === 0 ? (
                                <div className="p-12 text-center text-gray-500">
                                    <Mail className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                    Aucun message reçu pour le moment.
                                </div>
                            ) : (
                                messages.map((msg) => (
                                    <div key={msg.id} className={`p-6 hover:bg-gray-50 transition-colors ${!msg.is_read ? 'bg-blue-50/50' : ''}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-3">
                                                <h3 className={`font-bold text-lg ${!msg.is_read ? 'text-blue-700' : 'text-gray-900'}`}>
                                                    {msg.subject}
                                                </h3>
                                                {!msg.is_read && (
                                                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded-full">
                                                        Nouveau
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-sm text-gray-500">
                                                {new Date(msg.created_at).toLocaleDateString('fr-FR', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                                            <span className="font-medium text-gray-900">{msg.name}</span>
                                            {msg.email && <span>&bull; {msg.email}</span>}
                                            {msg.phone && <span>&bull; {msg.phone}</span>}
                                        </div>

                                        <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100 mb-4">
                                            {msg.message}
                                        </p>

                                        <div className="flex justify-end gap-3">
                                            <a
                                                href={`mailto:${msg.email}`}
                                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                Répondre par email
                                            </a>
                                            <button
                                                onClick={() => markAsRead(msg.id, msg.is_read)}
                                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center ${msg.is_read
                                                    ? 'text-gray-500 hover:text-gray-700'
                                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                                    }`}
                                            >
                                                {msg.is_read ? (
                                                    <>Marquer comme non-lu</>
                                                ) : (
                                                    <>
                                                        <CheckCircle size={16} className="mr-2" />
                                                        Marquer comme lu
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Admin
