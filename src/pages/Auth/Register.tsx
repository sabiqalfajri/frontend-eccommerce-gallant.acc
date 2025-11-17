import { InputPassword } from "@/components/common/InputPassword"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { registerFormSchema, RegisterFormSchema } from "@/schema/Register.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { showError } from "@/utils/Toast";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "@clerk/clerk-react";
import { ClipLoader } from "react-spinners";

export const Register = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<RegisterFormSchema>({
            resolver: zodResolver(registerFormSchema),
    });
    const navigate = useNavigate();
    const { signUp, isLoaded } = useSignUp();

    const onSubmit = handleSubmit(async (data) => {
       if(isLoaded) {
            const { email, password, firstName, lastName } = data;
            try {
                await signUp.create({
                    emailAddress: email,
                    password: password,
                });
                await signUp.update({
                    unsafeMetadata: {
                        firstName,
                        lastName
                    }
                });
                
                await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
                sessionStorage.setItem('email', email);
                
                navigate("/auth/verify-email");
            } catch (error: any) {
                showError(error.errors[0].longMessage)
                console.error('error', error.errors[0].longMessage)
            }
        }
    })

    return (
        <main className="flex flex-col justify-center items-center h-screen">
            <form onSubmit={onSubmit}>
                <Card className={`w-[350px] md:w-[450px] gap-4 shadow-lg`}>
                    <CardHeader
                    // className={`${registerGoogleLoading || isSubmitting ? 'pointer-events-none opacity-50' : ''}`}
                    >
                        <CardTitle className="text-3xl font-bold mb-0.5 text-center">
                            Create an account
                        </CardTitle>
                        <CardDescription className="text-center">
                            Deploy your new project in one-click.
                        </CardDescription>
                        <div className="flex items-center ">
                        <hr className="flex-1 border-t border-gray-300 my-3.5"/>
                        <span className="mx-3 text-gray-400 text-xs select-none">
                            Register with Email
                        </span>
                        <hr className="flex-1 border-t border-gray-300"/>
                    </div>
                    </CardHeader>
                    <CardContent
                    className={`${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}
                    >
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-nowrap justify-between gap-1.5 w-full">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input 
                                    className="h-10" 
                                    id="firstName" 
                                    placeholder="First name" 
                                    {...register("firstName")}
                                    />
                                    {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input 
                                    className="h-10" 
                                    id="lastName" 
                                    placeholder="Last name" 
                                    {...register("lastName")}
                                    />
                                    {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName.message}</span>}
                                </div>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                className="h-10" 
                                id="email" 
                                placeholder="Enter your email"
                                type="email"
                                {...register("email")}
                                />
                                {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                            </div>
                            <InputPassword 
                            id="password"
                            value={watch("password")}
                            error={errors.password?.message}
                            register={register}
                            label="Password"
                            />
                        </div>
                        <div className="flex items-center mt-3">
                        <div className="flex items-center space-x-2">
                                <Checkbox id="terms" />
                                <label
                                    htmlFor="terms"
                                    className="text-xs font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    I agree to the <a className="text-indigo-600 hover:underline" href="#">Terms and Conditions</a>
                                </label>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex items-start flex-col w-full">
                        <div 
                        className={`w-full ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}
                        >
                            <Button variant="primary" type="submit"
                            disabled={isSubmitting} 
                            className="w-full">
                                {isSubmitting ? <ClipLoader size={20} /> : "Create account"}
                            </Button>
                            <p className="mt-3 flex gap-2 text-xs text-black font-normal">
                                Already have an account?
                                <a className="text-indigo-600 hover:underline" href="/auth/sign-in">
                                    Sign in
                                </a>
                            </p>
                        </div>

                        <div className="w-full mt-2">
                            <div id="clerk-captcha" data-cl-theme="dark" data-cl-size="flexible"></div>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </main>
    )
}