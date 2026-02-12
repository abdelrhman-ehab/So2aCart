'use server'

export default async function RegisterAction(data) {
    const res = await fetch(`${process.env.API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
            rePassword: data.rePassword,
            phone: data.phone,
        })
    })
    return res.json()
}