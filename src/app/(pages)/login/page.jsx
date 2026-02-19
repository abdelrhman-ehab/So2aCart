import React from 'react'
import LoginForm from './_components/LoginForm'

export default function Login() {
    return <>
        <div className='min-w-[300px] w-full max-w-[800px] mx-auto min-h-[60vh] flex flex-col gap-10 justify-center items-center'>
            <h1 className='text-4xl font-bold'>Welcome Back !</h1>
            <LoginForm />
        </div>
    </>
}
