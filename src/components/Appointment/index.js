import React from "react";
import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";

const Appointment = (props) => {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  
  return (
    <article className="appointment">

      <Header time={props.time} />
      { props.interview ? 
      <Show  
        student={props.interview.student}
        interviewer={props.interview.interviewer.name} /> : 
      <Empty /> }

    </article>
  );
}

export default Appointment;