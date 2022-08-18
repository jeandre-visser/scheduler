# Interview Scheduler
This single page React-based web app allows a user to book, edit, and cancel interview appointments with a selection of mentors and times on weekdays.

## Quick Glimpse

## **Walkthrough**
![Walkthrough](https://github.com/jeandre-visser/scheduler/blob/master/docs/Interview%20Scheduler.gif)
## **Main Page**
![Main Page](https://github.com/jeandre-visser/scheduler/blob/master/docs/appointments.png)

## **Book Interview**
![Book Interview](https://github.com/jeandre-visser/scheduler/blob/master/docs/book-interview.png)

## **Cancel Interview Confirmation**
![Cancel Interview](https://github.com/jeandre-visser/scheduler/blob/master/docs/cancel-interview.png)

## **Mobile Display**
![Mobile](https://github.com/jeandre-visser/scheduler/blob/master/docs/mobile.png)


## How to Use
- A user can select a day on the side bar for when they would like to book an interview where they will be presented with time slots
- The user can also see how many spots are remaining underneath each week day in the sidebar
- Choose a time that has not already been booked and press on the "+" button
- Input user name and select from the choice of interviewers
- Click the "Save" button and the user appointment will be displayed
- If the user chooses, they may cancel or edit an existing appointment by pressing either the edit or delete buttons

## Setup Locally
1. Install all dependencies with `npm install`.
2.  Download and install [scheduler-api](https://github.com/jeandre-visser/scheduler-api) following the instructions in the README.md.
3. Start the API server by using `npm start` in the scheduler-api directory.
4. Run the webpack development server using `npm start` in the scheduler directory. 
5. The web app will automatically be served in your browser at <http://localhost:8000/>.

## Stack 
- React, SCSS, HTML
- Node, PostgreSQL

## Testing
- Unit: Storybook
- Unit/Integration: Jest
- End to End: Cypress


## Dependencies
- React 16.9.0 or above
- Classnames
- Axios
- react-dom
- react-scripts
- sass





