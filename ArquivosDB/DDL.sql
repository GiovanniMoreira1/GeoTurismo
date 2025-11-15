CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "postgis";

CREATE TABLE IF NOT EXISTS usuarios(


    id_usuarios UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL

);


CREATE TABLE IF NOT EXISTS prefeituras(

    id_prefeituras UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    usuarios_id UUID NOT NULL,
    responsavel VARCHAR(100) NOT NULL,
    orgao VARCHAR(40) NOT NULL,

    Constraint fk_usuario FOREIGN KEY (usuarios_id) REFERENCES usuarios(id_usuarios) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS locais(

    id_locais UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    usuarios_id UUID NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    endereco TEXT NOT NULL,
    localizacao GEOGRAPHY(Point, 4326) NOT NULL,
    media_avaliacao FLOAT DEFAULT 0,

    Constraint fk_usuario FOREIGN KEY (usuarios_id) REFERENCES usuarios(id_usuarios)

);

CREATE TABLE IF NOT EXISTS avaliacoes(

    id_avaliacoes UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    usuarios_id UUID NOT NULL,
    locais_id UUID NOT NULL,
    nota INTEGER NOT NULL CHECK (nota >= 1 AND nota <= 5),
    comentario TEXT,
    data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    Constraint fk_usuario FOREIGN KEY (usuarios_id) REFERENCES usuarios(id_usuarios) ON DELETE CASCADE,
    Constraint fk_local FOREIGN KEY (locais_id) REFERENCES locais(id_locais) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS categorias(

    id_categorias UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT

);


CREATE TABLE IF NOT EXISTS locaisoficiais(

    id_locais_oficiais UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    locais_id UUID NOT NULL,
    prefeitura_id UUID NOT NULL,
    data_oficializacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    oficializado BOOLEAN DEFAULT FALSE,

    Constraint fk_local FOREIGN KEY (locais_id) REFERENCES locais(id_locais) ON DELETE CASCADE,
    Constraint fk_prefeitura FOREIGN KEY (prefeitura_id) REFERENCES prefeituras(id_prefeituras) ON DELETE CASCADE

);

CREATE TABLE IF NOT EXISTS filtros(

    id_filtros UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    locais_id UUID NOT NULL,
    categorias_id UUID NOT NULL,

    Constraint fk_local FOREIGN KEY (locais_id) REFERENCES locais(id_locais) ON DELETE CASCADE,
    Constraint fk_categoria FOREIGN KEY (categorias_id) REFERENCES categorias(id_categorias) ON DELETE CASCADE

);

CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_avaliacoes_usuarios_id ON avaliacoes(usuarios_id);
CREATE INDEX idx_avaliacoes_locais_id ON avaliacoes(locais_id);
CREATE INDEX idx_filtros_locais_id ON filtros(locais_id);
CREATE INDEX idx_filtros_categorias_id ON filtros(categorias_id);
CREATE INDEX idx_locais_localizacao ON locais USING GIST (localizacao);