import React from "react";
import { Link } from "react-router-dom";

const TaskData = ({ task }) => {
  return (
    <Link key={task._id} to={`/${task._id}`}>
      <div className="task">
        <p>{task.title}</p>
      </div>
    </Link>
  );
};

export default TaskData;
