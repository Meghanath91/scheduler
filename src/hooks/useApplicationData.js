//**********************useApplicationData is containing Top layer functions************************//
import { useReducer, useEffect } from "react";
//axios lib is using for API requests
import axios from "axios";
//import reducer
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

//export fn to Application ==> ==> ==>
export default function useApplicationData() {
  //initilizing reducer with default values
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  //initilizing fn
  const setDay = day => dispatch({ type: SET_DAY, value: day });

  //fn to be called when user book new interview, this will change the states of appointment
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    //making a PUT request to DB server and when resolved dispatch action with new data
    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      dispatch({ type: SET_INTERVIEW, value: { id, interview } });
    });
  };
  //fn to be called when user cancel interview
  const cancelInterview = id => {
    //making a DELETE request to DB server and when resolved dispatch action to change state
    return axios.delete(`api/appointments/${id}`).then(res => {
      dispatch({ type: SET_INTERVIEW, value: { id, interview: null } });
    });
  };
  //useEffect to request data from API
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      //when resolved with response dispatch with appropriate data
      dispatch({
        type: SET_APPLICATION_DATA,
        value: {
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }
      });
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}
