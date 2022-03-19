//Importando arquivos de configuração
require('dotenv').config()

//importando classe do mongodb
const { MongoClient } = require('mongodb')

//Setando configuração da classe para fazer a conexão
const client = new MongoClient(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,{
    useUnifiedTopology: true
})

const neo4j = require('../neo4j/neo4j')

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
            await neo4j.addToNeo4j(name, email)
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

//Função responsável por editar um usuário no mongo
async function updateUser(req, res){
    const { name, oldEmail, newEmail, idade, cidade } = req.body
    
    try {
        await client.connect()
        const mongodb = client.db(`${process.env.MONGO_DATABASE}`).collection(`${process.env.MONGO_COLLECTION}`)
        //Fazendo verificação de usuários existenstes
        let countUsers = await returnUsers(oldEmail)
        
        //Se existir algum usuário com o email antigo informado, permite fazer a modificação
        if(countUsers == 1 && oldEmail != '' && newEmail != ''){
            const query = {email: oldEmail}
            const update = {$set: {name:name, email: newEmail, idade: idade, cidade: cidade}}

            await mongodb.updateOne(query, update)
            return res.status(200).send()
        }else{
            return res.status(400).send()
        }
    } catch (error) {
        console.log(error)
    }
}

//Função responsável por deletar um usuário resgistrado no mongbd
async function deleteUser(req, res){
    const { email } = req.body

    try {
        await client.connect()
        const mongodb = client.db(`${process.env.MONGO_DATABASE}`).collection(`${process.env.MONGO_COLLECTION}`)
        let countUsers = await returnUsers(email)

        if(countUsers == 1){
            mongodb.deleteOne({
                email,
            })
            await neo4j.removeToNeo4j(email)
            let arrayResult = await returnAllUsers()
                arrayResult.forEach(item=>{
                    if(item.relacao.includes(email)){
                        let query = {email: item.email}
                        let update = {$set: {name:item.name, email: item.email, idade: item.idade, cidade: item.cidade, relacao: ''}}
                        mongodb.updateMany(query, update)
                    }
                })
            return res.status(200).send()
        }else{
            return res.status(400).send()
        }
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

//Função que altera relacionamento salvo no mongo
async function setRelationshipMongo(email, relation){
    try {
        await client.connect()
        const mongodb = client.db(`${process.env.MONGO_DATABASE}`).collection(`${process.env.MONGO_COLLECTION}`)
        let query = {email: email}
        let set = {$set: {relacao: relation}}
        mongodb.updateOne(query, set)
    } catch (error) {
        console.log(error)
    }
}

//Função que retorna todos os usuários no mongo
async function returnAllUsers(){
    try {
        await client.connect()
        const mongodb = client.db(`${process.env.MONGO_DATABASE}`).collection(`${process.env.MONGO_COLLECTION}`)
        let results = []
        await mongodb.find().forEach(item=>{results.push(item)})
            
        return results

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    saveUser,
    getUsers,
    updateUser, 
    deleteUser,
    setRelationshipMongo
}