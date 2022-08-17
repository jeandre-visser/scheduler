describe("Appointments", () => {
    beforeEach(() => {
      cy.request("GET", "/api/debug/reset");
      cy.visit("/");
      cy.contains("Monday");
    })
  
  it("should book an interview", () => {
    cy.get("[alt=Add]")
      .first()
      .click();

    // type in student name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    // select interviewer
    cy.get("[alt='Sylvia Palmer']").click();

    // click save
    cy.contains("Save").click();

    // verify that the student and interviewer names are shown
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  })
});