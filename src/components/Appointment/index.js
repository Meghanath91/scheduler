//**************************Appointment Component(contains other components) (2nd layer)*******************************//
//importing all dependencies
import React from "react";
import "components/Appointment/styles.scss";
//importing Hooks
import useVisualMode from "../../hooks/useVisualMode";
//importing child components to appointment compo
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
//*******initilization of constants */
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
//Exporting function to Application layer ==> ==> ==>
export default function Appointment(props) {//<== <== <== getting props from Application
  //Destructuring
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  // fn to be called when user saves an interview 
  const onSave = (name, interviewer) => {
    //create an obj for new interview with the arguments passed from Top layer
    const interview = {
      student: name,
      interviewer
    };
    //fn transition will be called with "SAVING"
    transition(SAVING);
    props
      .bookInterview(props.id, interview)//call the fn in toplayer with values from bottom layer 
      .then(() => transition(SHOW))// when it is done then call transition with SHOW
      .catch(error => transition(ERROR_SAVE, true));//when there is error call transition with error save
  };
  //fn to be called when user delete an interview
  const onDelete = () => {
    transition(DELETING);
    props
      .cancelInterview(props.id)//fn in toplayer will be called
      .then(() => {
        transition(EMPTY);//when resolved call with EMPTY
      })
      .catch(error => transition(ERROR_DELETE, true));//when there is error 
  };

  return (
    <article className="appointment"  data-testid="appointment">
      <Header time={props.time} />
      
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
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
