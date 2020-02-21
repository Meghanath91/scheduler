// import React from "react";
import React, { useState, useEffect } from "react";
import Appointment from "components/Appointment";
import axios from "axios";
// const axios = require('axios')

import "components/Application.scss";
import DayList from "components/ DayList";
import getAppointmentsForDay from "helpers/selectors";
// import getInterview from "helpers/selectors"

export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState(state => ({ ...state, day }));

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers "))
    ]).then(all => {
      console.log(all[2].data, "interviewrs");
      setState(state => ({
        ...state,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {
        getAppointmentsForDay(state, state.day).map(appointment => {
          return <Appointment key={appointment.id} {...appointment} />;
        })
        }

        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
