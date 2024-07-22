import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email("Email inválido.").nonempty("Email é obrigatório."),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
