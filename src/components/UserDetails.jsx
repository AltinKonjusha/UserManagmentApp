import React, { useEffect, useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'


export default function UserDetails() {
    const { id } = useParams()
    const location = useLocation()
    const [user, setUser] = useState(location.state?.user || null)
    const [loading, setLoading] = useState(!user)
    const [error, setError] = useState(null)


    useEffect(() => {
        if (user) return
        let cancelled = false
        async function fetchUser() {
            setLoading(true)
            try {
                const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
                if (!res.ok) throw new Error('Network response not ok')
                const data = await res.json()
                if (!cancelled) setUser(data)
            } catch (err) {
                if (!cancelled) setError(err.message)
            } finally {
                if (!cancelled) setLoading(false)
            }
        }
        fetchUser()
        return () => { cancelled = true }
    }, [id, user])


    if (loading) return <p>Loading user...</p>
    if (error) return <p>Error: {error}</p>
    if (!user) return <p>User not found</p>


    const { address } = user
    return (
        <div className="user-details">
            <Link to="/">← Back</Link>
            <h2>{user.name}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Website:</strong> <a href={`http://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a></p>
            <p><strong>Company:</strong> {user.company?.name}</p>
            {address && (
                <div>
                    <h3>Address</h3>
                    <p>{address.suite}, {address.street}</p>
                    <p>{address.city} {address.zipcode}</p>
                </div>
            )}
        </div>
    )
}