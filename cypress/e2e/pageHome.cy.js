describe("Pagina Home", () => {
  it("Espero que ao clicar em AVANÇAR vá pra uma pagina de opções", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#container a button").click();
    cy.url().should("include", "/selecione-uma-opcao");
  });

  it("Espero que ao clicar em LISTA DE PESSOAS vá para a pagina que carrega as listas", () => {
    cy.visit("http://localhost:3000/selecione-uma-opcao");
    cy.get("#options a button").filter(":contains('Lista de Pessoas')").click();
    cy.url().should("include", "/mostra-usuarios-salvos.html");
  });
});
