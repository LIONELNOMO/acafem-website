import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    MapPin,
    Calendar,
    Users,
    ArrowRight,
    UserPlus,
    GraduationCap,
    ShieldAlert,
    Scale,
    HeartPulse,
    Baby,
    FileHeart,
    Leaf,
    Globe,
    Smartphone,
    Target
} from 'lucide-react'

// Données des Axes Stratégiques
const strategicAxes = [
    {
        id: 'axe1',
        title: "Bien-être des Femmes Médecins",
        shortTitle: "Bien-être des Médecins",
        icon: <UserPlus className="w-6 h-6" />,
        color: "primary",
        context: "Au Cameroun, les femmes représentent 70% de la main-d'œuvre en santé, mais seulement 25% des postes de direction sont occupés par des femmes.",
        projects: [
            {
                id: "1.1",
                title: "Socio-Coopération (RCLFM)",
                icon: <Users className="w-10 h-10 text-primary-500" />,
                objective: "Créer le premier Répertoire Camerounais en Ligne des Femmes Médecins",
                actions: [
                    "Base de données en ligne des femmes médecins (médecine, santé publique, recherche)",
                    "Inclusion des travailleuses sanitaires réfugiées et migrantes",
                    "Respect de la confidentialité et protection des données",
                    "Système en ligne de demandes d'adhésion (d'ici 2030)"
                ],
                target: "Cible : Passer de 122 membres (2025) à 500 membres (2028)",
            },
            {
                id: "1.2",
                title: "Recherche Scientifique & Formation",
                icon: <GraduationCap className="w-10 h-10 text-primary-500" />,
                context: "Les femmes sont sous-représentées dans la recherche (38% de participation)",
                actions: [
                    "Organisation de 2 congrès nationaux d'ici 2030",
                    "5 forums de plaidoyer de haut niveau",
                    "Plateforme de dialogue et d'échanges scientifiques",
                    "Formation sur les thématiques de santé spécifiques aux femmes"
                ],
                beneficiaries: "Femmes médecins et étudiantes"
            },
            {
                id: "1.3",
                title: "Lutte contre les Violences",
                icon: <ShieldAlert className="w-10 h-10 text-red-500" />,
                objective: "Protéger les femmes médecins et étudiantes contre les violences",
                context: "Vulnérabilité face aux superviseurs dans le secteur de la santé",
                actions: ["Formation", "Sensibilisation", "Mécanismes de protection"]
            },
            {
                id: "1.4",
                title: "Leadership & Mentorat",
                icon: <Target className="w-10 h-10 text-yellow-500" />,
                objectives: [
                    "Former 500 femmes médecins sur thématiques spéciales",
                    "Former 500 étudiantes en fin de cycle",
                    "50 jeunes professionnelles par faculté de médecine",
                    "Manuel sur le leadership des femmes"
                ]
            },
            {
                id: "1.5",
                title: "Équité & Égalité des Sexes",
                icon: <Scale className="w-10 h-10 text-primary-500" />,
                problem: "Écart de rémunération de 24% entre hommes et femmes",
                actions: [
                    "Plaidoyer pour la réduction de l'écart salarial",
                    "Promotion de l'autonomisation économique",
                    "Adaptation des EPI aux femmes"
                ]
            }
        ]
    },
    {
        id: 'axe2',
        title: "Santé de la Population Camerounaise",
        shortTitle: "Santé Population",
        icon: <HeartPulse className="w-6 h-6" />,
        color: "secondary",
        context: "56% des décès chez les femmes camerounaises sont liés aux maladies transmissibles, conditions maternelles/périnatales, nutrition et maladies non transmissibles.",
        projects: [
            {
                id: "2.1",
                title: "Réduction de la Morbi-mortalité",
                icon: <Baby className="w-10 h-10 text-secondary-500" />,
                objective: "Réduire la mortalité maternelle, néonatale, infantile d'ici 2030",
                targets: ["Femmes enceintes", "Nouveau-nés", "Enfants", "Adolescentes"],
                actions: ["Soutien aux efforts de réduction de la mortalité"]
            },
            {
                id: "2.2",
                title: "Santé Globale",
                icon: <FileHeart className="w-10 h-10 text-secondary-500" />,
                objective: "Réduire les besoins non satisfaits",
                context: "Réduction des décès SIDA à 630.000 (2023), mais défis d'accès persistants",
                actions: ["Accès aux services de santé reproductive", "Droits sexuels", "Santé materno-pédiatrique", "Santé de reproduction", "Santé du sujet âgé"]
            },
            {
                id: "2.3",
                title: "Lutte contre les Violences faites aux Femmes",
                icon: <ShieldAlert className="w-10 h-10 text-red-500" />,
                stat: "30% des femmes camerounaises victimes de violences (OMS)",
                impacts: ["Santé physique & mentale", "Santé sexuelle & reproductive"]
            },
            {
                id: "2.4",
                title: "Changement Climatique",
                icon: <Leaf className="w-10 h-10 text-green-500" />,
                context: "La crise climatique n'est pas neutre en termes de genre",
                impacts: [
                    "Risques accrus maladies infectieuses",
                    "Aggravation santé maternelle",
                    "Vulnérabilité réfugiés et migrants"
                ]
            },
            {
                id: "2.5",
                title: "Situations d'Urgence",
                icon: <Globe className="w-10 h-10 text-blue-500" />,
                objective: "Préparation et réponse aux crises sanitaires et humanitaires"
            }
        ]
    },
    {
        id: 'axe3',
        title: "Gouvernance & Partenariat en Santé",
        shortTitle: "Gouvernance",
        icon: <Globe className="w-6 h-6" />,
        color: "accent",
        globalObjective: "Atteindre 50% de femmes aux postes de direction du secteur santé (contre 25% actuellement)",
        projects: [
            {
                id: "3.1",
                title: "Gestion des Ressources Humaines",
                icon: <Users className="w-10 h-10 text-accent-500" />,
                context: "70% des travailleurs médicaux sont des femmes. Déficit mondial de 10M d'ici 2030.",
                actions: [
                    "Renforcement liens professionnels",
                    "Amplification de la voix collective",
                    "Comblement du déficit RH"
                ]
            },
            {
                id: "3.2",
                title: "Accès aux Technologies Numériques",
                icon: <Smartphone className="w-10 h-10 text-accent-500" />,
                problem: "Femmes : 10% moins de chances de posséder un mobile (pays faibles revenus)",
                actions: ["Formation et équipement des professionnelles de santé"]
            }
        ]
    }
]

function Projects() {
    const [activeTab, setActiveTab] = useState('axe1')
    const activeAxe = strategicAxes.find(axe => axe.id === activeTab)

    return (
        <div className="pt-20 bg-gray-50 min-h-screen">
            {/* Hero */}
            <section className="bg-gradient-to-br from-primary-600 to-secondary-600 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Nos Axes Stratégiques
                    </h1>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto">
                        Une vision claire et des actions concrètes pour transformer la santé au Cameroun.
                    </p>
                </div>
            </section>

            {/* Navigation par Onglets */}
            <section className="sticky top-20 z-40 bg-white shadow-sm border-b overflow-x-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-1 md:space-x-4 min-w-max p-2">
                        {strategicAxes.map((axe) => (
                            <button
                                key={axe.id}
                                onClick={() => setActiveTab(axe.id)}
                                className={`flex items-center px-6 py-4 rounded-xl transition-all duration-300 font-bold text-sm md:text-base ${activeTab === axe.id
                                    ? `bg-${axe.color}-50 text-${axe.color}-600 ring-2 ring-${axe.color}-500 shadow-lg scale-105`
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <span className="mr-2">{axe.icon}</span>
                                {axe.shortTitle}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contenu de l'Axe Actif */}
            <section className="py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header de l'Axe */}
                    <div className="mb-16 text-center">
                        <span className={`inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 bg-${activeAxe.color}-100 text-${activeAxe.color}-700`}>
                            Axe Stratégique {activeAxe.id.replace('axe', '')}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{activeAxe.title}</h2>

                        {/* Contexte Global Axe */}
                        {(activeAxe.context || activeAxe.globalObjective) && (
                            <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg border-l-8 border-primary-500">
                                <h3 className="flex items-center text-lg font-bold text-gray-900 mb-3">
                                    <Globe className="mr-2 text-primary-500" size={24} />
                                    {activeAxe.globalObjective ? "Objectif Global" : "Contexte & Enjeux"}
                                </h3>
                                <p className="text-lg text-gray-700 leading-relaxed italic">
                                    "{activeAxe.context || activeAxe.globalObjective}"
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Grille des Projets */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {activeAxe.projects.map((project, idx) => (
                            <article key={idx} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="bg-gray-50 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                        {project.icon}
                                    </div>
                                    <span className="text-4xl font-black text-gray-100">{project.id}</span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                                    {project.title}
                                </h3>

                                {project.objective && (
                                    <div className="mb-4">
                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Objectif</h4>
                                        <p className="text-gray-700 font-medium">{project.objective}</p>
                                    </div>
                                )}

                                {project.context && (
                                    <div className="mb-4 bg-yellow-50 p-3 rounded-lg">
                                        <h4 className="text-xs font-bold text-yellow-700 uppercase tracking-wide mb-1">Le saviez-vous ?</h4>
                                        <p className="text-sm text-yellow-800">{project.context}</p>
                                    </div>
                                )}

                                {project.problem && (
                                    <div className="mb-4 bg-red-50 p-3 rounded-lg">
                                        <h4 className="text-xs font-bold text-red-700 uppercase tracking-wide mb-1">Problématique</h4>
                                        <p className="text-sm text-red-800">{project.problem}</p>
                                    </div>
                                )}

                                {(project.actions || project.targets || project.objectives) && (
                                    <div className="space-y-2 mt-6">
                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Actions & Cibles</h4>
                                        <ul className="space-y-2">
                                            {(project.actions || project.targets || project.objectives || []).map((action, i) => (
                                                <li key={i} className="flex items-start text-sm text-gray-600">
                                                    <ArrowRight size={14} className={`mr-2 mt-1 flex-shrink-0 text-${activeAxe.color}-500`} />
                                                    {action}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {project.target && (
                                    <div className="mt-6 pt-4 border-t flex items-center text-sm font-semibold text-primary-600">
                                        <Target size={16} className="mr-2" />
                                        Cible : {project.target}
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-white border-t">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Rejoignez le mouvement
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Ces projets ambitieux nécessitent le soutien de tous. Ensemble, transformons la santé au Cameroun.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/don" className="btn-primary">
                            Soutenir nos actions
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
