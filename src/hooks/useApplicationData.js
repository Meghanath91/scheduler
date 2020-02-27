import { useReducer, useEffect } from "react";
import axios from "axios";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";


// const SET_SPOTS = "SET_SPOTS";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, value: day });

  
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      dispatch({ type: SET_INTERVIEW, value: { id, interview } });
    });
  };

  const cancelInterview = (id) => {
    
    return axios.delete(`api/appointments/${id}`).then((res) => {
      dispatch({ type: SET_INTERVIEW, value:{id,interview:null} });
    });
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
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
