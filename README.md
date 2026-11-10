API de Lapiseiras

API REST para gerenciar um catálogo de lapiseiras, desenvolvida com Node.js, Express e MongoDB. Com ela é possível cadastrar, listar, buscar, atualizar e excluir lapiseiras: um CRUD completo.

O projeto foi pensado como a base de dados de uma futura loja online de lapiseiras, a Lapisari.

Deploy: https://lapisari-banconaorelacional-1.onrender.com

🛠️ Tecnologias
Node.js: ambiente de execução JavaScript
Express: framework para criar as rotas HTTP
MongoDB Atlas: banco de dados NoSQL na nuvem
Render: hospedagem da API
Estrutura de uma lapiseira

Cada lapiseira é salva no MongoDB como um documento neste formato:

json
{
  "marca": "Pentel",
  "modelo": "Graphgear 1000",
  "grafite": 0.5,
  "material": "metal",
  "preco": 89.90,
  "emEstoque": true
}
Campo	Tipo	Descrição
marca	String	Fabricante da lapiseira
modelo	String	Nome do modelo
grafite	Number	Espessura do grafite em mm (0.3, 0.5, 0.7…)
material	String	Material do corpo (metal, plástico…)
preco	Number	Preço em reais
emEstoque	Boolean	Indica se há unidades disponíveis

O _id é gerado automaticamente pelo MongoDB.

Endpoints
Método	Rota	Descrição
GET	/	Verifica se a API está no ar
POST	/lapiseiras	Cadastra uma nova lapiseira
GET	/lapiseiras	Lista todas as lapiseiras
GET	/lapiseiras/:id	Busca uma lapiseira pelo id
PUT	/lapiseiras/:id	Atualiza os dados de uma lapiseira
DELETE	/lapiseiras/:id	Exclui uma lapiseira
Exemplos

Cadastrar uma lapiseira

http
POST /lapiseiras
Content-Type: application/json

{
  "marca": "Rotring",
  "modelo": "600",
  "grafite": 0.7,
  "material": "metal",
  "preco": 159.90,
  "emEstoque": true
}

Resposta (201 Created):

json
{
  "acknowledged": true,
  "insertedId": "6730f1a2b4c5d6e7f8a9b0c1"
}

Atualizar o preço de uma lapiseira

http
PUT /lapiseiras/6730f1a2b4c5d6e7f8a9b0c1
Content-Type: application/json

{
  "preco": 149.90
}

Só os campos enviados são alterados. Os demais continuam iguais.

Respostas de erro
Status	Quando acontece
400	O id enviado não está no formato válido do MongoDB
404	Nenhuma lapiseira foi encontrada com aquele id
 Como rodar localmente

Pré-requisitos: Node.js 18+ e uma conta no MongoDB Atlas (ou MongoDB local).

Clone o repositório:
bash
   git clone https://github.com/SEU-USUARIO/api-lapiseiras.git
   cd api-lapiseiras
Instale as dependências:
bash
   npm install
Defina a variável de ambiente NARIN com a string de conexão do MongoDB:
bash
   export NARIN="mongodb+srv://usuario:senha@cluster.mongodb.net/"

No Windows (PowerShell):

powershell
   $env:NARIN="mongodb+srv://usuario:senha@cluster.mongodb.net/"
Inicie a API:
bash
   npm start

A API vai rodar em http://localhost:3000.

Deploy no Render
Crie um Web Service no Render ligado a este repositório.
Configure:
Build Command: npm install
Start Command: npm start
Em Environment, adicione a variável NARIN com a string de conexão do MongoDB.
No MongoDB Atlas, em Network Access, libere o IP 0.0.0.0/0 para o Render conseguir se conectar.

A porta é definida automaticamente pelo Render através da variável PORT.

👤 Autor

Feito por Lucas.
