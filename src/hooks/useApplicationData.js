import { useReducer, useEffect } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
// const SET_SPOTS = "SET_SPOTS";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, value: day });

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return {
          ...state,
          day: action.value
        };

      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.value.days,
          appointments: action.value.appointments,
          interviewers: action.value.interviewers
        };

      case SET_INTERVIEW: {





        const appointment = {
          ...state.appointments[action.value.id],
          interview: { ...action.value.interview }
        };

        const appointments = {
          ...state.appointments,
          [action.value.id]: appointment
        };

        return {
          ...state,
          appointments,
         
        };
      }

      // case SET_SPOTS:
      //   return { ...state, days: action.value };

      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      dispatch({ type: SET_INTERVIEW, value: { id, interview } });
    });
  };

  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    return axios.delete(`api/appointments/${id}`, appointment).then(() => {
      dispatch({ type: SET_INTERVIEW, value: id });
    });
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers ")
    ]).then(all => {
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

  // useEffect(() => {
  //   axios.get("api/days").then(res => {
      
  //     dispatch({ type: SET_SPOTS, value: res.data });
  //   });
  // }, [state.appointments]);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}
