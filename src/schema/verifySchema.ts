import { z } from "zod";

export const verifySchemaValidation = z.object({
  code: z
    .string()
    .length(6, { message: "Validation Code must be 6 characters long" }),
});
