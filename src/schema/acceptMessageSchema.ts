import { z } from "zod";

const acceptMessageValidation = z.object({
  acceptMessages: z.boolean(),
});
