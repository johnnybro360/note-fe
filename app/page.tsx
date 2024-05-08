'use client'

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {ChangeEvent, MouseEvent, useState} from "react";
import Link from "next/link";
import axios from "axios";
import {useRouter} from "next/navigation";

export default function Home() {
    const route = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleLogin = async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>)  => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/auth/signin", {email, password});

            if (response.status === 201) {
                console.log(document.cookie.split(';'))
                route.push('/posts')
            }
        } catch (error) {
            console.error(error); // Log the error for debugging
        }
    }

    return (
        <>
            <div className={"flex flex-col justify-center items-center"}>
                <div>
                    <Input onChange={(event) => handleEmailChange(event)} placeholder="Enter your email"/>
                </div>
                <div>
                    <Input onChange={(event) => handlePasswordChange(event)} type={"password"}
                           placeholder="Enter your password"/>
                </div>
                <div className={"flex justify-between"}>
                    <div>
                        <Button onClick={(event) =>handleLogin(event)}>Log In</Button>
                    </div>
                    <Link href={"/signup"}>Sign Up</Link>
                </div>
            </div>
        </>
    )
}
