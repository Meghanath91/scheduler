//**************************importing all dependenccies****************//
import React, { useState } from "react";
import "components/Appointment/styles.scss";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
//exporting ==> ==> ==> to appointment compo
export default function Form(props) {//<== <== getting props from parent appointment compo
  //declaration of useState
  const [name, setName] = useState(props.name || "");
  const [error, setError] = useState("");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  // fn to reset values in form when user clicks cancel button
  const reset = () => {
    setName("");
    setInterviewer(null);
  };
  //fn to be called when user clicks cancel button
  const onCancel = () => {
    reset();
    props.onCancel();
  };
  //fn to validate form element
  const validate = () => {
    if (name === "") {//if there is no name in the placeholder then show error msg
      setError("Student name cannot be blank");
      return;
    }
    if(interviewer === null){//if interviewer is not selected show error msg
      setError("Please select an interviewer");
      return
    }
    //if interviewer and student is selected then ==> fn called with empty string
    setError("");
    //fn will be called with student name & interviewer obj
    props.onSave(name, interviewer);
  };


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={event => setName(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={onCancel} danger>
            Cancel
          </Button>
          <Button onClick={validate} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
