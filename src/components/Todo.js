import React from "react";
import "./Todo.css";
import { useState, useRef, useEffect } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [editId, setEditID] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTodo = () => {
    if (todo.trim() !== '') {
      const isDuplicate = todos.some((item) => item.list.toLowerCase() === todo.toLowerCase());
  
      if (isDuplicate) {
        setErrorMessage('Duplicate todo. Please enter a unique value.');
      } else {
        if (editId) {
          const updatedTodos = todos.map((item) =>
            item.id === editId ? { ...item, list: todo } : item
          );
          setTodos(updatedTodos);
          setEditID(0);
          setTodo('');
          setErrorMessage('');
        } else {
          setTodos([{ list: todo, id: Date.now(), status: false }, ...todos]);
          setTodo('');
          setErrorMessage('');
        }
      }
    } else {
      setErrorMessage('Please enter a non-empty value');
    }
  };
  


  const inputRef = useRef("null");
  useEffect(() => {
    inputRef.current.focus();
  });

  const onDelete = (id) => {
    setTodos(todos.filter((to) => to.id !== id));
  };

  const onComplete = (id) => {
    let complete = todos.map((list) => {
      if (list.id === id) {
        return { ...list, status: !list.status };
      }
      return list;
    });
    setTodos(complete);
  };

  const onEdit = (id) => {
    const editTodo = todos.find((to) => to.id === id);
    console.log("edit id" + editTodo.list);
    if (!editTodo.status) {
      setTodo(editTodo.list);
      setEditID(editTodo.id);
      console.log(editTodo);
      setErrorMessage("");
    } else {
      setTodo("");
      setEditID(0);
      setErrorMessage("Cannot edit a completed todo");
    }
  };

  const onDeleteAll = () => {
    setTodos([]);
  };

  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          ref={inputRef}
          placeholder="Enter your Todo"
          className="form-control"
          onChange={(event) => setTodo(event.target.value)}
        />
        <button onClick={addTodo}>{editId ? "EDIT" : "ADD"}</button>
        {errorMessage && <p style={{ color: "white" }}>{errorMessage}</p>}

        <div className="list">
          <ul>
            {todos.map((to, index) => (
              <li key={index} className="list-items">
                <div
                  className="list-items-list"
                  id={to.status ? "list-item" : ""}>
                  {to.list}{" "}
                </div>
                <span>
                  <IoMdDoneAll
                    className="list-items-icons"
                    id="complete"
                    title="Complete"
                    onClick={() => onComplete(to.id)}
                  />
                  <FiEdit
                    className="list-items-icons"
                    id="edit"
                    title="Edit"
                    onClick={() => onEdit(to.id)}
                  />
                  <MdDelete
                    className="list-items-icons"
                    id="delete"
                    title="Delete"
                    onClick={() => onDelete(to.id)}
                  />
                </span>
              </li>
            ))}
            {todos.length > 0 && (
              <AiOutlineDelete
                className="list-item-icon1"
                id="allDelete"
                title="Delete all"
                onClick={onDeleteAll}
              />
            )}
          </ul>
        </div>
      </form>
    </div>
  );
}
export default Todo;
