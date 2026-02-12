"use client"
import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Loader2 } from "lucide-react"

// login form schema
const formSchema = z.object({
    email: z
        .email('invalid email')
        .nonempty('email is required'),
    password: z
        .string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'invalid password')
})

export default function LoginForm() {
    const router = useRouter()
    const [loginError, setLoginError] = useState(null)
    const [loginLoading, setLoginLoading] = useState(false)

    // form resolver
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // submit function using nextAuth
    async function onSubmit(data) {
        setLoginLoading(true)
        const response = await signIn("credentials", {
            callbackUrl: '/products',
            email: data.email,
            password: data.password,
            redirect: false,
        })
        console.log(response);
        setLoginLoading(false)
        // login success
        if (response?.ok) {
            setLoginError(null)
            router.push("/")
        }
        // login faild
        else {
            setLoginError(response.error)
            toast.error("Invalid email or password", { position: 'top-center' })
        }
    }

    return (
        <Card className="w-full">
            {loginError &&
                <CardHeader className={'text-center'}>
                    <h2 className="text-xl font-semibold text-red-800">{loginError}</h2>
                </CardHeader>
            }

            {/* form fields */}
            <CardContent>
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>

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
                                        type='email'
                                        id="email"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter Your Email"
                                        autoComplete="off"
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="paswword">
                                        Password
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        type='password'
                                        id="password"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter Your Password"
                                        autoComplete="off"
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                    </FieldGroup>
                </form>
            </CardContent>

            {/* form actions */}
            <CardFooter>
                <Field orientation="horizontal">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => form.reset()}
                    >
                        Reset
                    </Button>

                    <Button disabled={loginLoading} type="submit" form="form-rhf-demo">
                        {loginLoading ? <Loader2 className="animate-spin" /> : 'Submit'}
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}
