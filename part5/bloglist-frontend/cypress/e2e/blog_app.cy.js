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
      cy.get("#login-btn").click();
      cy.contains("Cypress Testing logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("Login").click();
      cy.get("#username").type("Cypress");
      cy.get("#password").type("wrong-password");
      cy.get("#login-btn").click();
      cy.get(".errmessage").should("contain", "wrong username or password")
      cy.get('.errmessage').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get(".errmessage").should("have.css", "border-style", "solid");
    });
  });

    describe("When logged in", function () {
    beforeEach(function () {
      cy.contains("Login").click();
      cy.get("#username").type("Cypress");
      cy.get("#password").type("123456");
      cy.contains("login").click();
    });

    const createBlog = function () {
      cy.contains("new note").click();
      cy.get("#title").type("Title added by cypress test");
      cy.get("#author").type("Cypress In-built Tester");
      cy.get("#url").type("https://testingurl.com.np");
      cy.get("#form").click();
      cy.contains("Title added by cypress test");
      cy.contains("Cypress In-built Tester");
      cy.get(".notification").should("have.css", "color", "rgb(0, 128, 0)");
      cy.get(".notification").should("have.css", "border-style", "solid");
    };

    it("A blog can be created", createBlog);

    it("User can Like a blog", function () {
      createBlog();
      cy.contains("view").click();
      cy.contains("0");
      cy.get("#likes").click();
      cy.contains("1");
    });
      it("User can delete a blog", function () {
        createBlog();
        cy.contains("view").click();
        cy.get("#remove").click();
        cy.contains(".notification",
        "Blog deleted successfully!",
        { matchCase: false }
        );
        cy.get(".notification").should("have.css", "color", "rgb(0, 128, 0)");
        cy.get(".notification").should("have.css", "border-style", "solid");
      })
  });
})