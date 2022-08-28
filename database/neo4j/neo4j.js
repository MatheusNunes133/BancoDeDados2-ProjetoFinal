require("dotenv").config();

const neo4j = require("neo4j-driver");

const uri = `neo4j://${process.env.NEO4J_HOST}:${process.env.NEO4J_PORT}`;
const driver = neo4j.driver(
  uri,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

const session = driver.session();

//Adiciona usuário no neo4j
async function addToNeo4j(name, email) {
  try {
    let query = `create(:Pessoa{name: '${name}', email: '${email}'})`;
    await session.run(query);
    return "Usuario Adicionado";
  } catch (error) {
    console.log(error);
  }
}

//Remove usuário do neo4j
async function removeToNeo4j(email) {
  try {
    let query = `match(p:Pessoa{email: '${email}'}) detach delete p`;
    await session.run(query);
    return "Usuario Removido";
  } catch (error) {
    console.log(error);
  }
}

//
async function createRelationship(req, res) {
  const { firstEmail, secondEmail, relationshipType } = req.body;
  try {
    const mongo = require("../mongodb/mongo");
    let query = `match(p1:Pessoa{email: '${firstEmail}'})
                    optional match(p2:Pessoa{email: '${secondEmail}'})
                    create (p1)-[r:${relationshipType}]->(p2)`;
    await session.run(query);

    let relation1 = `${relationshipType} -> ${firstEmail}`;
    let relation2 = `${relationshipType} -> ${secondEmail}`;
    await mongo.setRelationshipMongo(secondEmail, relation1);
    await mongo.setRelationshipMongo(firstEmail, relation2);
    return res.status(200).send();
  } catch (error) {
    return res.status(400).send();
  }
}
module.exports = {
  addToNeo4j,
  removeToNeo4j,
  createRelationship,
};
