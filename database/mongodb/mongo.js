//Importando arquivos de configuração
require('dotenv').config()

//importando classe do mongodb
const { MongoClient } = require('mongodb')

//Setando configuração da classe para fazer a conexão
const client = new MongoClient(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,{
    useUnifiedTopology: true
})

//Função que salva um novo usuário no mongodb
async function saveUser(req, res){
    const {name, email, idade, cidade} = req.body
    try {
        await client.connect()
         //Fazendo verificação de usuários existenstes
         let countUsers = await returnUsers(email)
    
         //Se não existir usuários com o email informado, permitir cadastro
         if(countUsers == 0 && name != '' && email != ''){
             const mongodb = client.db(`${process.env.MONGO_DATABASE}`).collection(`${process.env.MONGO_COLLECTION}`)
                 await mongodb.insertOne({
                    name,
                    email,
                    idade,
                    cidade
                })
             res.status(200).send()
         }else{
             res.status(400).send('Email já registrado ou existem campos em branco!')
         }
     }catch(error){
         console.log(error)
     }
}

//Função responsável por retornar um array com todos os usuários salvos no banco
async function getUsers(req, res){
    try {
        await client.connect()
        const mongodb = client.db(`${process.env.MONGO_DATABASE}`).collection(`${process.env.MONGO_COLLECTION}`)
        let results = []
        await mongodb.find().forEach(item=>{results.push(item)})

        return res.status(200).send(results)
    } catch (error) {
        console.log(error)
    }
}

//Função que faz a verificação de usuários existenstes
async function returnUsers(email){
    try {
        const mongodb = client.db(`${process.env.MONGO_DATABASE}`).collection(`${process.env.MONGO_COLLECTION}`)
        let results = []
        await mongodb.find().forEach(item=>{results.push(item)})
        let countUsers = 0
            results.forEach(item=>{
                if(item.email == email){
                    countUsers = 1
                }
            })
        return countUsers
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    saveUser,
    getUsers
}