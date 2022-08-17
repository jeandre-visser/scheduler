export function getAppointmentsForDay(state, day) {
  const dayObject = state.days.find(element => element.name === day)

  if (!dayObject) {
    return [];
  }

  let appointmentsForDay = [];

  for (const id in state.appointments) {
    if (dayObject.appointments.includes(Number(id))) {
      appointmentsForDay.push(state.appointments[id])
    }
  }
  return appointmentsForDay;
}

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }

  for (let id in state.interviewers) {
    if (Number(id) === interview.interviewer) {
      return {
        ...interview,
        interviewer: {...state.interviewers[id]}
      }
    }
  }
}

export function getInterviewersForDay(state, day) {
  const dayObject = state.days.find(dayItem => dayItem.name === day)

  if (!dayObject) {
    return [];
  }

  let interviewersForDay = [];

  for (const id in state.interviewers) {
    if (dayObject.interviewers.includes(Number(id))) {
      interviewersForDay.push(state.interviewers[id])
    }
  }
  return interviewersForDay;
}