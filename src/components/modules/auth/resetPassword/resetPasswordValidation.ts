import { z } from "zod";

export const resetPasswordSchema = z.object({
  newPassword: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});
