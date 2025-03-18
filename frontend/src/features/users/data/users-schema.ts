import { z } from "zod";

const userStatusSchema = z.union([
    z.literal("active"),
    z.literal("inactive"),
    z.literal("invited"),
    z.literal("suspended"),
]);
export type UserStatus = z.infer<typeof userStatusSchema>;

const userRoleSchema = z.union([
    z.literal("admin"),
    z.literal("organisateur"),
    z.literal("participant"),
]);

const userSchema = z.object({
    id_user: z.number(),
    name: z.string(),
    email: z.string(),
    status: userStatusSchema.optional(),
    role: userRoleSchema,
    photo: z.string().nullable(),
});
export type User = z.infer<typeof userSchema>;

export const userListSchema = z.array(userSchema);
