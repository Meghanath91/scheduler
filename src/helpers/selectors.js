export default function getAppointmentsForDay(state, day) {
  const getAppointment = state.days.filter(item => item.name === day);
  if (getAppointment.length === 0) {
    return [];
  } else {
    const keysToIterate = getAppointment[0].appointments;
    console.log('STATE', state);
    console.log('KEYSTOITERATE', keysToIterate)
    const result = [];
    for (let element of keysToIterate) {
      result.push({...state.appointments[element], interview: getInterview(state, state.appointments[element].interview)});
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

