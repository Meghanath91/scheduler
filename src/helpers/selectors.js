export function getAppointmentsForDay(state, day) {
  const getAppointmentArr = state.days.filter(item => item.name === day);
  if (getAppointmentArr.length === 0 ) {
    return [];
  } 
  else {
    const keysToIterate = getAppointmentArr[0].appointments;
    const result = [];
    for (let element of keysToIterate) {
      result.push(state.appointments[element])
    }

    return result;
  }
};

export function getInterview(state, interview) {
  if (interview) {
    return { "student": interview.student, "interviewer": state.interviewers[interview.interviewer] };
  }
  return null;
}

