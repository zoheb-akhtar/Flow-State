import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faTrash } from '@fortawesome/free-solid-svg-icons'

export default function TaskList({tasks, header, setTasks, headerColor, setLastTask}) {

    function removeTasks(idToRemove) {
        setTasks(prevTasks => prevTasks.filter((task) => {
            return task.taskId !== idToRemove
        }))
    }

    function markAsDone(idMatch) {
        const taskToMark = tasks.find(task => task.taskId === idMatch)
        if (taskToMark) {
        setLastTask(taskToMark)
    }
        setTasks(prevTasks => 
            prevTasks.map((task) => 
                task.taskId === idMatch ? {...task, isDone: !task.isDone} : task
            )
        )
    }
    
  return (
    <>
    <div className="task-column-container">
        <p className="column-header-title" style={{color: headerColor}}>{header}</p>
        {tasks.map((task) => {
            return <div key={task.taskId} style={{ backgroundColor: task.isDone ? "#ECECEC" : "#ffffff" }} className="task-box">
                <div className="text-box">
                <p className="task-name">{task.taskName}</p>
                <p className="task-description">{task.taskDescription}</p> 
                {task.dueDate ? <p className="task-due-date">Due date: {task.dueDate}</p> : null}
                </div>   
                <div className="bottom">
                    <button onClick={() => markAsDone(task.taskId)}className="mark-as-done">
                        <FontAwesomeIcon icon={faCheckCircle} color={task.isDone ? "#682bd7" : "#656565"}/>
                    </button>
                    <button className="delete" onClick={() => removeTasks(task.taskId)}>
                        <FontAwesomeIcon icon={faTrash} color="#656565"/>
                    </button>
                </div>
            </div>
        })}
    </div>
    </>
  )
    }
    
