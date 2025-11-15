-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- ======================================
-- INSERÇÕES NA TABELA usuarios
-- ======================================
INSERT INTO usuarios (id_usuarios, nome, email, senha) VALUES
(gen_random_uuid(), 'Ana Souza', 'ana.souza@example.com', crypt('senha123', gen_salt('bf'))),
(gen_random_uuid(), 'Bruno Lima', 'bruno.lima@example.com', crypt('senha123', gen_salt('bf'))),
(gen_random_uuid(), 'Carla Menezes', 'carla.menezes@example.com', crypt('senha123', gen_salt('bf'))),
(gen_random_uuid(), 'Diego Nascimento', 'diego.nascimento@example.com', crypt('senha123', gen_salt('bf'))),
(gen_random_uuid(), 'Eduarda Ramos', 'eduarda.ramos@example.com', crypt('senha123', gen_salt('bf')));

-- ======================================
-- INSERÇÕES NA TABELA prefeituras
-- ======================================
INSERT INTO prefeituras (id_prefeituras, usuarios_id, responsavel, orgao)
SELECT gen_random_uuid(), id_usuarios, nome, 'Prefeitura Municipal'
FROM usuarios
LIMIT 5;

-- ======================================
-- INSERÇÕES NA TABELA categorias
-- ======================================
INSERT INTO categorias (id_categorias, nome, descricao) VALUES
(gen_random_uuid(), 'Parques', 'Áreas verdes públicas com lazer e natureza'),
(gen_random_uuid(), 'Museus', 'Espaços de cultura e exposições'),
(gen_random_uuid(), 'Restaurantes', 'Locais de alimentação e gastronomia'),
(gen_random_uuid(), 'Praias', 'Faixas litorâneas e áreas de banho'),
(gen_random_uuid(), 'Eventos', 'Locais destinados à realização de eventos públicos');

-- ======================================
-- INSERÇÕES NA TABELA locais
-- ======================================
WITH u AS (SELECT id_usuarios FROM usuarios)
INSERT INTO locais (id_locais, usuarios_id, nome, descricao, endereco, localizacao, media_avaliacao) VALUES
(gen_random_uuid(), (SELECT id_usuarios FROM u OFFSET 0 LIMIT 1), 'Parque Central', 'Um grande parque urbano com lago e ciclovia', 'Av. das Flores, 123', ST_GeogFromText('SRID=4326;POINT(-46.6333 -23.5505)'), 4.5),
(gen_random_uuid(), (SELECT id_usuarios FROM u OFFSET 1 LIMIT 1), 'Museu de Arte Moderna', 'Exposição permanente de arte contemporânea', 'Rua das Artes, 45', ST_GeogFromText('SRID=4326;POINT(-46.6510 -23.5570)'), 4.8),
(gen_random_uuid(), (SELECT id_usuarios FROM u OFFSET 2 LIMIT 1), 'Restaurante Sabor da Serra', 'Culinária regional e ambiente familiar', 'Av. das Montanhas, 200', ST_GeogFromText('SRID=4326;POINT(-46.6400 -23.5650)'), 4.2),
(gen_random_uuid(), (SELECT id_usuarios FROM u OFFSET 3 LIMIT 1), 'Praia do Sol', 'Praia com águas calmas e área de lazer', 'Rodovia BR-101, km 45', ST_GeogFromText('SRID=4326;POINT(-46.4000 -23.5000)'), 4.7),
(gen_random_uuid(), (SELECT id_usuarios FROM u OFFSET 4 LIMIT 1), 'Centro de Convenções', 'Espaço para feiras e eventos culturais', 'Rua Central, 900', ST_GeogFromText('SRID=4326;POINT(-46.6200 -23.5550)'), 4.4);

-- ======================================
-- INSERÇÕES NA TABELA avaliacoes
-- ======================================
WITH u AS (SELECT id_usuarios FROM usuarios),
     l AS (SELECT id_locais FROM locais)
INSERT INTO avaliacoes (id_avaliacoes, usuarios_id, locais_id, nota, comentario) VALUES
(gen_random_uuid(), (SELECT id_usuarios FROM u OFFSET 0 LIMIT 1), (SELECT id_locais FROM l OFFSET 0 LIMIT 1), 5, 'Lugar incrível! Muito verde e tranquilo.'),
(gen_random_uuid(), (SELECT id_usuarios FROM u OFFSET 1 LIMIT 1), (SELECT id_locais FROM l OFFSET 1 LIMIT 1), 4, 'Boa exposição, mas o espaço é pequeno.'),
(gen_random_uuid(), (SELECT id_usuarios FROM u OFFSET 2 LIMIT 1), (SELECT id_locais FROM l OFFSET 2 LIMIT 1), 5, 'Comida excelente e ótimo atendimento!'),
(gen_random_uuid(), (SELECT id_usuarios FROM u OFFSET 3 LIMIT 1), (SELECT id_locais FROM l OFFSET 3 LIMIT 1), 3, 'A praia é bonita, mas estava cheia.'),
(gen_random_uuid(), (SELECT id_usuarios FROM u OFFSET 4 LIMIT 1), (SELECT id_locais FROM l OFFSET 4 LIMIT 1), 4, 'Bom local para eventos, estacionamento limitado.');



-- ======================================
-- INSERÇÕES NA TABELA locaisoficiais
-- ======================================
WITH l AS (SELECT id_locais FROM locais),
     p AS (SELECT id_prefeituras FROM prefeituras)
INSERT INTO locaisoficiais (id_locais_oficiais, locais_id, prefeitura_id, oficializado) VALUES
(gen_random_uuid(), (SELECT id_locais FROM l OFFSET 0 LIMIT 1), (SELECT id_prefeituras FROM p OFFSET 0 LIMIT 1), TRUE),
(gen_random_uuid(), (SELECT id_locais FROM l OFFSET 1 LIMIT 1), (SELECT id_prefeituras FROM p OFFSET 1 LIMIT 1), TRUE),
(gen_random_uuid(), (SELECT id_locais FROM l OFFSET 2 LIMIT 1), (SELECT id_prefeituras FROM p OFFSET 2 LIMIT 1), FALSE),
(gen_random_uuid(), (SELECT id_locais FROM l OFFSET 3 LIMIT 1), (SELECT id_prefeituras FROM p OFFSET 3 LIMIT 1), TRUE),
(gen_random_uuid(), (SELECT id_locais FROM l OFFSET 4 LIMIT 1), (SELECT id_prefeituras FROM p OFFSET 4 LIMIT 1), FALSE);

-- ======================================
-- INSERÇÕES NA TABELA filtros
-- ======================================
WITH l AS (SELECT id_locais FROM locais),
     c AS (SELECT id_categorias FROM categorias)
INSERT INTO filtros (id_filtros, locais_id, categorias_id) VALUES
(gen_random_uuid(), (SELECT id_locais FROM l OFFSET 0 LIMIT 1), (SELECT id_categorias FROM c OFFSET 0 LIMIT 1)),
(gen_random_uuid(), (SELECT id_locais FROM l OFFSET 1 LIMIT 1), (SELECT id_categorias FROM c OFFSET 1 LIMIT 1)),
(gen_random_uuid(), (SELECT id_locais FROM l OFFSET 2 LIMIT 1), (SELECT id_categorias FROM c OFFSET 2 LIMIT 1)),
(gen_random_uuid(), (SELECT id_locais FROM l OFFSET 3 LIMIT 1), (SELECT id_categorias FROM c OFFSET 3 LIMIT 1)),
(gen_random_uuid(), (SELECT id_locais FROM l OFFSET 4 LIMIT 1), (SELECT id_categorias FROM c OFFSET 4 LIMIT 1));

-- ======================================
-- INSERÇÕES ADICIONAIS NA TABELA avaliacoes
-- (Mais de uma avaliação por local)
-- ======================================
WITH u AS (SELECT id_usuarios FROM usuarios),
     l AS (SELECT id_locais FROM locais)
INSERT INTO avaliacoes (id_avaliacoes, usuarios_id, locais_id, nota, comentario) VALUES
-- Parque Central
(gen_random_uuid(), (SELECT id_usuarios FROM u OFFSET 1 LIMIT 1), (SELECT id_locais FROM l OFFSET 0 LIMIT 1), 4, 'Ambiente agradável, mas poderia ter mais segurança.'),
(gen_random_uuid(), (SELECT id_usuarios FROM u OFFSET 2 LIMIT 1), (SELECT id_locais FROM l OFFSET 0 LIMIT 1), 5, 'Excelente para caminhadas ao fim da tarde!'),
-- Museu de Arte Moderna
(gen_random_uuid(), (SELECT id_usuarios FROM u OFFSET 3 LIMIT 1), (SELECT id_locais FROM l OFFSET 1 LIMIT 1), 5, 'Curadoria incrível e ambiente tranquilo.'),
(gen_random_uuid(), (SELECT id_usuarios FROM u OFFSET 4 LIMIT 1), (SELECT id_locais FROM l OFFSET 1 LIMIT 1), 4, 'Boa estrutura, mas o café é caro.'),
-- Restaurante Sabor da Serra
(gen_random_uuid(), (SELECT id_usuarios FROM u OFFSET 0 LIMIT 1), (SELECT id_locais FROM l OFFSET 2 LIMIT 1), 5, 'Pratos deliciosos e sobremesas incríveis!'),
(gen_random_uuid(), (SELECT id_usuarios FROM u OFFSET 3 LIMIT 1), (SELECT id_locais FROM l OFFSET 2 LIMIT 1), 3, 'Atendimento demorou um pouco.'),
-- Praia do Sol
(gen_random_uuid(), (SELECT id_usuarios FROM u OFFSET 1 LIMIT 1), (SELECT id_locais FROM l OFFSET 3 LIMIT 1), 5, 'Água limpa e ótimo para famílias.'),
(gen_random_uuid(), (SELECT id_usuarios FROM u OFFSET 4 LIMIT 1), (SELECT id_locais FROM l OFFSET 3 LIMIT 1), 4, 'Infraestrutura boa, mas poucos banheiros.'),
-- Centro de Convenções
(gen_random_uuid(), (SELECT id_usuarios FROM u OFFSET 2 LIMIT 1), (SELECT id_locais FROM l OFFSET 4 LIMIT 1), 5, 'Evento super bem organizado!'),
(gen_random_uuid(), (SELECT id_usuarios FROM u OFFSET 0 LIMIT 1), (SELECT id_locais FROM l OFFSET 4 LIMIT 1), 3, 'Salas boas, mas climatização fraca.');
