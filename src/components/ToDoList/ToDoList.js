import React from "react";
import Task from "../Task/Task";
import './ToDoList.scss';

function ToDoList({toDos, onRemove, onComplete, onEdit}) {
        return (
            <div>
                {toDos.map((toDo) => (
                    <Task toDo={toDo} onRemove={onRemove} onComplete={onComplete} onEdit={onEdit}/>
                ))}
           </div>
        )
}

export default ToDoList;