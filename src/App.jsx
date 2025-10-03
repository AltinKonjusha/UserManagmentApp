import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import UserList from './components/UserList'
import UserDetails from './components/UserDetails'


export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <Link to="/" className="brand">Users App</Link>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </main>
    </div>
  )
}