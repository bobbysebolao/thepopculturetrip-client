describe("My First Test", function() {
  it("Does not do much!", function() {
    expect(true).to.equal(false);
  });
});

describe("My First Test", function() {
  it("Clicks the 'Login' page link and enters a username in the login form", function() {
    cy.visit("http://localhost:8080/");
    // cy.pause();
    cy.contains("Login").click();
    cy.url().should("include", "/login");
    cy.get("#username")
      .type("mistapepper")
      .should("have.value", "mistapepper");
  });
});
