const getAppointmentsForDay = function(state, day) {
  const getAppointment = state.days.filter(item => item.name === day);
  if (getAppointment.length === 0) {
    return [];
  } else {
    const keysToIterate = getAppointment[0].appointments;
    const result = [];
    for (let element of keysToIterate) {
      result.push(state.appointments[element]);
    }
    return result;
  }
}

const getInterview = function(state,interview){
  

}

export default {getInterview,getAppointmentsForDay}