'use client';

import {Button} from "@/components/ui/button";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";

const Posts = () => {
    const route = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state

    console.log('isLoggedIn:', isLoggedIn);
    const handleLogOut = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.defaultPrevented;
        try {
            const response = await axios.get("http://localhost:3000/auth/logout");

            if (response.status === 200) {
                localStorage.removeItem('token');
                route.push('/')
            }
        } catch (error) {
            console.error(error); // Log the error for debugging
        }
    }

    const verifyToken = async (token: string) => {
        try {
            const response = await axios.post(
                'http://localhost:3000/auth/verify-token',
                { token } // Send the JWT token to the backend
            );
            if (response.status === 201) {
                // Verification successful
                setIsLoggedIn(true);
                console.log('isLoggedIn:', isLoggedIn);
                console.log('JWT verified:', response.data)
            } else {
                console.error('JWT verification failed:', response.data);
                // Handle invalid or expired JWT (e.g., clear token from storage)
                localStorage.removeItem('token');
                console.log('JWT removed from local storage')
                route.push('/');
            }
        } catch (error) {
            console.error('Error verifying JWT:', error);
            // Handle errors (e.g., network issues)
        }
    };

    useEffect(() => {
        // Check for existing JWT in local storage (if using)
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('isLoggedIn:', isLoggedIn);
            console.log('No token found')
            route.push('/');
        } else {
            // Verify JWT on backend (not shown here)
            // If verification successful, set isLoggedIn to true
            verifyToken(token);//
        }
    }, []);

    return (
        <div>
        {isLoggedIn ? (
            <div>
                 <Button onClick={handleLogOut}>Log Out</Button>
                 <h1>Hello World</h1>
             </div>
             ) : "You are not logged in"}
        </div>
    );
};

export default Posts;