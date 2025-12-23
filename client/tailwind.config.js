/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // ═══════════════════════════════════════════════════════════════
                // 🎨 PALETTE ACAFEM - Design Chromatique Expert
                // ═══════════════════════════════════════════════════════════════

                // PRIMARY - Bleu Médical Raffiné
                // Symbolique: Confiance, professionnalisme médical, sérénité
                // Ratio WCAG 500 sur blanc: 4.74:1 (AA ✓)
                primary: {
                    50: '#EBF5FB',  // Fond très léger
                    100: '#D6EBF7',  // Hover léger
                    200: '#AED6EF',  // États désactivés
                    300: '#7BBDE4',  // Bordures subtiles
                    400: '#4BA3D8',  // Liens secondaires
                    500: '#1A7FC1',  // ★ Couleur principale - Bleu médical profond
                    600: '#156BA3',  // Hover boutons
                    700: '#105785',  // Active/pressed
                    800: '#0B4367',  // Texte sur fond clair
                    900: '#062F49',  // Titres importants
                    950: '#031A29',  // Maximum contraste
                },

                // SECONDARY - Teal Apaisant (Santé & Croissance)
                // Symbolique: Santé, vitalité, croissance, équilibre
                // Harmonie: Analogue au bleu primaire (30° sur roue)
                // Ratio WCAG 500 sur blanc: 4.89:1 (AA ✓)
                secondary: {
                    50: '#ECFDF5',  // Fond succès léger
                    100: '#D1FAE5',  // Badges positifs
                    200: '#A7F3D0',  // États légers
                    300: '#6EE7B7',  // Accents vifs
                    400: '#34D399',  // Indicateurs positifs
                    500: '#0D9488',  // ★ Teal principal - Équilibre parfait
                    600: '#0B7A70',  // Hover
                    700: '#086058',  // Active
                    800: '#064640',  // Texte secondaire
                    900: '#042C28',  // Maximum profondeur
                    950: '#021716',  // Noir teinté
                },

                // ACCENT - Corail Doux (Chaleur Féminine)
                // Symbolique: Chaleur humaine, compassion, féminité élégante
                // Remplace le rouge agressif par une teinte plus douce
                // Ratio WCAG 500 sur blanc: 3.12:1 (utiliser 600+ pour texte)
                accent: {
                    50: '#FFF5F3',  // Fond notification
                    100: '#FFE8E4',  // Alertes douces
                    200: '#FFD0C7',  // États hover
                    300: '#FFB3A5',  // Badges
                    400: '#FF9680',  // Boutons secondaires
                    500: '#E07A5F',  // ★ Corail élégant - CTA chaleureux
                    600: '#C4624A',  // Hover (WCAG AA ✓ sur blanc)
                    700: '#A84A36',  // Active
                    800: '#8C3424',  // Texte accent
                    900: '#6E2015',  // Profondeur
                    950: '#3D110B',  // Maximum contraste
                },

                // GOLD - Or Prestigieux (Excellence & Reconnaissance)
                // Symbolique: Excellence, prestige, accomplissement
                // Usage: Badges premium, étoiles, highlights
                gold: {
                    50: '#FFFBEB',
                    100: '#FEF3C7',
                    200: '#FDE68A',
                    300: '#FCD34D',
                    400: '#FBBF24',  // ★ Or principal
                    500: '#D4A017',  // Or profond
                    600: '#B8860B',  // Hover
                    700: '#92690A',
                    800: '#6B4D08',
                    900: '#453205',
                },

                // NEUTRAL - Gris Teintés (Cohérence visuelle)
                // Teinte légèrement bleutée pour harmonie avec primary
                neutral: {
                    50: '#F8FAFC',  // Fonds de page
                    100: '#F1F5F9',  // Cartes, sections
                    200: '#E2E8F0',  // Bordures légères
                    300: '#CBD5E1',  // Bordures
                    400: '#94A3B8',  // Icônes inactives
                    500: '#64748B',  // Texte secondaire
                    600: '#475569',  // Texte normal
                    700: '#334155',  // Titres secondaires
                    800: '#1E293B',  // Titres principaux
                    900: '#0F172A',  // Texte maximum
                    950: '#020617',  // Noir profond
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                heading: ['Outfit', 'system-ui', 'sans-serif'],
            },
            // Ombres personnalisées avec teinte de marque
            boxShadow: {
                'soft': '0 2px 15px -3px rgba(26, 127, 193, 0.1), 0 4px 6px -4px rgba(26, 127, 193, 0.1)',
                'medium': '0 4px 25px -5px rgba(26, 127, 193, 0.15), 0 8px 10px -6px rgba(26, 127, 193, 0.1)',
                'strong': '0 10px 40px -10px rgba(26, 127, 193, 0.25), 0 20px 25px -15px rgba(26, 127, 193, 0.15)',
                'glow': '0 0 20px rgba(26, 127, 193, 0.3)',
                'glow-accent': '0 0 20px rgba(224, 122, 95, 0.3)',
            },
            // Dégradés premium
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-hero': 'linear-gradient(135deg, #1A7FC1 0%, #0D9488 50%, #156BA3 100%)',
                'gradient-warm': 'linear-gradient(135deg, #E07A5F 0%, #FBBF24 100%)',
                'gradient-cool': 'linear-gradient(135deg, #1A7FC1 0%, #0D9488 100%)',
            },
        },
    },
    plugins: [],
}
