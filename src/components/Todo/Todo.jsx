import "./Todo.css";

import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodos, toggleTodoStatus } from "../TodoList/TodoList.slice";
import { toggleStatusChange } from "../TodoList/TodoList.slice";
import { loadingDeleteSelector } from "../../redux/selector";
import LoadingDelete from "../loading/LoadingDelete";

const Todo = ({ id, name, completed }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(completed);

  const loadingDelete = useSelector(loadingDeleteSelector);

  const toggleCheckBox = (id) => {
    setChecked(!checked);
    dispatch(toggleStatusChange(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodos(id));
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        name=""
        id=""
        checked={checked}
        onChange={() => toggleCheckBox(id)}
      />
      <span
        className="title"
        style={checked ? { textDecoration: "line-through" } : {}}
      >
        {name}
      </span>
      <button
        className="btn-delete"
        onClick={() => {
          handleDeleteTodo(id);
        }}
      >
        {loadingDelete ? <LoadingDelete /> : "Xóa"}
      </button>
    </div>
  );
};

export default Todo;
