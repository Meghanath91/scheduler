import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

function InterviewerList(props) {
  console.log("props interviewer/list", props);
  const interviewersCatalog= props.interviewers
    ? props.interviewers.map(Interviewer => {
        return (
          <InterviewerListItem
            key={Interviewer.id}
            name={Interviewer.name}
            avatar={Interviewer.avatar}
            selected={Interviewer.id === props.value}
            setInterviewer={event => props.setInterviewer(Interviewer.id)}
          />
        );
      })
    : [];
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersCatalog}</ul>
    </section>
  );
}

export default InterviewerList;
