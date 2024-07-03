import { z } from "zod";

export const userNameValidation = z
  .string()
  .min(2, "Username must be atleast 2 characters long")
  .max(20, "Username cannot have more than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username cannot contain special characters");
export const signUpSchema = z.object({
  username: userNameValidation,
  email: z.string().email({ message: "Invalid Email Address" }),
  password: z
    .string()
    .min(6, { message: "password must be atleast 6 characters long" }),
});
