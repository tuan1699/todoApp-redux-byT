import { createSelector } from "@reduxjs/toolkit";

export const todoListSelector = (state) => state.todoList.data;
export const loadingAddSelector = (state) => state.todoList.loadingAdd;
export const loadingDeleteSelector = (state) => state.todoList.loadingDelete;
export const loadingClearSelector = (state) => state.todoList.loadingClear;
export const filterStatusSelector = (state) => state.filters.status;

export const todosRemainingSelector = createSelector(
  todoListSelector,
  filterStatusSelector,
  (data, status) => {
    return data.filter((todo) => {
      if (status === "All") {
        return todo;
      } else {
        return status === "Completed" ? todo.completed : !todo.completed;
      }
    });
  }
);

export const totalTodoSelector = (state) => {
  const listTask = state.todoList.data.filter(
    (todo) => todo.completed === false
  );

  return listTask.length;
};
