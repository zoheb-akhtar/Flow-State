import React, { useState, useEffect } from 'react'
import dayjs from "dayjs"
import { Link, useNavigate } from 'react-router-dom'

export default function AddTask({setTasks}) {

  const [taskName, setTaskName] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const [taskUrgency, setTaskUrgency] = useState("Low")
  const [dateToDo, setDateToDo] = useState()
  const navigate = useNavigate()


  function handleSubmit(event) {
    event.preventDefault()
    if (taskName.length === 0) {
      alert("Please add a name for you task!")
      return
    }
    const task = {
      taskName: taskName,
      taskDescription: taskDescription,
      taskUrgency: taskUrgency,
      taskId: crypto.randomUUID(),
      isDone: false,
      dueDate: dateToDo ? dayjs(dateToDo).format("M/D/YYYY") : null,
      progressPoints: taskUrgency === "Low" ? 10 : ((taskUrgency === "Medium") ? 20 : 30),
      showMore: false
    }

    setTasks(prevTasks => [task, ...prevTasks])
    navigate("/")
  }

  console.log("Date input:", dateToDo);
console.log("Formatted date:", dayjs(dateToDo).format("M/D/YYYY"));

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
          <div className="form-container">
          <Link to="/">
            <p className="back"> ⬅️ Back to Tasks</p>
          </Link>
            <div className="form-group name">
              <label htmlFor='description'>Task name: </label>
              <input className="task-name-input" value={taskName} id="task-name" onChange={(event) => setTaskName(event.target.value)}/>
            </div>
          
            <div className="form-group description">
              <label htmlFor='description'>Task description: </label>
              <input className="task-description-input" value={taskDescription} id='description' onChange={(event) => setTaskDescription(event.target.value)}></input>
            </div>

            <div className="form-group date">
              <label htmlFor='date-input'>Due date: </label>
              <input className="date-input" id="date-input" type="date" value={dateToDo} onChange={(event) => setDateToDo(event.target.value)}/>
            </div>

            <div className="form-group urgency">
            <label htmlFor='urgency'>Urgency: </label>
              <select value={taskUrgency} id="urgency" onChange={(event) => setTaskUrgency(event.target.value)}>
                <option>Low</option>
                <option>Medium</option>
                <option>Urgent</option>
              </select>
            </div>
          <div className="buttons-container">
            <button className="save-task">Save Task</button>
            <Link to="/">
              <button className="cancel-task">Cancel</button>
            </Link>
          </div>
          </div>  
      </form>
    </div>
  )
}
