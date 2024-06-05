import { z } from 'zod';

export const User = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z\u00C0-\u017F\s]+$/, { message: 'O nome deve conter apenas letras' }) // Adicionado \u00C0-\u017F para permitir acentos
    .nonempty({ message: 'O nome não pode ser vazio' }),
  phone: z
    .string()
    .regex(/^\+?[0-9]+$/, {
      message: 'O número de telefone deve conter apenas números',
    })
    .optional(),
  email: z.string().email({ message: 'Endereço de email inválido' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
  is_admin: z.boolean().default(false),
});

export const UpdateUser = User.partial();