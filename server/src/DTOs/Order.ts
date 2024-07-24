import { z } from "zod";

export const Order = z.object({
  email: z.string().email({ message: "Endereço de email inválido" }),
  item: z.string().nonempty({ message: "O nome não pode ser vazio" }),
  description: z
    .string()
    .nonempty({ message: "A descrição não pode ser vazia" }),
  qtd: z
    .number()
    .positive({ message: "A quantidade deve ser um número positivo" }),
  price: z
    .number()
    .positive({ message: "O preço deve ser um número positivo" }),
  status: z.string().nonempty({ message: "O status não pode ser vazio" }),
  date: z.string().date(),
  addr: z.string().nonempty({ message: "O endereço não pode ser vazio" }),
});

export const UpdateOrder = Order.partial();
