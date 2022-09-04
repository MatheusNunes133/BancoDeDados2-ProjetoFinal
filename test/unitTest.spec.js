/* Testes de Unidade */
const {
  returnAllUsers,
  returnUsers,
  setRelationshipMongo,
  updateUser,
} = require("../database/mongodb/mongo");

describe("MongoDB", () => {
  test("Espero retornar um array com todos os usuários do mongo", async () => {
    let result = await returnAllUsers();

    expect(Array.isArray(result)).toBe(true);
  });

  test("Espero retornar 0 se o email cadastrado não existe", async () => {
    const email = "matheus@matheus111";
    let resultado = await returnUsers(email);

    expect(resultado).toBe(0);
  });

  test("Espero retorar 1 se o email cadastrado já existir", async () => {
    const email = "kaue@kaue.com";
    let resultado = await returnUsers(email);

    expect(resultado).toBe(1);
  });

  test("Espero poder adicionar um relacionamento no mongo", async () => {
    let email = "matheus@matheus.com";
    let relacionamento = "Amizade";

    let result = await setRelationshipMongo(email, relacionamento);

    expect(result).toBe("Alteração realizado com sucesso");
  });

  test("Espero poder alterar um usuário no mongo", async () => {
    let req = {
      body: {
        name: "Matheus",
        oldEmail: "matheus10@matheus.com",
        newEmail: "matheus@matheus.com",
        idade: 20,
        cidade: "Rio de Janeiro",
      },
    };

    let result = await updateUser(req);
    expect(result).toBe("Alterado com sucesso");
  });

  test("Espero não poder alterar um usuário no mongo caso o email antigo não exista", async () => {
    let req = {
      body: {
        name: "Matheus",
        oldEmail: "Email@naoexiste.com",
        newEmail: "matheus100@matheus.com",
        idade: 20,
        cidade: "Rio de Janeiro",
      },
    };

    let result = await updateUser(req);
    expect(result).toBe("Erro ao alterar usuario");
  });
});

const { addToNeo4j, removeToNeo4j } = require("../database/neo4j/neo4j");

describe("Neo4J", () => {
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
