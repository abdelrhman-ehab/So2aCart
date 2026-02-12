import React from 'react'
import RegisterForm from './_components/RegisterForm'



export default function Register() {
    return <>
        <div className='min-w-[350px] w-full max-w-[800px] mx-auto min-h-[60vh] flex flex-col gap-10 justify-center items-center'>
            <h1 className='text-4xl font-bold'>Start Your Trip Now!</h1>
            <RegisterForm />
        </div>
    </>
}
