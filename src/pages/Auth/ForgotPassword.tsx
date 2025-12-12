import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth, useSignIn } from "@clerk/clerk-react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { showError } from "@/utils/Toast";
import { emailSchemaObj, EmailSchemaObj } from "@/schema/Email.schema";

export const ForgetPassword = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<EmailSchemaObj>({
        resolver: zodResolver(emailSchemaObj),
    });
    const { isLoaded, signIn } = useSignIn();
    const { isSignedIn } = useAuth()
    const navigate = useNavigate();
    const emailValue = watch('email') || ""

    useEffect(() => {
        if (isSignedIn) {
            navigate('/')
        }
    }, [isSignedIn, navigate]);

    if (!isLoaded) {
        return null
    }

    const submitCreate = handleSubmit(async (data) => {
        try {
            const { email } = data;
            await signIn.create({
                strategy: 'reset_password_email_code',
                identifier: email
            })

            sessionStorage.setItem("email", email)
            navigate('/auth/reset-password')
        } catch (error: any) {
            console.error('error', error.errors[0].longMessage);
            showError(error.errors[0].longMessage)
        }
    })

    return (
        <main className="flex flex-col justify-center items-center h-screen">
            <form onSubmit={submitCreate} className="flex justify-center items-center w-full px-3">
                    <Card className={`w-full md:w-[450px] gap-4 shadow-lg ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}>
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl md:text-3xl font-bold mb-0.5">
                                Lupa kata sandi?
                            </CardTitle>
                            <CardDescription className="text-sm md:text-md">
                                Masukkan alamat email terdaftar Anda dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi Anda.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Input
                            className="h-10" 
                            id="email" 
                            placeholder="Masukkan email"
                            type="email"
                            {...register("email")}
                            />
                            {errors.email && <span className="text-red-500 text-xs text-left">{errors.email.message}</span>}
                        </CardContent>
                        <CardFooter className="flex items-start flex-col w-full">
                            <Button 
                            variant="primary" 
                            type="submit"
                            size="lg"
                            disabled={isSubmitting || !emailValue} 
                            className="w-full">
                                {isSubmitting ? <ClipLoader size={24} color="white" /> : 'Kirim Email'}
                            </Button>
                        </CardFooter>
                    </Card>
            </form>
        </main>
    )
}
