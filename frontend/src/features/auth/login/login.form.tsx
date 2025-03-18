"use client";

import { Icons } from "@/components/icon/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/axiosInstance";
import { useAuthStore } from "@/stores/AuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginFormSchemas, loginSchemaType } from "./login.schema";

export const LoginForm = () => {
    // const router = useRouter();
    const setUser = useAuthStore((state) => state.setUser);
    const setToken = useAuthStore((state) => state.setToken);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<loginSchemaType>({
        resolver: zodResolver(loginFormSchemas),
        mode: "onBlur",
    });

    const onSubmit = async (data: loginSchemaType) => {
        setIsSubmitting(true);

        toast.promise(axiosInstance.post("/login", data), {
            loading: "Logging in...",
            success: (result) => {
                setIsSubmitting(false);
                reset();
                console.log(result);
                const { token, user } = result.data.data;
                setUser(user);
                setToken(token, user.role);

                return result.data.msg;
            },
            error: (result) => {
                setIsSubmitting(false);
                console.log(result);
                if (result.errors) {
                    return Object.values(result.errors).join(", ");
                }
                return result.errorMessage || "Login failed";
            },
        });
    };

    return (
        <form className="grid gap-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
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
                        placeholder="email@gmail.com"
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
                    <div className="text-right text-sm text-muted-foreground underline">
                        <Link href="#">Forgot password?</Link>
                    </div>
                </div>
            </div>
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
                        Log in
                    </Button>
                )}
            </div>
        </form>
    );
};
