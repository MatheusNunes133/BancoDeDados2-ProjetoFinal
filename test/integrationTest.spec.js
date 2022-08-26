const resquest = require("supertest");
const server = require("../routes");

/* jest.mock("../database/mongodb/mongo", {
  getUsers: jest.fn(),
}); */

describe("Funções de CRUD do Mongo", () => {
  test("Espero retornar codigo 200 de sucesso ao resgatar usuários", async () => {
    const response = await resquest(server).get("/getUsersMongo");
    expect(response.statusCode).toBe(200);
  });

  test("Espero retornar um código de status 200 de sucesso ao adicionar usuário", async () => {
    const response = await resquest(server).post("/saveNewUserMongo").send({
      name: "matheus1",
      email: "matheus@matheus1",
      idade: "19",
      cidade: "São Paulo",
    });

    expect(response.statusCode).toBe(200);
  });

  test("Espero não salvar um usuário com um email já registrado no banco", async () => {
    const response = await resquest(server).post("/saveNewUserMongo").send({
      name: "matheus1",
      email: "matheus@matheus1",
      idade: "19",
      cidade: "São Paulo",
    });

    expect(response.statusCode).toBe(400);
  });

  test("Espero poder deletar um usuário", async () => {
    const response = await resquest(server).post("/deleteUserMongo").send({
      email: "matheus@matheus1",
    });

    expect(response.statusCode).toBe(200);
  });

  test("Espero um statusCode 400 caso o email informado não exista", async () => {
    const response = await resquest(server).post("/deleteUserMongo").send({
      email: "matheus@matheus12",
    });

    expect(response.statusCode).toBe(400);
  });
});
