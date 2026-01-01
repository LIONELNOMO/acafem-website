# Architecture Backend & Base de Données ACAFEM (Version 2.0)

> **Document de Référence Technique**
> Ce document décrit l'intégralité de la structure backend pour permettre une ré-implémentation fidèle. Il inclut désormais le CMS (Articles) et la Logique Admin.

---

## 1. 🗄️ Schéma de Base de Données (PostgreSQL)

### A. Table `profiles`
Stocke les infos utilisateurs (Membres et Étudiantes).

| Colonne | Type | Requis | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **P.K (F.K)** | Réf `auth.users.id`. |
| `type` | `TEXT` | ✅ | `'membre'` (Médecin) ou `'etudiant'`. |
| `status` | `TEXT` | ✅ | `'pending'` (En attente), `'approved'` (Validé), `'rejected'`. |
| `nom`, `prenom` | `TEXT` | ✅ | Identité. |
| `email` | `TEXT` | ✅ | Contact. |
| `telephone` | `TEXT` | ✅ | Contact. |
| `pays`, `ville` | `TEXT` | ✅ | Localisation. |
| `specialite` | `TEXT` | ⚠️ | (Membres) ex: 'Cardiologie'. |
| `numero_ordre` | `TEXT` | ⚠️ | (Membres) ONMC. |
| `universite` | `TEXT` | ⚠️ | (Étudiantes). |
| `attestation_url` | `TEXT` | ❌ | Lien vers le diplôme/certificat (PDF). |

### B. Table `messages` (Chat système)
Messages temps réel.

| Colonne | Type | Requis | Description |
| :--- | :--- | :--- | :--- |
| `id` | `BIGINT` | **P.K** | Auto-increment. |
| `content` | `TEXT` | ✅ | Contenu. |
| `channel_id` | `TEXT` | ✅ | `'general'`, `'cas-cliniques'`, `'sante'` (Public). |
| `user_id` | `UUID` | ❌ | NULL si invité. |
| `sender_name` | `TEXT` | ⚠️ | Nom si invité. |
| `is_guest` | `BOOLEAN` | ✅ | Flag invité. |

### C. Table `articles` (CMS / Actualités) [NOUVEAU]
Gestion du contenu dynamique : Événements, Comptes-rendus, etc.

| Colonne | Type | Requis | Description |
| :--- | :--- | :--- | :--- |
| `id` | `BIGINT` | **P.K** | Auto-increment. |
| `created_at` | `TIMESTAMPTZ` | ✅ | Date de publication. |
| `title` | `TEXT` | ✅ | Titre de l'article. |
| `excerpt` | `TEXT` | ✅ | Court résumé pour les cartes. |
| `content` | `TEXT` | ✅ | Contenu complet (HTML ou Markdown). |
| `image_url` | `TEXT` | ❌ | Image de couverture. |
| `category` | `TEXT` | ✅ | `'Événements'`, `'Comptes-rendus'`, `'Publications'`, `'Nominations'`, `'Partenariats'`, `'Formations'`, `'Candidatures'`. |
| `author` | `TEXT` | ✅ | Auteur affiché (ex: "Comité Exécutif"). |
| `slug` | `TEXT` | ✅ | URL friendly (ex: `plan-strategique-2025`). Unique. |

---

## 2. � Administration & Validation

### Rôles Spéciaux
Actuellement, l'administration est gérée via une page spéciale protégée par un mot de passe simple (`ADMIN_PASSWORD`).
*   **Futur (Recommandé)** : Créer une table `roles` ou ajouter une colonne `is_admin` BOOLEAN dans `profiles` pour une vraie sécurité.

### Workflow de Validation (Membres)
1.  **Inscription** : L'utilisateur s'inscrit -> `status = 'pending'`.
2.  **Dashboard Admin** : L'administrateur voit la liste "En attente".
3.  **Vérification** : L'admin vérifie le Nº Ordre ou le document joint.
4.  **Action** :
    *   `Approve` -> Update `status = 'approved'`. L'accès aux chats privés et documents est débloqué.
    *   `Reject` -> Update `status = 'rejected'`.

### Workflow CMS (Articles)
1.  **Création** : L'admin remplit un formulaire (Titre, Catégorie, Image, Texte).
2.  **Publication** : Insertion dans la table `articles`.
3.  **Affichage** : La page `/actualites` (`News.jsx`) récupère tous les articles triés par date.

---

## 3. 🛡️ Règles de Sécurité (RLS)

### Règle 1 : Protection des Profils
*   Lecture : Soi-même.
*   Modification : Soi-même uniquement.

### Règle 2 : Chat (Privé vs Public)
*   **Privé** (`general`, etc.) : `auth.role() = 'authenticated'` ET `profile.status = 'approved'`.
*   **Public** (`sante`) : Tout le monde (Invités inclus).

### Règle 3 : Articles (CMS)
*   **Lecture** : PUBLIQUE (`anon` + `authenticated`). Tout le monde peut lire les news.
*   **Écriture/Modif** : ADMINISTRATEUR SEULEMENT. (Via RLS sur l'ID Admin ou via backend sécurisé).

---

## 4. 📂 Stockage de Fichiers (Buckets)

1.  **`documents`** (Privé) : Attestations des membres. (Path: `/attestations/...`)
2.  **`images`** (Public) : Images des articles de blog. (Path: `/articles/...`)
3.  **`avatars`** (Public) : Photos de profil.

---

## 5. 🚀 Guide de Migration (Vers Node.js)

### Endpoints à créer pour le CMS
*   `GET /api/articles` : Liste paginée des articles (Filtres possibles par catégorie).
*   `GET /api/articles/:slug` : Détail d'un article.
*   `POST /api/admin/articles` : Création (Protected, Admin Token required).
*   `PUT /api/admin/members/:id/approve` : Validation d'un membre.

### Architecture Dossiers Recommandée (Node.js)
```
/src
  /controllers
    Auth.js
    Chat.js
    Articles.js (CMS)
    Admin.js (Validation membres)
  /models
    User.js
    Message.js
    Article.js
  /routes
    api.js
  /services
    SocketService.js (Chat Realtime)
```
