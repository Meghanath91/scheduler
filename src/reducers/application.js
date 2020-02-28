//Export constants => => => useApplicationData
export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
//Export function => => => useApplicationData
export default function reducer(state, action) {
  switch (action.type) {
    //this case will set new state for day
    case SET_DAY:
      return {
        ...state,
        day: action.value
      };
    //this case will set new states for days,appointments & interviewers
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.value.days,
        appointments: action.value.appointments,
        interviewers: action.value.interviewers
      };
    //this case will set new states for booking and cancelling interviews also set state for spots
    case SET_INTERVIEW: {
      let spotChange;

      if (
        //when there is a new interview added then number of spots remaining will be decrease by 1
        action.value.interview &&
        !state.appointments[action.value.id].interview
      ) {
        spotChange = -1;
      }
      if (
        //when user performs Delete function ,number of spots will increase by 1
        state.appointments[action.value.id].interview &&
        !action.value.interview
      ) {
        spotChange = 1;
      }
      if (
        //when user performs Edit function ,number of spots will remains the same
        state.appointments[action.value.id].interview &&
        action.value.interview
      ) {
        spotChange = 0;
      }

      //creates an array of days (newDays) that includes the updated number of spots for the day in the current state
      let newDays = state.days.map(item => {
        if (item.name !== state.day) {
          //if there is no change in spots return day with out updating spots

          return item;
        }
        return {
          //if there is change in number of "spots" then it will update days object
          ...item,
          spots: item.spots + spotChange
        };
      });
      // create appointment with new interview values
      const appointment = {
        ...state.appointments[action.value.id],
        interview: action.value.interview
      };
      // create appointments with new appointment
      const appointments = {
        ...state.appointments,
        [action.value.id]: appointment
      };
      //return with new days
      return {
        ...state,
        appointments,
        days: newDays
      };
    }
    // default case for switch cases
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
