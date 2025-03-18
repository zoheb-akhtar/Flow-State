import React, { useState, useEffect } from 'react'
import TaskList from './TaskList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"
import dayjs from "dayjs"

export default function Home({tasks, setTasks}) {
  const [allTasksDone, setAllTasksDone] = useState(false)
  const [totalProgressPoints, setTotalProgressPoints] = useState(0)
  const [doneProgressPoints, setDoneProgressPoints] = useState(0)
  const [lastTask, setLastTask] = useState({}) 
  const [showIncrease, setShowIncrease] = useState(false)

  const today = dayjs();
  const formattedDate = today.format("MMMM D, YYYY")


  useEffect(() => {
    setShowIncrease(true)
    const timer = setTimeout(() => {
      setShowIncrease(false)
    }, 1700)

    return () => {
      clearTimeout(timer)
    }
  }, [lastTask])

  useEffect(() => {
    if (tasks.length > 0 && tasks.every(task => task.isDone === true)){
      setAllTasksDone(true)
    }
  }, [tasks])

  useEffect(() => {
    if (tasks.length > 0) {
      const totalPoints = tasks.reduce((acc, task) => acc + task.progressPoints, 0)
      setTotalProgressPoints(totalPoints)
    }
  }, [tasks])

  useEffect(() => {
    const doneTasks = tasks.filter((task) => {
      return task.isDone === true
    })
    const donePoints = doneTasks.reduce((acc, task) => acc + task.progressPoints, 0)
    setDoneProgressPoints(donePoints)
  }, [tasks])


const lowUrgencyTasks = tasks.filter((task) => {
  return task.taskUrgency === "Low"
})

const mediumUrgencyTasks = tasks.filter((task) => {
  return task.taskUrgency === "Medium"
})

const urgentTasks = tasks.filter((task) => {
  return task.taskUrgency === "Urgent"
})

const progressStyles = {
  color: lastTask.isDone ? "red" : "green"
}

function clearTasks() {
  setTasks([])
}

const {width, height} = useWindowSize()
  return (
    <>
    {allTasksDone && <Confetti recycle={false} width={width} height={height}/>}
    <div className="top-section">
      <div className="progress-container">
      <p> Progress: </p>
      <progress className="progress-bar" value={`${doneProgressPoints}`} max={`${totalProgressPoints}`}></progress>
      {showIncrease ? <p style={progressStyles} className="added-progress">{lastTask && !isNaN(lastTask.progressPoints) ? `${lastTask.isDone ? "-" : "+"}${Math.floor(lastTask.progressPoints/totalProgressPoints * 100)}%` : null}</p> : null}
      </div>
    
      <div className="board-header">
        {`Tasks - ${formattedDate}`}
      </div>
      {tasks.length > 0 ? <button className="clear-button" onClick={clearTasks}>Clear All Tasks</button> : null}
    </div>
    <div className="tasks-container">
      <TaskList header="Urgent" tasks={urgentTasks} setTasks={setTasks} headerColor="#b30000" setLastTask={setLastTask} />
      <TaskList header="Medium Urgency" tasks={mediumUrgencyTasks} setTasks={setTasks} headerColor="#FF8800" setLastTask={setLastTask} />
      <TaskList header="Low Urgency" tasks={lowUrgencyTasks} setTasks={setTasks} headerColor="#006100" setLastTask={setLastTask} />
    </div>
    </>
  )
}
