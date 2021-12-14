import React, { useState, useEffect, useMemo } from "react";
import './ToDo.scss';
import Form from "../Form/Form";
import ToDoList from "../ToDoList/ToDolist";

function ToDo() {
  const [toDos, setToDos] = useState([]);
  const [stateName, setStateName] = useState('1');
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState([]);
  useEffect(() => {      
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(responseData => {
        setData(responseData)
      })
    .catch(err => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    setToDos(data.filter(item => item.userId == stateName))
  }, [data, stateName]);

  useEffect(() => {
    console.log(toDos);
  }, [toDos]);

  const addToDo = (toDo) => {
    //setToDos([...toDos, toDo]);
    fetch("https://jsonplaceholder.typicode.com/todos/", {
      method: "POST",
      body: JSON.stringify({
        id: toDo.id,
        title: toDo.title,
        completed: false
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => {
        if (response.status !== 201) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setToDos((toDo) => [...toDo, data]);
      })
      .catch((error) => console.log(error));
  };
  const handleRemove = (index) => {
    //setToDos(toDos.filter((task) => task.id !== index));
    fetch(`https://jsonplaceholder.typicode.com/todos/${index}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          setToDos(
            toDos.filter((toDo) => {
              return toDo.id !== index;
            })
          );
        }
      })
      .catch((error) => console.log(error));
  };
  const handleComplete = (index) => {
    setToDos(
      toDos.map((toDo) => {
        if (toDo.id === index) {
          return { ...toDo, completed: !toDo.completed };
        }
        return toDo;
      })
    );
  };

  const { completed, notCompleted } = useMemo(() => {
    return {
      completed: toDos.filter(
        (t) => t.completed
      ),
      notCompleted: toDos.filter(
        (t) => !t.completed
      )
    };
  }, [toDos]);
  function handleEditClick(toDo) {
    setIsEditing(true);
    setCurrentTodo({ ...toDo });
  }
  function handleUpdateTodo(id, updatedTodo) {
    // const updatedItem = toDos.map((toDo) => {
    //   return toDo.id === id ? updatedTodo : toDo;
    // });
    // setIsEditing(false);
    // setToDos(updatedItem);


    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: updatedTodo.id,
        title: updatedTodo.title,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        const updatedItem = toDos.map((toDo) => {
          return toDo.id === id ? updatedTodo : toDo;
        });

        setToDos((toDo) => updatedItem);
        setIsEditing(false);
      })
      .catch((error) => console.log(error));
  }
  function handleEditFormSubmit(e) {
    e.preventDefault();
    handleUpdateTodo(currentTodo.id, currentTodo);
  }
  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, title: e.target.value });
  }
  return (
    <div className="todo">
      <div className="todo__list todo-list">
        <div className="todo-list__item todo-list__item--form">
          <Form addToDo={addToDo} onEditFormSubmit={handleEditFormSubmit} onEditInputChange={handleEditInputChange} currentTodo={currentTodo} isEditing={isEditing} />
          <p className="todo-count">Total: {toDos.length}</p>
          <h2 className="todo-list__item-title">To do({notCompleted.length})</h2>
          <ToDoList toDos={notCompleted} onRemove={handleRemove} onComplete={handleComplete} onEdit={handleEditClick}/>
        </div>
        <div className="todo-list__item">
          <h2 className="todo-list__item-title">Completed({completed.length})</h2>
          <ToDoList toDos={completed} onRemove={handleRemove} onComplete={handleComplete} onEdit={handleEditClick}/>
        </div>
      </div>
      
    </div>
  )
}

export default ToDo;