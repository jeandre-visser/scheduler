import { useReducer, useEffect } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

// Use object lookup pattern for reducer function
const reducer = (state, action) => {
  const reducers = {
    // To use the constant values with an object lookup, we need to use computed property names ( set inside [] )
    [SET_DAY]: (state, action) => {
      return {
        ...state,
        ...action.value,
      };
    },
    [SET_APPLICATION_DATA]: (state, action) => {
      return {
        ...state,
        ...action.value,
      };
    },
    [SET_INTERVIEW]: (state, action) => {
      const appointment = {
        ...state.appointments[action.value.id],
        interview: { ...action.value.interview },
      };

      const appointments = {
        ...state.appointments,
        [action.value.id]: appointment,
      };
      return { ...state, appointments };
    },
  };
  return reducers[action.type](state, action) || state;
};

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => {
    dispatch({ type: SET_DAY, value: { day } });
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) =>
      dispatch({
        type: SET_APPLICATION_DATA,
        value: {
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        },
      })
    );
  }, []);

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      // decrease spots remaining by 1 when booking an interview
      const dayBooked = state.days.find((day) => day.name === state.day);
      state.days[dayBooked.id - 1].spots--;

      dispatch({
        type: SET_INTERVIEW,
        value: {
          id,
          interview,
        },
      });
    });
  };

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`).then((res) => {
      // increase spots remaining by 1 when cancelling an interview
      const dayCancelled = state.days.find((day) => day.name === state.day);
      state.days[dayCancelled.id - 1].spots++;

      dispatch({
        type: SET_INTERVIEW,
        value: {
          id,
          interview: null,
        },
      });
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
};

export default useApplicationData;
