import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddUserForm from './AddUserForm'
import SearchBar from './SearchBar'


export default function UserList() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')


    useEffect(() => {
        let cancelled = false
        async function fetchUsers() {
            setLoading(true)
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/users')
                if (!res.ok) throw new Error('Network response was not ok')
                const data = await res.json()
                if (!cancelled) setUsers(data)
            } catch (err) {
                if (!cancelled) setError(err.message)
            } finally {
                if (!cancelled) setLoading(false)
            }
        }
        fetchUsers()
        return () => { cancelled = true }
    }, [])


    const filtered = users.filter(u => {
        const q = search.toLowerCase()
        return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    })


    const handleAddUser = (newUser) => {
        setUsers(prev => [newUser, ...prev])
    }


    if (loading) return <p>Loading users...</p>
    if (error) return <p>Error: {error}</p>


    return (
        <div className="container">
            <AddUserForm onAdd={handleAddUser} />
            <SearchBar value={search} onChange={setSearch} />


            <ul className="user-list">
                {filtered.map(user => (
                    <li key={user.id} className="user-item">
                        <Link to={`/users/${user.id}`} state={{ user }}>
                            <div><strong>{user.name}</strong></div>
                            <div>{user.email}</div>
                            <div className="company">{user.company?.name}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}