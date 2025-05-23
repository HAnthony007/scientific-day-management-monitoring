"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userTypes } from "@/features/users/data/data";
import { User } from "@/features/users/data/users-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PasswordInput } from "../ui/password-input";
import { ScrollArea } from "../ui/scroll-area";
import { SelectDropdown } from "../ui/select-dropdown";
import axiosInstance from "@/lib/axiosInstance";

const formSchema = z
    .object({
        name: z.string().min(1, { message: "Name is required." }),
        email: z
            .string()
            .min(1, { message: "Email is required." })
            .email({ message: "Email is invalid." }),
        password: z.string().transform((pwd) => pwd.trim()),
        role: z.string().min(1, { message: "Role is required." }),
        confirmPassword: z.string().transform((pwd) => pwd.trim()),
        isEdit: z.boolean(),
    })
    .superRefine(({ isEdit, password, confirmPassword }, ctx) => {
        if (!isEdit || (isEdit && password !== "")) {
            if (password === "") {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Password is required.",
                    path: ["password"],
                });
            }

            if (password.length < 8) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Password must be at least 8 characters long.",
                    path: ["password"],
                });
            }

            if (!password.match(/[a-z]/)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message:
                        "Password must contain at least one lowercase letter.",
                    path: ["password"],
                });
            }

            if (!password.match(/\d/)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Password must contain at least one number.",
                    path: ["password"],
                });
            }

            if (password !== confirmPassword) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Passwords don't match.",
                    path: ["confirmPassword"],
                });
            }
        }
    });
type UserForm = z.infer<typeof formSchema>;

interface Props {
    currentRow?: User;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UsersActionDialog({ currentRow, open, onOpenChange }: Props) {
    const isEdit = !!currentRow;
    const form = useForm<UserForm>({
        resolver: zodResolver(formSchema),
        defaultValues: isEdit
            ? {
                  ...currentRow,
                  password: "",
                  confirmPassword: "",
                  isEdit,
              }
            : {
                  name: "",
                  email: "",
                  role: "",
                  password: "",
                  confirmPassword: "",
                  isEdit,
              },
    });

    const onSubmit = async (values: UserForm) => {
        form.reset();
        try {
            let response;
            if (isEdit) {
                response = await axiosInstance.put(`/User/${currentRow.id_user}`, values)
                toast.success(response.data.msg)
            } else {
                response = await axiosInstance.post("/register", values)
                toast.success(response.data.msg)
            }
            
        } catch (error) {
            console.error("Errors lors de la soumission: ", error)
            toast.error("Une erreur est survenue")
        }finally {
            onOpenChange(false);
        }
        // toast.message("You submitted the following values:", {
        //     description: (
        //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //             <code className="text-white">
        //                 {JSON.stringify(values, null, 2)}
        //             </code>
        //         </pre>
        //     ),
        // });
    };

    const isPasswordTouched = !!form.formState.dirtyFields.password;

    return (
        <Dialog
            open={open}
            onOpenChange={(state) => {
                form.reset();
                onOpenChange(state);
            }}
        >
            <DialogContent className="sm:max-w-lg">
                <DialogHeader className="text-left">
                    <DialogTitle>
                        {isEdit ? "Edit User" : "Add New User"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? "Update the user here. "
                            : "Create new user here. "}
                        Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="-mr-4 h-[26.25rem] w-full py-1 pr-4">
                    <Form {...form}>
                        <form
                            id="user-form"
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 p-0.5"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                                        <FormLabel className="col-span-2 text-right">
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="john_doe"
                                                className="col-span-4"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="col-span-4 col-start-3" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                                        <FormLabel className="col-span-2 text-right">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="john.doe@gmail.com"
                                                className="col-span-4"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="col-span-4 col-start-3" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                                        <FormLabel className="col-span-2 text-right">
                                            Role
                                        </FormLabel>
                                        <SelectDropdown
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                            placeholder="Select a role"
                                            className="col-span-4"
                                            items={userTypes.map(
                                                ({ label, value }) => ({
                                                    label,
                                                    value,
                                                })
                                            )}
                                        />
                                        <FormMessage className="col-span-4 col-start-3" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                                        <FormLabel className="col-span-2 text-right">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                placeholder="e.g., S3cur3P@ssw0rd"
                                                className="col-span-4"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="col-span-4 col-start-3" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                                        <FormLabel className="col-span-2 text-right">
                                            Confirm Password
                                        </FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                disabled={!isPasswordTouched}
                                                placeholder="e.g., S3cur3P@ssw0rd"
                                                className="col-span-4"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="col-span-4 col-start-3" />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </ScrollArea>
                <DialogFooter>
                    <Button type="submit" form="user-form">
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
