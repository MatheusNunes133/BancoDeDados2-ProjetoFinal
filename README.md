# Instruções de como utilizar a Aplicação Web

### Fazer cópia do repositório na sua máquina local

1. Inicie o git em uma pasta: `git init`
2. Faça um clone na sua máquina local: `https://github.com/MatheusNunes133/BancoDeDados2-ProjetoFinal`

### Baixar dependências necessárias

3. No terminal utilize este comando: `npm i`


### Criar um banco de dados espacial no PostgreSQL

4. Instalar o Postgis
5. Crie um banco de dados no seu PostgreSQL
6. Abra o terminal e cole esse comando para criação da extensão de dados espaciais: 
`CREATE EXTENSION postgis;
CREATE EXTENSION postgis_topology;`
7. Migração da tabela Municipio para seu banco
8. Vídeo aula: https://www.youtube.com/watch?v=pzLZAq61zSY
9. Link para download: http://geoftp.ibge.gov.br/organizacao_do_territorio/malhas_territoriais/malhas_municipais/municipio_2019/Brasil/BR/

### Configurando arquivo de configurações

4. Crie um arquivo na raiz chamada de `.env`
5. Dentro do arquivo deve ser colocado as seguintes configurações:
```
MONGO_HOST = {Seu host(localhost) do mongo}
MONGO_PORT = {Sua porta do mongo}
MONGO_DATABASE = {Nome do banco de dados}
MONGO_COLLECTION = {Nome da coleção}

PG_HOST = {Host onde está rodando seu postgres}
PG_PORT = {Posrta onde está seu postgres}
PG_USER = {Nome do seu usuário}
PG_PASSWORD = {Sua senha}
PG_DATABASE = {Nome do seu banco de dados}

NEO4J_HOST =  {Seu host(localhost) do neo4j}
NEO4J_PORT = {Porta para fazer operações no neo4j (7687)}
NEO4J_USER =  {Nome do seu usuário}
NEO4J_PASSWORD =  {Sua senha}
```

### Iniciando a Aplicação

6. No terminal escreva esse comando: `npm start`
7. Pronto a aplicação já em execução na porta 3000
