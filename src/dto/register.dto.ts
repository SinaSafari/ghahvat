import { z } from "zod";

export const registerSchema = z.object({
  phone: z.string(),
  password: z.string().min(8).max(32),
  profileId: z.string().min(3).max(32),
  displayName: z.string().max(32),
});
