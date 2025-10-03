import React from 'react'


export default function SearchBar({ value, onChange }) {
    return (
        <div className="search-bar">
            <input
                placeholder="Search by name or email..."
                value={value}
                onChange={e => onChange(e.target.value)}
            />
            {value && <button onClick={() => onChange('')}>Clear</button>}
        </div>
    )
}