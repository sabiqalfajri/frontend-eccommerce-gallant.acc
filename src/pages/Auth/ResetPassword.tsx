import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CiCircleInfo } from "react-icons/ci";
import { Label } from "@/components/ui/label";
import { useSignIn } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { showError, showInfo } from "@/utils/Toast";
import { ClipLoader } from "react-spinners";
import { LuPencilLine } from "react-icons/lu";
import { resetPasswordSchema, ResetPasswordSchema } from "@/schema/ResetPassword.schema";

export const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { signIn } = useSignIn();
    const navigate = useNavigate();
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const { register, handleSubmit, formState: { errors, isSubmitting, isValid }, watch } = useForm<ResetPasswordSchema>({
        resolver: zodResolver(resetPasswordSchema),
        mode: 'onChange'
    });
    const passwordValue = watch("password") ?? "";

    useEffect(() => {
        const getEmail = sessionStorage.getItem("email");
        if(!getEmail) {
            showError('Email cannot find');
            navigate('/auth/forgot-password')
        }
        
        return () => {
            sessionStorage.removeItem("email")
        }
    }, [])

    const submitReset = handleSubmit(async (data) => {
        try {
            const { code, password } = data;
            await signIn?.attemptFirstFactor({
                strategy: 'reset_password_email_code',
                code,
                password
            })

            sessionStorage.removeItem("email");
            showInfo('Password berhasil direset, silakan login kembali')
            navigate('/auth/sign-in')
        } catch (error: any) {
            console.error('error', error.errors[0].longMessage)
            showError(error.errors[0].longMessage)
        } 
    })

    return (
         <main className="flex flex-col justify-center items-center h-screen">
            <form onSubmit={submitReset}>
                <Card className="w-[350px] md:w-[450px] gap-4">
                    <CardHeader className="text-center">
                        <CardTitle className="text-lg md:text-2xl font-bold mb-0.5">
                            Reset Password
                        </CardTitle>
                        <CardDescription className="text-sm md:text-md">
                            Masukkan kode verifikasi yang telah kami kirimkan ke email Anda, lalu buat kata sandi baru untuk akun Anda.
                            <div className="flex flex-wrap items-center gap-2 justify-center">
                                <p>{sessionStorage.getItem("email") || ""}</p>
                                <button className="cursor-pointer" onClick={() => navigate('/auth/forgot-password')}>
                                    <LuPencilLine size={18} />
                                </button>
                            </div>
                        </CardDescription>
                        
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Code</Label>
                                <Input 
                                className="h-10" 
                                id="code" 
                                placeholder="Enter your code" 
                                {...register("code")}
                                />
                                {errors.code && <span className="text-red-500 text-xs">{errors.code.message}</span>}
                            </div>
                            <div className="flex flex-col space-y-1.5 relative">
                                <Label htmlFor="email">Password</Label>
                                <Input 
                                className="h-10" 
                                id="password" 
                                placeholder="Enter your password" 
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                                />
                                <div className="absolute left-[90%] bottom-[1.2rem] cursor-pointer bg-amber-50">
                                    {passwordValue.length > 0 && (
                                    <span 
                                    onClick={handleShowPassword}>
                                        {showPassword  ? (
                                            <Eye className="w-4 h-4 text-gray-500" />
                                        ) : (
                                            <EyeOff className="w-4 h-4 text-gray-500" />
                                        )}
                                    </span> 
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="px-1">
                            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                        </div>
                    </CardContent>
                    <CardFooter className="flex items-start flex-col w-full">
                        <Button 
                        variant="primary" 
                        type="submit"
                        disabled={isSubmitting || !isValid} 
                        className="w-full">
                            {isSubmitting ? <ClipLoader size={20} /> : 'Reset Password'}
                        </Button>
                        <div className="grid grid-cols-[10%_90%] place-content-center place-items-center bg-[#fbe4fe] pl-3 pr-1 py-2 rounded-md mt-4">
                            <CiCircleInfo size={21} />
                            <p className="text-xs md:text-sm text-left">Saat memperbarui kata sandi Anda, semua sesi akan keluar. Silahkan masuk kembali dengan kata sandi baru Anda untuk melanjutkan</p>
                        </div>
                    </CardFooter>
                </Card>
            </form>
         </main>
    )
}
