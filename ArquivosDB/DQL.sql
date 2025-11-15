-- Busca de todos os pontos que são presentes no mapa após o login do usuario
SELECT localizacao, nome, id_locais FROM locais

-- Busca das informações especificas de um local, será executado quando o usuario clicar no ponto no mapa e verificar as informações daquele local, traz as infos do local e a média das avaliações para aquele local
SELECT 
    locais.id_locais, 
    locais.nome, 
    locais.descricao, 
    locais.endereco, 
    c.nome AS categoria, 
    AVG(avaliacoes.nota) AS media
FROM locais 
INNER JOIN avaliacoes ON locais.id_locais = avaliacoes.locais_id
INNER JOIN filtros AS f ON locais.id_locais = f.locais_id
INNER JOIN categorias AS c ON c.id_categorias = f.categorias_id
WHERE locais.id_locais = 'd6a0a84e-229e-4462-bc9c-9a019a7adf91'
GROUP BY locais.id_locais, locais.nome, locais.descricao, locais.endereco, c.nome;

-- Busca de avaliações realizadas para um estabelecimento especifico
SELECT nota, comentario, data_avaliacao, locais.nome 
FROM avaliacoes INNER JOIN locais 
ON avaliacoes.locais_id = locais.id_locais 
WHERE locais.id_locais = '91ddfd39-5509-4baa-9617-5bfada925d21' 
ORDER By data_avaliacao DESC LIMIT 10

--Busca o nome do local sua locailização e a categoria que ele pertence
SELECT l.nome, l.localizacao, c.nome as categoria
from locais as l
INNER JOIN filtros AS f ON l.id_locais = f.locais_id
INNER JOIN categorias AS c ON c.id_categorias = f.categorias_id

--Busca as infos do usuario com base no que ele digita na hora do login
SELECT nome, id_usuarios FROM usuarios WHERE email = 'ana.souza@example.com' AND senha = '$2a$06$slu01NQZNo9ji5YLCKMq5eU50lflF0XXepAqiiAexHFlCr3LuiUjO'

--Busca os locais que pertencem a um usuario
SELECT l.nome FROM locais as l WHERE l.usuarios_id = '772e85dd-b933-4de9-8f05-7050b2a62254'