/// <reference types="cypress" />

describe("<AdminUserList /> page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.adminLogin();
    cy.get("#adminmenu").click();
    cy.get('[href="/admin/userlist"]').click();
  });
  it("should back to home top page, if the user click the left-arrow icon", () => {
    cy.get('[data-id="back"]').click();
    cy.url().should("eq", "http://localhost:3000/");
  });
  it("should delete the user when the user click the delete button", async () => {
    // create the user who is deleted here

    cy.request({
      method: "POST",
      url: "http://localhost:1010/api/users/register",
      body: {
        name: "test",
        email: "test@example.com",
        password: "123456",
        confirmPassword: "123456",
      },
    });
    cy.get(":nth-child(6) > :nth-child(5) > #userdelete").click();
    expect(":nth-child(6) > #userEmail").to.not.equal("test@example.com");
  });
});
