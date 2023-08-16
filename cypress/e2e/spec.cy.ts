describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/");
    cy.get('input[name="comp_name"]').type("(주)TestComp");
    cy.get('[name="comp_type"]')
      .parent()
      .click()
      .get('[data-value="SOL"]')
      .click();
    cy.get('[name="comp_purpose"]').type("테스트 방향");
    cy.get('[name="comp_size"]').type("{upArrow}".repeat(14));
    cy.get('[name="apply_start"]').type("2023-08-15T16:53:00");
    cy.get('[name="end_time"]').type("2023-08-20T23:59:59");
    // cy.get("#add").click();
  });
});
