jest.mock("../database/mongodb/mongo", ()=>{
  return {
    setRelationshipMongo: jest.fn()
  }
})

const { createRelationship,addToNeo4j,removeToNeo4j } = require("../database/neo4j/neo4j");

describe("Neo4J", () => {
  test("Espero poder criar um relacionamento no neo4j", async () => {
    let req = {
      body: {
        firstEmail: "matheus10@matheus.com",
        secondEmail: "kaue@kaue.com",
        relationshipType: "Amizade",
      },
    };
    let result = await createRelationship(req);

    expect(result).toBe("relacionamento criado");
  });

  test("Espero poder adicionar um usuário no neo4j", async () => {
    let name = "Matheus";
    let email = "matheus@123.com";
    let result = await addToNeo4j(name, email);

    expect(result).toBe("Usuario Adicionado");
  });

  test("Espero poder remover um usuário no neo4j", async () => {
    let email = "matheus@123.com";
    let result = await removeToNeo4j(email);

    expect(result).toBe("Usuario Removido");
  });
});
