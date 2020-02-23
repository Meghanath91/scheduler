import React from "react";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onSave = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  };

  const onDelete = () => {
    transition(DELETING);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(error => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={() => props.interview.interviewer.id}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === SAVING && <Status stat="Saving" />}

      {mode === CREATE && (
        <Form
          onCancel={() => back(EMPTY)}
          interviewers={props.interviewers}
          onSave={onSave}
        />
      )}

      {mode === DELETING && <Status stat="Deleting" />}

      {mode === CONFIRM && (
        <Confirm
          comment="Are you sure you want to delete ?"
          onConfirm={onDelete}
          onCancel={() => back()}
        />
      )}

      {mode === EDIT && (
        <Form
          onCancel={() => transition(SHOW)}
          onSave={(name, interviewer) => onSave(name, interviewer)}
          interviewers={props.interviewers}
          name={props.interview.student}
          interviewer={() => props.interview.interviewer.id}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error msg={"could not save"} onClose={() => back()} />
      )}

      {mode === ERROR_DELETE && (
        <Error msg={"could not Delete"} onClose={() => back()} />
      )}
    </article>
  );
}
