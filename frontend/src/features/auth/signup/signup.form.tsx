"use client";

import { Icons } from "@/components/icon/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signupAction } from "./signup.action";
import { registerFormSchemas, registerSchemaType } from "./signup.schema";

export const SignupForm = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<registerSchemaType>({
        resolver: zodResolver(registerFormSchemas),
        mode: "onBlur",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data: registerSchemaType) => {
        setIsSubmitting(true);

        toast.promise(signupAction(data), {
            loading: "Register in...",
            success: (result) => {
                setIsSubmitting(false);
                reset();
                if (result.successMessage) {
                    router.push("/login");
                    return result.successMessage;
                }
                return "Register successfully!";
            },
            error: (result) => {
                setIsSubmitting(false);
                if (result.errors) {
                    return Object.values(result.errors).join(", ");
                }
                return result.errorMessage || "Failed register";
            },
        });
    };
    return (
        <form className="grid gap-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
                <div>
                    <label
                        htmlFor="pseudo"
                        className={
                            errors.pseudo
                                ? "text-red-500 text-muted-foreground"
                                : "text-muted-foreground"
                        }
                    >
                        Pseudo
                    </label>
                    <Input
                        {...register("pseudo")}
                        className={errors.pseudo ? "border-red-500" : ""}
                        placeholder="Your pseudo"
                    />
                    {errors.pseudo && (
                        <div className="text-red-500 text-sm">
                            {errors.pseudo.message}
                        </div>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className={
                            errors.email
                                ? "text-red-500 text-muted-foreground"
                                : "text-muted-foreground"
                        }
                    >
                        Email
                    </label>
                    <Input
                        type="email"
                        {...register("email")}
                        className={errors.email ? "border-red-500" : ""}
                        placeholder="code@level.com"
                    />
                    {errors.email && (
                        <div className="text-red-500 text-sm">
                            {errors.email.message}
                        </div>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className={
                            errors.password
                                ? "text-red-500 text-muted-foreground"
                                : "text-muted-foreground"
                        }
                    >
                        Password
                    </label>
                    <Input
                        type="password"
                        {...register("password")}
                        placeholder="Your password"
                    />
                    {errors.password && (
                        <div className="text-red-500 text-sm">
                            {errors.password.message}
                        </div>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="confirmPassword"
                        className={
                            errors.confirmPassword
                                ? "text-red-500 text-muted-foreground"
                                : "text-muted-foreground"
                        }
                    >
                        Confirm
                    </label>
                    <Input
                        type="password"
                        {...register("confirmPassword")}
                        placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && (
                        <div className="text-red-500 text-sm">
                            {errors.confirmPassword.message}
                        </div>
                    )}
                </div>
            </div>
            <div className={"flex flex-col gap-4"}>
                <div>
                    {isSubmitting ? (
                        <Button
                            size={"lg"}
                            disabled
                            className="w-full text-sm font-semibold"
                        >
                            <Icons.spinner className="animate-spin" />
                            Please wait
                        </Button>
                    ) : (
                        <Button
                            size={"lg"}
                            type="submit"
                            className="w-full text-sm font-semibold"
                        >
                            Sign Up
                        </Button>
                    )}
                </div>
                <div className="text-sm font-medium leading-none">
                    Already have an account?
                    <Link href="/login" className="underline">
                        Log in
                    </Link>
                </div>
            </div>
        </form>
    );
};
