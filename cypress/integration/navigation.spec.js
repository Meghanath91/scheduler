//*************Test for DayList component*****************//
describe("Navigation", () => {
  //test if we can go to main page
  it("should visit root", () => {
    cy.visit("/");
  });
  //test if we can select different day
  it("should navigate to Tuesday", () => {
    cy.visit("/");

    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});
