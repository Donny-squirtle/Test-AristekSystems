import React, { useState } from "react";
import './Form.scss';

function getGUID() {
    return (
      Date.now().toString(32) +
      "-" +
      Math.round(Math.random() * 1000).toString(32)
    );
  }
function Form({ addToDo, onEditFormSubmit, currentTodo, onEditInputChange, isEditing }) {
    const [toDo, setToDo] = useState({
        id: "",
        title: ""
      });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (toDo.title.trim()) {
          addToDo({ ...toDo, id: getGUID() });
          setToDo({ ...toDo, title: "" });
        }
  };
  const handleChange = (e) => {
    setToDo({ ...toDo, title: e.target.value });
  };
  return (
  <>
    {isEditing ? (
      <form className="task-form" onSubmit={onEditFormSubmit}>
        <input className="task-form__input" type="text" placeholder="+ Edit task, press Enter to save" value={currentTodo.title} onChange={onEditInputChange}/>
        <button className="task-form__button" type="submit">Save</button>
      </form>
        ) : (
      <form className="task-form" onSubmit={handleSubmit}>
        <input className="task-form__input" type="text" placeholder="+ Add a task, press Enter to save" value={toDo.title} onChange={handleChange}/>
        <button className="task-form__button" type="submit">Add</button>
      </form>
    )}
  </>
    )
}

export default Form;