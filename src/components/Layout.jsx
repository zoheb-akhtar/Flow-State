import React from 'react'
import { Outlet, NavLink, Link } from 'react-router-dom'

export default function Layout() {
  return (
    <>
    <div className="header">
        <Link className="logo" to="/">
            <h1 className="header-title"><span className="flow-header">Flow</span> State</h1>
        </Link>
            <nav>
                <NavLink exact="true" activeclassname="active" to="/add-task">
                    <button className="add-task-button">+ Add Task</button>
                </NavLink>
            </nav>
    </div>

    <Outlet />
    </>
  )
}
