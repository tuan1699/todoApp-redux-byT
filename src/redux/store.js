import { configureStore } from "@reduxjs/toolkit";
import todoListSlice from "../components/TodoList/TodoList.slice";
import filterSlice from "../components/Filter/Filter.slice";

const store = configureStore({
  reducer: {
    todoList: todoListSlice.reducer,
    filters: filterSlice.reducer,
  },
});

export default store;
