//this function is responsible to show warning dialog box with confirm button
import React from "react";
import "components/Appointment/styles.scss";
import Button from "components/Button";
//export fn to ==> ==> ==> appointment compo
export default function Confirm(props) {//<== <== getting props from Parent
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.comment}</h1>
      <section className="appointment__actions">
        <Button onClick={props.onCancel} danger>
          Cancel
        </Button>
        <Button onClick={props.onConfirm} danger>
          Confirm
        </Button>
      </section>
    </main>
  );
}
