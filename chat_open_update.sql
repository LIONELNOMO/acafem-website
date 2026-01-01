-- 1. Modifier la table messages pour accepter les invités
alter table public.messages 
    alter column user_id drop not null; -- Permettre user_id NULL pour les invités

alter table public.messages 
    add column if not exists sender_name text; -- Stocker le nom des invités (ou le nom affiché)

alter table public.messages 
    add column if not exists is_guest boolean default false; -- Marquer explicitement les messages invités

-- 2. Mettre à jour les politiques de sécurité (RLS)

-- Politique de Lecture (SELECT) : 
-- Tout le monde (y compris anonymes) peut lire les messages du salon 'sante' (Questions Santé)
-- Les autres salons restent protégés (authentifiés seulement)
drop policy if exists "Authenticated users can read messages" on public.messages;

create policy "Everyone can read health messages"
    on public.messages for select
    using ( 
        (channel_id = 'sante') -- Public pour santé
        OR 
        (auth.role() = 'authenticated') -- Authentifié pour tout le reste
    );

-- Politique d'Écriture (INSERT) :
-- Tout le monde peut écrire dans 'sante' (si nom fourni pour les guests)
drop policy if exists "Authenticated users can insert messages" on public.messages;

create policy "Everyone can insert health messages"
    on public.messages for insert
    with check (
        (channel_id = 'sante') -- Tout le monde peut poster dans santé
        OR
        (auth.role() = 'authenticated') -- Les connectés peuvent poster ailleurs (ex: membres)
    );
