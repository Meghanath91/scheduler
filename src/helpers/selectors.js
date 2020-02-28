//*************get appointments for particular day**************/
export function getAppointmentsForDay(state, day) {
  //create a filtered array for particular day for eg:monday
  const getAppointmentArr = state.days.filter(item => item.name === day);
  //if there is no day selected return empty array
  if (getAppointmentArr.length === 0) {
    return [];
  } else {
    //create an array with appoinments id
    const keysToIterate = getAppointmentArr[0].appointments;
    const appointmentsArr = [];
    for (let element of keysToIterate) {
      //add appointment objects to appointments ARRay
      appointmentsArr.push(state.appointments[element]);
    }

    return appointmentsArr;
  }
}
//this is to generate an interview
export function getInterview(state, interview) {
  if (interview) {
    //if interview exists then
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    };
  }
  return null;
}
//this fn is get interviewers for particular day
export function getInterviewersByDay(state, day) {
  //generate a filtered array where day ="required day"
  const getInterviewArr = state.days.filter(item => item.name === day);
  if (getInterviewArr.length === 0) {
    //if no interviewer then
    return [];
  } else {
    //if interviewers exist then
    const keysToIterate = getInterviewArr[0].interviewers;
    const interviewersArr = [];
    for (let element of keysToIterate) {
      //create an array with interview objects
      interviewersArr.push(state.interviewers[element]);
    }

    return interviewersArr;
  }
}
