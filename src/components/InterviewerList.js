//InterviewerList compo <== <== child of Form compo
//********************import all dependencies*****************/
import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from "prop-types";

InterviewerList.propTypes = {
  interviewer: PropTypes.number,
  setInterviewer: PropTypes.func.isRequired
};

function InterviewerList(props) {
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
