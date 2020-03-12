describe("My First Test", function() {
  beforeEach(() => {
    cy.visit("http://localhost:8080/login");
  });

  it("greeting text on login page says 'Login'", function() {
    cy.get(".pageHeader").contains("h2", "Login");
  });

  it("navbar links to '/register' page", function() {
    cy.contains("li", "Register").click();
    // .should("have.attr", 'href', '#/register')
    cy.url().should("include", "/register");
  });

  it("requires username", function() {});

  it("requires password", function() {});

  it("requires valid username and password", function() {});

  it("navigates to '/' on successful login", function() {});
});
