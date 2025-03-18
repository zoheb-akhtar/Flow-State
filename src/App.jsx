import { useEffect, useState } from 'react'
import Home from './components/Home'
import AddTask from './components/AddTask'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

export default function App() {
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    const storedTasks = window.localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  
  useEffect(() => {
    if (tasks.length > 0) {
      window.localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home tasks={tasks} setTasks={setTasks} />} />
        <Route path="add-task" element={<AddTask setTasks={setTasks} />} />
      </Route>
    </Routes>
  );
}
 