import React, { useState, useEffect } from "react";
import TaskData from "./TaskData";

const TaskView = ({ taskData }) => {
  const [openTask, setOpenTask] = useState();
  const [compTask, setCompTask] = useState();
  const [progressTask, setProgressTask] = useState();

  const filterStataus = () => {
    if (taskData) {
      let OpenTask = taskData.filter((task) => {
        return task.status === "Open";
      });
      let ProgressTask = taskData.filter((task) => {
        return task.status === "In-progress";
      });
      let CompTask = taskData.filter((task) => {
        return task.status === "Complete";
      });
      setOpenTask(OpenTask);
      setProgressTask(ProgressTask);
      setCompTask(CompTask);
    }
  };
  useEffect(() => {
    filterStataus();
  }, [taskData]);

  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <div className="taskClass">
            <div className="Task-heading">
              <h5>Open Task</h5>
            </div>
            {openTask &&
              openTask.map((task) => {
                return <TaskData key={task._id} task={task} />;
              })}
          </div>
        </div>
        <div className="col-md-4">
          <div className="taskClass">
            <div className="Task-heading">
              <h5>In-Progress Task</h5>
            </div>
            {progressTask &&
              progressTask.map((task) => {
                return <TaskData key={task._id} task={task} />;
              })}
          </div>
        </div>
        <div className="col-md-4">
          <div className="taskClass">
            <div className="Task-heading">
              <h5>Complete Task</h5>
            </div>
            {compTask &&
              compTask.map((task) => {
                return <TaskData key={task._id} task={task} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskView;
