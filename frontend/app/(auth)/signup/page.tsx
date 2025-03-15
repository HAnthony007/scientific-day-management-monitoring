import { SignupForm } from "@/features/auth/signup/signup.form";
import { Suspense } from "react";

export default async function SignupPage() {
    return (
        <div className="min-h-full grid place-items-center">
            <div className="grid gap-10">
                <div className="text-center">
                    <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                        <span className="text-primary-100">Join</span> to Day
                    </h3>
                    <p className="text-xl text-muted-foreground">
                        Scientific Day Management and Monitoring
                    </p>
                </div>
                <Suspense fallback="Loading ...">
                    <SignupForm />
                </Suspense>
            </div>
        </div>
    );
}
