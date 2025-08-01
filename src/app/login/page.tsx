"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { getErrorMessage } from '../../utils/error';
import toast from "react-hot-toast";

function Login() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/user/login", user)
      toast.success(res.data.message)
      router.push("/")

    } catch (error) {
      toast.error(getErrorMessage(error))
    }

  };

  return (
    <div className='min-h-screen border flex flex-col justify-center items-center'>
      <div className='py-3.5 min-h-60 border-blue-50 border-b-4 border-r-4 border-l border-t p-3.5 rounded-md gap-y-4.5 flex flex-col justify-center items-center'>
        <form onSubmit={handleLogin}
          className='py-3.5 min-h-60 p-3.5 gap-y-4.5 flex flex-col justify-center items-center'>
          <h1 className='text-2xl font-serif'>Login</h1>

          <div className='border-b-2 w-full px-3.5 py-1.5 rounded-xl'>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className='focus:outline-none'
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

          <div className='border-b-2 w-full px-3.5 py-1.5 rounded-xl'>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className='focus:outline-none'
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <button
            className="border-b-4 hover:animate-pulse cursor-pointer border-r-4 border-l border-t p-1.5 rounded-sm"
            type="submit"
          >
            login
          </button>
        </form>

        <Link className="text-sm hover:text-blue-500/70" href="/signup">
          ------ Signup ------
        </Link>
      </div>
    </div>
  );
}

export default Login;
