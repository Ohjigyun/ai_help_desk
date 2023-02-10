import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { auth } from './api/firebase'
import { signInWithEmailAndPassword } from "firebase/auth";
import styles from '../styles/Signin.module.css'

export default function Signin() {
    const router = useRouter()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                router.push('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            })
    }

    useEffect(() => {
        const user = auth.currentUser

        if(user) {
            router.push('/signout')
            return;
        }
    })

    return (
        <div>
            <form onSubmit={submitHandler}>
                <input
                    type='text'
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button>제출</button>
            </form>
        </div>
    )
}