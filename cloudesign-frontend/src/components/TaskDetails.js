import React, { useState, useEffect } from "react";

window.onclick = (event) => {
  let modal = document.getElementById("myModal");
  if (event.target === modal) {
    document.getElementById("myModal").style.display = "none";
  }
};

const TaskDetails = (props) => {
  const getId = props.match.params.id;
  const GetTaskUrl = `http://localhost:5001/api/get-task/${getId}`;
  const EditTaskUrl = `http://localhost:5001/api/edit-task`;
  const UpdateStatusUrl = "http://localhost:5001/api/update-status";
  const cencelHendler = () => {
    document.getElementById("myModal").style.display = "none";
  };
  const [getTaskById, setGetTaskById] = useState();

  const [updateStatus, setUpdateStatus] = useState({
    id: "",
    status: "",
  });

  const updateStatusHandler = async (id, e) => {
    setUpdateStatus({ id: id, status: e.target.value });
    fetch(UpdateStatusUrl, {
      method: "Post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id: id, status: e.target.value }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setGetTaskById(result.data);
        }
      });
  };
  const getTask = () => {
    fetch(GetTaskUrl, { method: "Get" })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setGetTaskById(result.data);
        }
      });
  };
  const taskEdotHandler = () => {
    document.getElementById("myModal").style.display = "none";
    fetch(EditTaskUrl, {
      method: "Post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(getTaskById),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
  };

  const deleteHandler = (id) => {
    console.log("fe ", id);
    fetch(`http://localhost:5001/api/delete-task/${id}`, {
      method: "Post",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        res.json();
      })
      .then((result) => {
        props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div className="taskDetailContainer">
      <div className="heading">
        <h5>{getTaskById && getTaskById.title}</h5>
      </div>
      <div className="taskDetails">
        <div>Discription : {getTaskById && getTaskById.discription}</div>
        <div>Status : {getTaskById && getTaskById.status}</div>
      </div>
      <div className="taskDetailBtn">
        <button
          onClick={() =>
            (document.getElementById("myModal").style.display = "block")
          }
          className="btn_1"
        >
          <i className="fa fa-edit"></i>
        </button>
        <button
          onClick={() => deleteHandler(getTaskById._id)}
          className="btn_2"
        >
          <i className="fa fa-trash-o"></i>
        </button>
        <div className="form-group">
          <label htmlFor="cars">
            Update status
            <select
              onChange={(e) => updateStatusHandler(getTaskById._id, e)}
              className="form-control"
              name="cars"
              id="cars"
            >
              <option value="">Select status</option>
              <option value="Open">Open</option>
              <option value="In-progress">In-Progress</option>
              <option value="Complete">Compelte</option>
            </select>
          </label>
        </div>
      </div>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <div className="close_menu">
            <span onClick={cencelHendler} className="close">
              &times;
            </span>
          </div>

          <div>
            <div className="form-group">
              <label htmlFor="Id">Title</label>
              <input
                className="form-control"
                type="text"
                value={getTaskById && getTaskById.title}
                onChange={(e) =>
                  setGetTaskById({
                    ...getTaskById,
                    title: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="discription">Discription:</label>
              <textarea
                className="form-control"
                rows="3"
                id="discription"
                value={getTaskById && getTaskById.discription}
                onChange={(e) =>
                  setGetTaskById({
                    ...getTaskById,
                    discription: e.target.value,
                  })
                }
              ></textarea>
            </div>
            <div className="addTaskBtn">
              <button onClick={taskEdotHandler}>Edit Task</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
