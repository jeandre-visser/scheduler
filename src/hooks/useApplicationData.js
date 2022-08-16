import { useReducer, useEffect } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
// Add a 4th constant/action type to handle the updating of spots remaining
const SET_INTERVIEW_DAYS = "SET_INTERVIEW_DAYS";

// Use object lookup pattern for reducer function
const reducer = (state, action) => {
  const reducers = {
    // To use the constant values with an object lookup, we need to use computed property names ( set inside [] )
    [SET_DAY]: (state, action) => {
      return ({
        ...state,
        ...action.value
      })
    },
    [SET_APPLICATION_DATA]: (state, action) => {
      return ({
        ...state,
        ...action.value
      })
    },
    [SET_INTERVIEW_DAYS]: (state, action) => {
      return ({
        ...state,
        days: action.value
      })
    },
    [SET_INTERVIEW]: (state, action) => {
      const appointment = {
        ...state.appointments[action.value.id],
        interview: { ...action.value.interview }
      };
  
      const appointments = {
        ...state.appointments,
        [action.value.id]: appointment
      }
      return ({...state, appointments})
    } 
  }
  return reducers[action.type](state, action) || state;
}


const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => {
    dispatch({type: SET_DAY, value: {day}})
  };

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => dispatch({
        type: SET_APPLICATION_DATA, 
        value: {
          days: all[0].data, 
          appointments: all[1].data, 
          interviewers: all[2].data
        }
      })
    )
  }, [])

  // Updates the remaining spots after an interview is booked or cancelled
  useEffect(() => {
    axios
      .get("/api/days")
      .then(days => dispatch({
        type: SET_INTERVIEW_DAYS, 
        value: days.data
      }))
  }, [state.appointments])


  const bookInterview = (id, interview) => {

    return axios
    .put(`/api/appointments/${id}`, {interview})
    .then(res => dispatch({
      type: SET_INTERVIEW, 
      value: {
        id, 
        interview
      }
    }));
  };
  
  const cancelInterview = (id) => {
    
    return axios
      .delete(`/api/appointments/${id}`)
      .then(res => dispatch({
        type: SET_INTERVIEW, 
        value: {
          id, 
          interview: null
        }
      }));
  };

  return {
    state, 
    setDay,
    bookInterview,
    cancelInterview
  }
};

export default useApplicationData;