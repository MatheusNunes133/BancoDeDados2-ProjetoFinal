/* Testes de Unidade */
const { returnAllUsers, returnUsers } = require("../database/mongodb/mongo");

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
});
