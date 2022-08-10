import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import { Value } from "sass";

const InterviewerList = (props) => {

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map((interviewer) => 

          <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={value === interviewer.id}
            setInterviewer={() => onChange(interviewer.id)}
          />

        )}

      </ul>
    </section>
  );
};

export default InterviewerList;