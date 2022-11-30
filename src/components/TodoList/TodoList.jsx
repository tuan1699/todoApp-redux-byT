import "./TodoList.css";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingAdd from "../loading/LoadingAdd";
import {
  todosRemainingSelector,
  totalTodoSelector,
} from "../../redux/selector";
import { clearAllItem } from "./TodoList.slice";
import { v4 as uuidv4 } from "uuid";
import { addTodos } from "./TodoList.slice";
import Todo from "../Todo/Todo";
import Filter from "../Filter/Filter";
import { loadingAddSelector, loadingClearSelector } from "../../redux/selector";

const TodoList = () => {
  const dispatch = useDispatch();
  const todoList = useSelector(todosRemainingSelector);
  const total = useSelector(totalTodoSelector);
  const loading = useSelector(loadingAddSelector);
  const loadingClear = useSelector(loadingClearSelector);

  const [todoInput, setTodoInput] = useState("");

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setTodoInput(e.target.value);
  };

  const handleAddTodo = () => {
    if (todoInput.trim() !== "") {
      dispatch(
        addTodos({
          title: todoInput,
          completed: false,
        })
      );
    }

    setTodoInput("");
  };

  const handleClearAllITem = () => {
    dispatch(clearAllItem());
  };

  return (
    <div>
      <div className="input-field">
        <input
          type="text"
          value={todoInput}
          className="input-todo"
          onChange={(e) => handleInputChange(e)}
        />

        <button className="btn-add" onClick={() => handleAddTodo()}>
          {loading ? <LoadingAdd /> : "Add"}
        </button>
      </div>

      <Filter />
      <div className="todoList">
        {todoList.map((todo) => (
          <Todo
            key={uuidv4()}
            id={todo.id}
            name={todo.title}
            completed={todo.completed}
          />
        ))}
      </div>

      <div className="footer">
        <span>You have {total} pending task</span>
        <button className="btn-clear" onClick={() => handleClearAllITem()}>
          {loadingClear ? <LoadingAdd /> : "Clear All"}
        </button>
      </div>
    </div>
  );
};

export default TodoList;
