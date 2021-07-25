import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import TaskView from "../../components/TaskView";

const Home = () => {
  const [getTask, setGetTask] = useState();
  const [message, setMessage] = useState();

  const getTaskUrl = "http://localhost:5001/api/get-task";
  const addTaskUrl = "http://localhost:5001/api/create-task";
  const [addTask, setAddTask] = useState({
    title: "",
    discription: "",
    status: "",
  });
  const [media, setMedia] = useState();

  const taskAddHandler = () => {
    fetch(addTaskUrl, {
      method: "Post",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(addTask),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data);
          //     setMessage(data.message);
        } else {
          console.log(data);
        }
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    let componentMounted = true;
    fetch(getTaskUrl, { method: "Get" })
      .then((res) => res.json())
      .then((result) => {
        if (componentMounted) {
          if (result.data) {
            setGetTask(result.data);
          }
        }
      })
      .catch((err) => console.log(err));
    return () => {
      componentMounted = false;
    };
  }, [message]);

  return (
    <div>
      <div className="container">
        <div className="addTaskContainer">
          <div className="heading">
            <h3>Task Manager</h3>
          </div>
          <div className="addTaskbox">
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="title">Titel</label>
                  <input
                    className="form-control"
                    type="text"
                    id="title"
                    placeholder="Title here..."
                    onChange={(e) =>
                      setAddTask({ ...addTask, title: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="cars">Select status</label>
                  <select
                    onChange={(e) =>
                      setAddTask({ ...addTask, status: e.target.value })
                    }
                    className="form-control"
                    name="cars"
                    id="cars"
                  >
                    <option value="">Select status</option>
                    <option value="Open">Open</option>
                    <option value="In-progress">In-Progress</option>
                    <option value="Complete">Compelte</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="media">Media</label>
                  <input
                    className=""
                    type="file"
                    id="media"
                    placeholder="Title here..."
                    onChange={(e) => setMedia(e.target.files[0])}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="form-group">
                <label htmlFor="discription">Discription:</label>
                <textarea
                  className="form-control"
                  rows="3"
                  col="3"
                  id="discription"
                  onChange={(e) =>
                    setAddTask({ ...addTask, discription: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="addTaskBtn">
                <button onClick={taskAddHandler}>Add Task</button>
              </div>
            </div>
          </div>
        </div>
        <div className="Task-view">
          <TaskView taskData={getTask} />
        </div>
      </div>
    </div>
  );
};

export default Home;
