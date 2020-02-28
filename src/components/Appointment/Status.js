//importing dependencies
import React from "react";
import "components/Appointment/styles.scss";

export default function Status(props) {//getting props from top layer
  
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{props.stat}</h1>
    </main>
  );
}
