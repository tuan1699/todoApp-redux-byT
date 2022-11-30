import "./Filter.css";

import React from "react";
import { useState } from "react";
import { statusFilterChange } from "./Filter.slice";
import { useDispatch, useSelector } from "react-redux";

const Filter = () => {
  const [filterStatus, setFilterStatus] = useState("All");

  const dispatch = useDispatch();

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
    dispatch(statusFilterChange(e.target.value));
  };

  return (
    <div>
      <form
        className="filter-field"
        action=""
        onChange={(e) => handleStatusChange(e)}
      >
        <div className="checkbox-group">
          <input
            type="radio"
            name="status"
            checked={filterStatus === "All" ? true : false}
            id="all"
            value="All"
          />

          <label htmlFor="all">All</label>
        </div>

        <div className="checkbox-group">
          <input
            type="radio"
            name="status"
            checked={filterStatus === "Completed" ? true : false}
            id="completed"
            value="Completed"
          />
          <label htmlFor="completed">Completed</label>
        </div>

        <div className="checkbox-group">
          <input
            type="radio"
            name="status"
            checked={filterStatus === "Todo" ? true : false}
            id="todo"
            value="Todo"
          />
          <label htmlFor="todo">Todo</label>
        </div>
      </form>
    </div>
  );
};

export default Filter;
