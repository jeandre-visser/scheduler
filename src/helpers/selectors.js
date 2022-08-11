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