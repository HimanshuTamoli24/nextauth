"use client";
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function Signup() {

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    })
    const submibt = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(user);


    }

    return (
        <div className=' min-h-screen border flex flex-col justify-center items-center'>
            <div className=' py-3.5 min-h-60 border-blue-50  border-b-4 border-r-4 border-l border-t  p-3.5   rounded-md gap-y-4.5 flex flex-col justify-center items-center'>
                <form onSubmit={submibt}
                    className=' py-3.5 min-h-60   p-3.5  gap-y-4.5 flex flex-col justify-center items-center'>
                    <h1 className='text-2xl font-serif '>Signup </h1>

                    <div className='border-b-2 w-full px-3.5  py-1.5 rounded-xl'>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" required className='focus:outline-none' value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                    </div>
                    <div className='border-b-2 w-full px-3.5  py-1.5 rounded-xl'>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required className='focus:outline-none' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    </div>
                    <div className='border-b-2 w-full  px-3.5  py-1.5 rounded-xl shadow-2xs shadow-white'>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required className='focus:outline-none' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                    </div>
                    <button className="border-b-4 hover:animate-pulse cursor-pointer border-r-4 border-l border-t   p-1.5 rounded-sm " type="submit">signup</button>
                </form>
                <Link  className="text-sm hover:text-blue-500/70" href="/login"> ------ Login ------</Link>
            </div>
        </div>
    )
}

export default Signup