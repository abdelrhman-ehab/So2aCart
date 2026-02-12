"use client"
import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import {
    Field,
    FieldError,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import RegisterAction from "../RegisterAction/registerAction"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

// register schema
const formSchema = z.object({
    name: z
        .string()
        .min(3, "name must be at least 5 characters.")
        .max(32, "name must be at most 32 characters."),
    email: z
        .email('invalid email')
        .nonempty('email is required'),
    password: z
        .string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'invalid password'),
    rePassword: z.
        string(),
    phone: z
        .string()
        .regex(/^01[0-9]{9}$/, "Invalid phone number")
}).refine((data) => data.password === data.rePassword, {
    message: 're-password not match password ',
    path: ['rePassword']  // message appear under rePassword
})

export default function RegisterForm() {
    const router = useRouter()
    const [registerError, setregisterError] = useState(null)
    const [registerLoading, setregisterLoading] = useState(false)

    // registeration resolver
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
        },
    })

    // registeration function
    async function onSubmit(data) {
        setregisterLoading(true)
        const response = await RegisterAction(data)
        setregisterLoading(false)
        console.log(response);

        if (response.statusMsg === 'fail') {
            setregisterError(response.message)
        }
        else {
            toast.success('registeration success, please login', { position: "top-center" })
            setregisterError(null)
            router.push('/login')
        }
    }

    return (
        <Card className="w-full">
            {registerError &&
                <CardHeader>
                    <h2 className="text-xl font-semibold text-red-800">{registerError}</h2>
                </CardHeader>
            }

            {/* registeration filds */}
            <CardContent>
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <Field>
                        {/* name */}
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="name">
                                        Name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="name"
                                        placeholder="Enter Your Name."
                                        autoComplete="on"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* email */}
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="email">
                                        Email
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="email"
                                        type="email"
                                        placeholder="Enter Your Email"
                                        autoComplete="on"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* password */}
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="password"
                                        type="password"
                                        placeholder="Enter Your Password."
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* rePassword */}
                        <Controller
                            name="rePassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="rePassword">
                                        rePassword
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="rePassword"
                                        placeholder="Enter Your rePassword."
                                        type="password"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* phone */}
                        <Controller
                            name="phone"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="phone">
                                        Phone
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="phone"
                                        placeholder="Enter Your Phone."
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                    </Field>
                </form>
            </CardContent>

            {/* registeration actions */}
            <CardFooter>
                <Field orientation="horizontal">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => form.reset()}
                    >
                        Reset
                    </Button>

                    <Button type="submit" form="form-rhf-demo" disabled={registerLoading}>
                        {registerLoading ? <Loader2 className="animate-spin" /> : 'Submit'}
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}
