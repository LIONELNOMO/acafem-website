-- 1. Activer le stockage d'images/fichiers dans la table messages
alter table public.messages 
    add column if not exists file_url text,
    add column if not exists file_type text; -- 'image/jpeg', 'application/pdf', etc.

-- 2. Créer le Bucket de Stockage (Via insertion directe si possible ou rappel manuel)
-- Note: Supabase Storage se configure souvent via l'UI, mais on peut insérer des policies.
-- On suppose que le bucket 'chat-uploads' doit être créé manuellement par l'utilisateur depuis l'interface Supabase 'Storage'.

-- 3. Policies pour le Storage (Bucket 'chat-uploads')
-- Ces commandes SQL ne fonctionnent que si l'extension 'storage' est active et qu'on a les droits.
-- Il est plus prudent de guider l'utilisateur pour le faire, mais on peut tenter de pré-mâcher les policies pour la table storage.objects.

-- Politique : Tout utilisateur authentifié peut uploader
create policy "Authenticated users can upload files"
on storage.objects for insert
with check (
    bucket_id = 'chat-uploads' 
    and auth.role() = 'authenticated'
);

-- Politique : Tout le monde (public) peut voir les fichiers (pour simplifier le chat public)
create policy "Everyone can view files"
on storage.objects for select
using ( bucket_id = 'chat-uploads' );

-- NOTE POUR L'UTILISATEUR :
-- 1. Allez dans Supabase > Storage
-- 2. Créez un nouveau bucket nommé "chat-uploads"
-- 3. Mettez-le en "Public" (pour que les images s'affichent facilement sans signedURL complexe)
