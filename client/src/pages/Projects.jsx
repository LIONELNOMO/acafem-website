import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    MapPin,
    Calendar,
    Users,
    ArrowRight,
    Filter,
    Search
} from 'lucide-react'

const projectsData = [
    {
        id: 1,
        title: 'Campagne de Dépistage du Cancer du Col',
        category: 'Santé Reproductive',
        status: 'En cours',
        location: 'Yaoundé',
        date: 'Janvier 2024 - Décembre 2024',
        beneficiaries: '5000+',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop',
        description: 'Programme de dépistage gratuit du cancer du col de l\'utérus pour les femmes de 25 à 65 ans dans la région du Centre.'
    },
    {
        id: 2,
        title: 'Formation des Sages-femmes Rurales',
        category: 'Éducation',
        status: 'En cours',
        location: 'Région de l\'Ouest',
        date: 'Mars 2024 - Juin 2024',
        beneficiaries: '200',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
        description: 'Formation continue des sages-femmes sur les nouvelles pratiques en santé maternelle et néonatale.'
    },
    {
        id: 3,
        title: 'Sensibilisation VIH/SIDA',
        category: 'Prévention',
        status: 'Terminé',
        location: 'Douala',
        date: 'Novembre 2023',
        beneficiaries: '10000+',
        image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=600&h=400&fit=crop',
        description: 'Campagne de sensibilisation sur le VIH/SIDA avec distribution de préservatifs et tests de dépistage gratuits.'
    },
    {
        id: 4,
        title: 'Clinique Mobile Santé Maternelle',
        category: 'Services Médicaux',
        status: 'En cours',
        location: 'Région du Nord',
        date: 'Toute l\'année',
        beneficiaries: '8000+',
        image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=400&fit=crop',
        description: 'Unité mobile offrant des consultations prénatales et postnatales dans les zones reculées.'
    },
    {
        id: 5,
        title: 'Programme de Planning Familial',
        category: 'Santé Reproductive',
        status: 'En cours',
        location: 'National',
        date: '2024',
        beneficiaries: '15000+',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop',
        description: 'Information et accès aux méthodes contraceptives modernes pour les couples camerounais.'
    },
    {
        id: 6,
        title: 'Lutte contre les Fistules Obstétricales',
        category: 'Services Médicaux',
        status: 'Terminé',
        location: 'Maroua',
        date: 'Septembre 2023',
        beneficiaries: '150',
        image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop',
        description: 'Campagne de réparation chirurgicale gratuite des fistules obstétricales.'
    }
]

const categories = ['Tous', 'Santé Reproductive', 'Éducation', 'Prévention', 'Services Médicaux']

function Projects() {
    const [selectedCategory, setSelectedCategory] = useState('Tous')
    const [searchTerm, setSearchTerm] = useState('')

    const filteredProjects = projectsData.filter(project => {
        const matchesCategory = selectedCategory === 'Tous' || project.category === selectedCategory
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="bg-gradient-to-br from-primary-600 to-secondary-600 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Nos Projets
                    </h1>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto">
                        Découvrez les initiatives que nous menons pour améliorer
                        la santé des populations camerounaises.
                    </p>
                </div>
            </section>

            {/* Filters */}
            <section className="py-8 bg-white border-b sticky top-20 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Rechercher un projet..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
                            <Filter size={20} className="text-gray-400 flex-shrink-0" />
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === category
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredProjects.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-gray-500 text-lg">Aucun projet trouvé pour cette recherche.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProjects.map((project) => (
                                <article key={project.id} className="card group cursor-pointer">
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary-600 text-xs font-medium rounded-full">
                                                {project.category}
                                            </span>
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${project.status === 'En cours'
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-gray-500 text-white'
                                                }`}>
                                                {project.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4 line-clamp-2">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                                            <div className="flex items-center">
                                                <MapPin size={16} className="mr-1" />
                                                {project.location}
                                            </div>
                                            <div className="flex items-center">
                                                <Calendar size={16} className="mr-1" />
                                                {project.date}
                                            </div>
                                            <div className="flex items-center">
                                                <Users size={16} className="mr-1" />
                                                {project.beneficiaries} bénéficiaires
                                            </div>
                                        </div>

                                        <button className="flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors">
                                            En savoir plus
                                            <ArrowRight size={16} className="ml-1" />
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Vous souhaitez soutenir nos projets ?
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Votre contribution nous permet de mener à bien nos missions et d'aider plus de personnes.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/don" className="btn-primary">
                            Faire un don
                        </Link>
                        <Link to="/contact" className="btn-outline">
                            Devenir partenaire
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Projects
