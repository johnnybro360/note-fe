'use client';

import {Button} from "@/components/ui/button";
import React from "react";
import axios from "axios";
import {useRouter} from "next/navigation";

const Page = () => {
    const route = useRouter();
    const handleLogOut = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.defaultPrevented;
        try {
            const response = await axios.get("http://localhost:3000/auth/logout");

            if (response.status === 200) {
                route.push('/')
            }
        } catch (error) {
            console.error(error); // Log the error for debugging
        }
    }

    return (
        <div>
            <Button onClick={(event) =>
                handleLogOut(event)}>Log Out</Button>
            <h1>Hello World</h1>
        </div>
    );
};

export default Page;