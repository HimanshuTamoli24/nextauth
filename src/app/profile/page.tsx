'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import User from 'nextAuth/models/user.model';
import { getErrorMessage } from 'nextAuth/utils/error';
import { useState } from 'react';
import toast from 'react-hot-toast';
interface User {
    _id: string;
    email: string;
}
function ProfilePage() {

    const router = useRouter();
    const handleLogout = async () => {
        try {
            const res = await axios('/api/user/logout')
            toast.success(res.data.message)
            router.push('/login'); // Redirect to lo
            // Optionally, you can redirect the user after logout

        } catch (error) {
            toast.error(getErrorMessage(error))
        }
        console.log("User logged out");
        // Redirect to login or home page if needed

    }
    const [me, setMe] = useState<User | null>(null);
    const getMe = async () => {
        try {
            const response = await axios.get('/api/user/me');
            console.log("User Details:", response.data);
            setMe(response.data);

        } catch (error) {
            console.error("Error fetching user details:", error);
            toast.error(getErrorMessage(error));

        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className=" shadow-lg rounded-lg p-8 max-w-md w-full">
                <div className="flex flex-col items-center">
                    {/* User Details */}
                    <h1 className="text-2xl font-bold text-gray-800">John Doe</h1>
                    <p className="text-gray-600">johndoe@example.com</p>
                </div>
                {/* Divider */}
                <hr className="my-6 border-gray-300" />
                {/* Logout Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleLogout}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"

                    >
                        Logout
                    </button>
                    <button
                        onClick={getMe}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded ml-4"
                    >
                        Get Me
                    </button>

                </div>
                <p>{
                    me ? `User ID: ${me._id}, Email: ${me.email}` : 'Click "Get Me" to fetch user details'

                }</p>
            </div>
        </div>
    );
}

export default ProfilePage;
