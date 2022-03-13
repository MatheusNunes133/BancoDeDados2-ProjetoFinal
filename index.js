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
app.get('/registro-de-pessoas',(req, res)=>{
  return res.sendFile('html/registro-de-pessoas.html',{root: __dirname})
})

//Importando arquivo responsavel pela manipulação do mongodb
const mongo = require('./database/mongodb/mongo')

//Setando portas para fazer operações nos bancos
app.post('/saveNewUser',mongo.saveUser)

//Iniciando o server na porta 3000
app.listen(port,()=>{
  console.log(`Server online na porta ${port}`)
})