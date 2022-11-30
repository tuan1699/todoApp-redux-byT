import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filter from "./components/Filter/Filter";
import TodoList from "./components/TodoList/TodoList";
import { fetchTodos } from "./components/TodoList/TodoList.slice";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, []);
  return (
    <div className="App">
      <div className="container">
        <h3 className="heading">TodoApp</h3>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
