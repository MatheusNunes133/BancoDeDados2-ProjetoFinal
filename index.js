//Importando express e cors
const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000;

//Permitindo que o server express possa utilizar o formato JSON
app.use(express.json())

//Configurando arquivos staticos e a engine html
app.set('view engine', 'html')
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/assets/images'))
app.use(express.static(__dirname + '/assets/icons'))
app.use(express.static(__dirname + '/html'))
app.use(express.static(__dirname + '/js'))

//Setando configurações do cors
app.use(function(req, res, next){
    app.use(cors())
    res.header("Access-Control-Allow-Origin", "*");
    next()
});

//Setando portas para renderizar landing pages
app.get('/',(req, res)=>{
  return res.sendFile('index.html', {root: __dirname})
})

app.get('/selecione-uma-opcao', (req, res)=>{
  return res.sendFile('html/pagina-de-opcoes.html', {root: __dirname})
})

app.get('/registro-de-pessoas',(req, res)=>{
  return res.sendFile('html/registro-de-pessoas.html',{root: __dirname})
})

app.get('/mostra-usuarios-salvos',(req, res)=>{
  return res.sendFile('html/mostra-usuarios-salvos.html',{root: __dirname})
})

app.get('/edit-user',(req, res)=>{
  return res.sendFile('html/edit-usuario.html', {root: __dirname})
})

//Importando arquivo responsavel pela manipulação do mongodb
const mongo = require('./database/mongodb/mongo')

app.post('/saveNewUserMongo',mongo.saveUser)
app.get('/getUsersMongo', mongo.getUsers)
app.post('/updateUserMongo', mongo.updateUser)
app.post('/deleteUserMongo', mongo.deleteUser)

//Importando arquivo responsável pela manipulação do postresSQL
const postgres = require('./database/postgres/postgres')
app.post('/getSvgPostgres', postgres.getSVG)
app.post('/getViewBoxPostgres', postgres.getViewBox)

//Importando arquivo responsável pela manipulação do neo4j
const neo4j = require('./database/neo4j/neo4j')

app.post('/save-relationship-neo4j', neo4j.createRelationship)

//Iniciando o server na porta 3000
app.listen(port,()=>{
  console.log(`Server online na porta ${port}`)
})