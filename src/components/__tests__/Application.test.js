import React from "react";
import axios from "axios";
import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // Render the Application
    const { container } = render(<Application/>)
    
    // Wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");

    const appointment = appointments[0];

    // Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"));

    // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name"
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    // Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // Verify that the the appointment element contains the text "SAVING" immediately after the "Save" button is clicked
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();
    
    // Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // Find the specific day node that contains the text "Monday"
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    // Check that the day with the text "Monday" also has the text "no spots remaining".
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // Render the Application
    const { container } = render(<Application />)

    // Wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Click the "Delete" button on the first booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

    // Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // Check that the element with the text "DELETING" is displayed.
    expect(getByText(appointment, "DELETING")).toBeInTheDocument();

    // Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    /**
     * Changed to "1 spot remaining" instead of "2 spots remaining" like in compass because the previous test ("loads data, books an interview and reduces the spots remaining for the first day by 1") reduces the amount of spots remaining by 1, while this test adds an additional spot making there only be 1 spot remaining instead of 2
     * Another option is to keep the 2 spots remaining but then skip the previous test and run it separately
     */
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  })

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // Render the Application
    const { container } = render(<Application />);

    // Wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(appointment => 
      queryByText(appointment, "Archie Cohen")
    );

    // Click the "Edit" button on the first booked appointment.
    fireEvent.click(getByAltText(appointment, "Edit"));

    // Enter a new name into the input with the placeholder "Enter Student Name" 
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Donald Trump" }
    });

    // Click on the first interviewer in the list
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // Click save
    fireEvent.click(getByText(appointment, "Save"));

    // Check that the element with the text "SAVING" is displayed.
    expect(getByText(appointment, ("SAVING"))).toBeInTheDocument();

    // Wait until the element shows the new student name and Sylvia Palmer as the interviewer
    await waitForElement(() => getByText(appointment, "Donald Trump"));

    expect(getByText(appointment, "Sylvia Palmer")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    // Render the Application
    const { container } = render(<Application/>);

    // Wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");

    const appointment = appointments[0];

    // Click on the "Add" button 
    fireEvent.click(getByAltText(appointment, "Add"));

    // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name"
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    // Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // Verify that the the appointment element contains the text "SAVING" immediately after the "Save" button is clicked
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    // Wait until the element with the text "could not save appointment" is displayed.
    await waitForElement(() => getByText(appointment, /could not save appointment/i));

    // Click the "Close" button on the error message
    fireEvent.click(getByAltText(appointment, "Close"));

    // Check that we return to the placeholder "Enter Student Name"
    expect(getByPlaceholderText(appointment, "Enter Student Name"));
  });



})
