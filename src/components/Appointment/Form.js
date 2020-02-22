import React, { useState } from "react";
import "components/Appointment/styles.scss";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";





export default function Form(props) {
  console.log(props,"props with save compo")
  const reset = function() {
    setName("");
    setInterviewer(null);
    props.onCancel();
  };
  const cancel = function() {
    reset();
    props.onCancel();
  };

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={name}
            onSubmit={event => event.preventDefault()}
            onChange={e => setName(e.target.value)}
            placeholder="Enter Student Name"
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          <Button onClick= {()=>props.onSave(name,interviewer)} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
