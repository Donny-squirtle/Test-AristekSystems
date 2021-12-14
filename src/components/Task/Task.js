import React from "react";
import './Task.scss';
import Edit from '../../img/edit.svg';
import Delete from '../../img/delete.svg';
function Task({toDo, onRemove, onComplete, onEdit}) {
    const handleDelete = () => {
        onRemove(toDo.id);
    };
    const handleChecked = () => {
        onComplete(toDo.id);
    };
    const handleEdit = () => {
        onEdit(toDo);
    }
    return (
        <div className="task" id={toDo.id} key={toDo.id}>
            <div onClick={handleChecked} className={"task__status" + (toDo.completed ? " task__status--completed" : "")}></div>
            <div className="task__text">{toDo.title}</div>
            <div className="task__buttons task-button">
                {!toDo.completed ? (
                    <>
                    <button className="task-button__edit button" onClick={handleEdit}><Edit/></button>
                    <button className="task-button__delete button" onClick={handleDelete}><Delete /></button>
                    </>
                ): (
                    <button className="task-button__delete button" onClick={handleDelete}><Delete/></button>
                )

                }
                
            </div>
        </div>
    )
}

export default Task;