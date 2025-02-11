"use client"

import React, { useState } from 'react';


export interface phoneInputInterface {
    
    onSetPhone: (phone: string) => void
    
  }


const PhoneInput: React.FC<phoneInputInterface> = ({onSetPhone}) => {
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const validatePhone = (phone: string) => {
        const regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        return regex.test(phone);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPhone(value);
        if (!validatePhone(value)) {
            setError('Invalid phone number format');
        } else {
            setError('');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validatePhone(phone)) {
            onSetPhone(phone)
        } else {
            alert('Phone number is invalid');
        }
    };

    return (
        <form className='flex flex-col items-center' onSubmit={handleSubmit}>
            <div>
                <label className='mr-2' htmlFor="phone">Phone Number:</label>
                <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={handleChange}
                    placeholder="+7 (XXX) XXX-XX-XX"
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button className='m-2' type="submit">Submit</button>
        </form>
    );
};

export default PhoneInput;