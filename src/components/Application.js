//######################################## Dependencies########################################
import React from "react";
import "components/Application.scss";

import useApplicationData from "hooks/useApplicationData";
import Appointment from "components/Appointment";
import DayList from "components/ DayList";
//importing helper functions
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersByDay
} from "helpers/selectors";

//############################### TOP LAYER APPLICATION FUNCTION ################################
export default function Application() {
  //Exporting to Primary application layer

  //#################### VARIABLE DECLARATION###################################
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersByDay(state, state.day);
  //appointment compos wrapped into schedule
  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

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
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
