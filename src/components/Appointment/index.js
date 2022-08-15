import React from "react";
import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode.js";
import Form from "./Form";
import Status from "./Status";

const Appointment = (props) => {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {

    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props 
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  }

  const removeInterview = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(DELETING);
    props
    .cancelInterview(props.id, interview)
    .then(() => transition(EMPTY));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (
        <Empty onAdd={() => transition(CREATE)} />
      )} 
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={removeInterview}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status message="SAVING" />
      )}
      {mode === DELETING && (
        <Status message="DELETING" />
      )}
    </article>
  );
}

export default Appointment;