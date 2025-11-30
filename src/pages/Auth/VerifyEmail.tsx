import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { Button } from "../../components/ui/button";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "@clerk/clerk-react";
import { useEffect } from "react";
import { showError, showInfo } from "@/utils/Toast";
import { ClipLoader } from "react-spinners";
import { useCooldownResend } from "@/hooks/universal/useCooldownResend";
import { useLogout } from "@/hooks/auth/useLogout";
import { Section } from "@/components/common/Section";

const inputOtpSchema = z.object({
    otp: z.string().length(6, { message: "OTP must be 6 digits" }).regex(/^\d+$/, { message: "OTP must be number" }),
});

type InputOtpSchema = z.infer<typeof inputOtpSchema>;

export const VerifyEmail = () => {
    const navigate = useNavigate();
    const { signUp, isLoaded } = useSignUp();
    const { logout } = useLogout();
    const { control, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<InputOtpSchema>({
        resolver: zodResolver(inputOtpSchema),
    });
    const { timeLeft, canResend, triggerResend } = useCooldownResend('email');

    const otpValue = watch('otp') || "";
    const isOtpComplete = otpValue.length === 6;

    useEffect(() => {
        const getEmail = sessionStorage.getItem("email");
        if(!getEmail) {
            showError('Email cannot find');
            navigate('/auth/sign-up')
        }
        
        return () => {
            sessionStorage.removeItem("email")
            localStorage.removeItem('resend_email')
        }
    }, [])

    const onSubmit = handleSubmit(async (data) => {
        if(!isLoaded) return;
        try {
            const { otp } = data;
            const verify = await signUp.attemptEmailAddressVerification({
                code: otp,
            })
            if(verify.status === "complete") {
                localStorage.removeItem('signUpId')

                await logout();
                navigate("/auth/sign-in", { replace: true });
            } else {
                console.error(JSON.stringify(verify, null, 2))
            }
        } catch (error: any) {
            showError(error.errors[0].longMessage)
            console.error('error', error.errors[0].longMessage)
        }
    });

    const handleResend = async () => {
        try {
            if(triggerResend()) {
                await signUp?.prepareEmailAddressVerification({ strategy: 'email_code' });
                showInfo('Verification code resend') 
            } else {
                console.error('Max resend attempt reached!');
            }
        } catch (error: any) {
            showError(error.errors[0].longMessage)
            console.error('error', error.errors[0].longMessage)
        }
    }

    return (
        <Section wrapperClassName="flex items-center justify-center h-screen">
            <form action="" onSubmit={onSubmit}>
                <div className={`flex flex-col items-center justify-center h-full ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}>
                    <h1 className="text-2xl font-bold mb-1">Verify Your Email</h1>
                    <p className="text-gray-600 mb-6 text-sm">Please check your email for a code verification.</p>
                    <Controller
                        name="otp"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                        <InputOTP 
                        maxLength={6}
                        value={value}
                        onChange={onChange}
                        disabled={isSubmitting}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP> 
                        )} 
                    />
                    {errors.otp && <p className="text-red-500 text-xs mt-3">{errors.otp.message}</p>}
                    <div className="flex flex-col items-center justify-center gap-2 mt-[1.5rem] w-full"> 
                        <Button 
                        className="w-full md:w-[350px]" variant="primary" 
                        size="lg"
                        type="submit" disabled={!isOtpComplete || isSubmitting}>
                            {isSubmitting ? <ClipLoader size={24} color="white" /> : 'Verify'}
                        </Button>
                        <p className="mt-2 flex gap-1 text-xs text-gray-400 font-normal">
                            Did'nt receive the email? 
                            <button className={`ml-1 ${canResend ? 'text-black hover:underline cursor-pointer font-semibold' : 'text-gray-400 pointer-events-none'} `} onClick={handleResend} disabled={!canResend}>
                                Resend
                            </button>
                            {timeLeft ? (
                            <p>({timeLeft})</p> 
                            ) : ''}
                        </p>
                    </div>
                </div>
            </form>
        </Section>
    )
}
