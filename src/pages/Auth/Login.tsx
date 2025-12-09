import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "../../components/ui/checkbox";
import { Button } from "../../components/ui/button";
import { useAuth, useSignIn } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema, loginFormSchema } from "@/schema/Login.schema";
import { showError } from "@/utils/Toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { CurrentUser } from "@/types/User";
import { axiosClient } from "@/api/AxiosClient";
import { useQueryClient } from "@tanstack/react-query";
import { Storage } from "@/services/Storage";
import { Info } from 'lucide-react';

export const Login = () => {
    const { getToken } = useAuth();
    const queryClient = useQueryClient();
    const [showPassword, setShowPassword] = useState(false);
    const { signIn, isLoaded, setActive } = useSignIn();
    const [params] = useSearchParams();
    const redirect = params.get("redirect") || "/";
    const navigate = useNavigate();

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormSchema>({
        resolver: zodResolver(loginFormSchema),
    });

    const onSubmit = handleSubmit(async (data) => {
        if(!isLoaded) return;

        try {
            const { email, password } = data;
            const result = await signIn.create({
                identifier: email,
                password: password,
            });
            
            if(result.status === "complete") {
                await setActive({
                    session: result.createdSessionId
                })

                const newToken = await getToken({ template: "server" });
                const { data } = await axiosClient.get<{ data: CurrentUser }>("/users/me", {
                    headers: { Authorization: `Bearer ${newToken}` },
                });

                const user = data.data
                queryClient.setQueryData(["currentUser"], user);
                Storage.setUser(user);

                if (user.role === "ADMIN") {
                    navigate("/dashboard", { replace: true });
                    return;
                };

                navigate(redirect, { replace: true });
            } 
        } catch (error: any) {
            console.error('error', error.errors[0].longMessage);
            showError(error.errors[0].longMessage);
        }
    }) 

    const errorStyle = (message: string) => {
        return (
            <div className="flex flex-wrap items-center gap-1 text-red-500">
                <Info size={16} />
                <span className="text-red-500 text-xs">
                    {message}
                </span>
            </div>
        )
    }

    // useEffect(() => {
    //     if(isSignedIn) {
    //         window.location.replace("/");
    //     }
    // }, [isSignedIn])

    return (
        <main className="flex flex-col justify-center items-center h-screen">
            <form onSubmit={onSubmit} className="flex justify-center items-center w-full px-3">
                <Card 
                className={`w-full md:w-[350px] gap-4 shadow-lg ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}
                >
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold mb-0.5 text-center">
                            Sign In
                        </CardTitle>
                        <CardDescription className="text-center">
                            Akses akun Anda untuk melanjutkan
                        </CardDescription>
                        <div className="flex items-center ">
                            <hr className="flex-1 border-t border-gray-300 my-3.5"/>
                            <span className="mx-3 text-gray-400 text-xs select-none">
                            Masuk dengan Email
                            </span>
                            <hr className="flex-1 border-t border-gray-300"/>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                className="h-10" 
                                id="email" 
                                placeholder="Masukkan email"
                                type="email"
                                {...register("email")}
                                />
                                {errors.email && errorStyle(errors.email.message!)}
                            </div>
                            <div className="flex flex-col space-y-1.5 relative">
                                <Label htmlFor="password">Kata Sandi</Label>
                                <Input 
                                className="h-10" 
                                id="password" 
                                placeholder="Masukkan kata sandi" 
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                                />
                                <div className="absolute left-[90%] bottom-[1.2rem] cursor-pointer bg-amber-50">
                                    <span 
                                    onClick={handleShowPassword}>
                                        {showPassword  ? (
                                            <Eye className="w-4 h-4 text-gray-500" />
                                        ) : (
                                            <EyeOff className="w-4 h-4 text-gray-500" />
                                        )}
                                    </span> 
                                </div>
                            </div>
                        </div>
                        <div className="px-1">
                            {errors.password && errorStyle(errors.password.message!)}
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" />
                                <label
                                    htmlFor="terms"
                                    className="text-xs font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Ingat saya
                                </label>
                            </div>
                            <a className="text-indigo-600 text-xs font-normal hover:underline" href="/auth/forgot-password">
                                Lupa kata sandi?
                            </a>
                        </div>
                    </CardContent>
                    <CardFooter className="flex items-start flex-col w-full">
                        <Button 
                        variant="primary" 
                        type="submit" 
                        size="lg"
                        disabled={isSubmitting} 
                        className="w-full"
                        >
                            {isSubmitting ? <ClipLoader size={24} color="white" /> : "Login"}
                        </Button>
                        <p className="mt-4 flex gap-2 text-xs text-black font-normal">
                            Belum punya akun?
                            <a className="text-indigo-600 hover:underline" href="/auth/sign-up">
                                Daftar sekarang
                            </a>
                        </p>
                    </CardFooter>
                </Card>
            </form>
        </main>
    )
}