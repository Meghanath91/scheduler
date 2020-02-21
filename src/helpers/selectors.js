export function getAppointmentsForDay(state, day) {
  const getAppointmentArr = state.days.filter(item => item.name === day);
  if (getAppointmentArr.length === 0 ) {
    return [];
  } 
  else {
    const keysToIterate = getAppointmentArr[0].appointments;
    const appointmentsArr = [];
    for (let element of keysToIterate) {
      appointmentsArr.push(state.appointments[element])
    }

    return appointmentsArr;
  }
};

export function getInterview(state, interview) {
  if (interview) {
    return { "student": interview.student, "interviewer": state.interviewers[interview.interviewer] };
  }
  return null;
}

export function getInterviewersByDay(state,day){
  const getInterviewArr = state.days.filter(item => item.name === day);
  if (getInterviewArr.length === 0 ) {
    return [];
  } 
  else {
    const keysToIterate = getInterviewArr[0].interviewers;
    const interviewersArr = [];
    for (let element of keysToIterate) {
      interviewersArr.push(state.interviewers[element])
    }

    return interviewersArr;
  }

}
