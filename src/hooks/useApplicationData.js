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

        let spotChange;

        if (action.value.interview && !state.appointments[action.value.id].interview){
          spotChange = -1;
        }
        if (state.appointments[action.value.id].interview && !action.value.interview) {
          spotChange = 1;
        }
        if (state.appointments[action.value.id].interview && action.value.interview) {
          spotChange = 0;
        }
        
        //creates an array of days (newDays) that includes the updated number of spots for the day in the current state
        let newDays = state.days.map(item => {
          if (item.name !== state.day) {
            return item;
          }
          return {
            ...item,
            spots: (item.spots + spotChange)
          }
        })



        const appointment = {
          ...state.appointments[action.value.id],
          interview: action.value.interview
        };

        const appointments = {
          ...state.appointments,
          [action.value.id]: appointment
        };

        return {
          ...state,
          appointments,
          days:newDays
         
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
