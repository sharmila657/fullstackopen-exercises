describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: 'Cypress Testing',
      username: 'Cypress',
      password: '123456'
    }
    cy.request('POST',  `${Cypress.env("BACKEND")}/users`, user) 
    cy.visit("http://localhost:5173/");

  });

  it("Login form is shown", function () {
    cy.contains("Login").click();
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("Login").click();
      cy.get("#username").type("Cypress");
      cy.get("#password").type("123456");
      cy.contains("login").click();
      cy.contains("Cypress Testing logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("Login").click();
      cy.get("#username").type("Cypress");
      cy.get("#password").type("wrong-password");
      cy.contains("login").click();
      cy.get(".errmessage").should("contain", "wrong username or password")
      cy.get('.errmessage').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get(".errmessage").should("have.css", "border-style", "solid");
    });
  });
})