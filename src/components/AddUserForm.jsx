import React, { useState } from 'react';

const AddUserForm = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');
    const [company, setCompany] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};
        if (!name) newErrors.name = "Name is required";
        if (!email) newErrors.email = "Email is required";
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const newUser = {
                id: Date.now(),
                name,
                email,
                phone,
                website,
                company: { name: company || "Local Company" }
            };

            onAdd(newUser);

            setName('');
            setEmail('');
            setPhone('');
            setWebsite('');
            setCompany('');
        }
    };

    return (
        <form className="add-user" onSubmit={handleSubmit}>
            <h2>Add user</h2>
            <div>
                <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                {errors.name && <small className="error">{errors.name}</small>}
            </div>
            <div>
                <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                {errors.email && <small className="error">{errors.email}</small>}
            </div>
            <div>
                <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div>
                <input placeholder="Website" value={website} onChange={e => setWebsite(e.target.value)} />
            </div>
            <div>
                <input placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} />
            </div>
            <button type="submit">Add</button>
        </form>
    );
};

export default AddUserForm;
