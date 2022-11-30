import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loadingAdd: false,
  loadingDelete: false,
  loadingClear: false,
  loading: false,
  err: null,
};

export const fetchTodos = createAsyncThunk("todos.fetchTodos", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");

  const data = await res.json();

  return data;
});

export const addTodos = createAsyncThunk("todos.addTodos", async (todo) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(todo),
  });

  const data = await res.json();

  console.log(res, data);

  return data;
});

export const deleteTodos = createAsyncThunk("todos.deleteTodos", async (id) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/" + id, {
    method: "DELETE",
  });

  if (res.status === 200 || res.status === 201) return id;
});

export const toggleStatusChange = createAsyncThunk(
  "todos.statusChange",
  async (id) => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/todos/" + id,
      {
        method: "PUT",
      }
    );

    if (res.status === 200 || res.status === 201) return id;
  }
);

export const clearAllItem = createAsyncThunk("todos.clear", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
  });

  if (res.status === 200 || res.status === 201) return true;
});

const todoListSlice = createSlice({
  name: "todoList",
  initialState: initialState,
  reducers: {
    toggleTodoStatus: (state, action) => {
      const currentTodo = state.data.find((todo) => todo.id === action.payload);

      currentTodo.completed = !currentTodo.completed;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(fetchTodos.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          err: null,
        };
      })

      .addCase(addTodos.pending, (state, action) => {
        state.loadingAdd = true;
      })

      .addCase(addTodos.fulfilled, (state, action) => {
        return {
          ...state,
          data: [action.payload, ...state.data],
          loadingAdd: false,
          err: null,
        };
      })

      .addCase(deleteTodos.pending, (state, action) => {
        state.loadingDelete = true;
      })

      .addCase(deleteTodos.fulfilled, (state, action) => {
        return {
          ...state,
          data: [...state.data].filter((todo) => {
            return todo.id !== action.payload;
          }),
          loadingDelete: false,
          err: null,
        };
      })

      .addCase(toggleStatusChange.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(toggleStatusChange.fulfilled, (state, action) => {
        const currentTodo = state.data.find(
          (todo) => todo.id === action.payload
        );

        currentTodo.completed = !currentTodo.completed;
        state.loading = false;
      })

      .addCase(clearAllItem.pending, (state, action) => {
        state.loadingClear = true;
      })

      .addCase(clearAllItem.fulfilled, (state, action) => {
        return {
          ...state,
          data: [],
          loadingClear: false,
          err: null,
        };
      });
  },
});

export default todoListSlice;

export const { addTodo, toggleTodoStatus } = todoListSlice.actions;
