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

  it("should edit an interview", () => {
    // click edit button
    cy.get("[alt=Edit]")
      .first()
      .click({force: true});

    // type in student name
    cy.get("[data-testid=student-name-input]")
    .clear()
    .type("Lydia Miller-Jones");

    // select interviewer
    cy.get("[alt='Tori Malcolm']").click();

    // click save
    cy.contains("Save").click();

    // verify that the student and interviewer names are shown
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    // click the delete button
    cy.get("[alt=Delete]").click({force: true});

    // click confirm
    cy.contains("Confirm").click();
    
    // check that "DELETING" indicator exists, then after the timeout it no longer exists
    cy.contains("DELETING").should("exist");
    cy.contains("DELETING").should("not.exist");

    // verify that the "Archie Cohen" appointment no longer exists
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
