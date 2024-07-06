import { z } from 'zod'

const today = new Date();
today.setHours(0, 0, 0, 0);

// Função auxiliar para converter uma string no formato dd/mm/yyyy para um objeto Date
const parseDateString = (dateString: string): Date => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

export const Promotion = z.object({
    name: z.string({ message: 'O nome não pode ser vazio' }),
    discount: z
    .number({ message: 'O desconto deve ser um número'})
    .int({ message: 'O desconto deve ser um número de 1 até 100'})
    .min(1, { message: 'O desconto deve ser um número de 1 até 100'})
    .max(100, { message: 'O desconto deve ser um número de 1 até 100'}),
    start_date: z
    .string({ message: 'A data de início deve ser uma data válida no formato dd/mm/yyyy' })
    .refine(date => {
      const parsedDate = parseDateString(date);
      return parsedDate >= today;
    }, { message: 'A data de início deve ser maior ou igual a data atual' })
    .transform(parseDateString),
    end_date: z
    .string({ message: 'A data de término deve ser uma data válida no formato dd/mm/yyyy' })
    .refine(date => {
      const parsedDate = parseDateString(date);
      return parsedDate > today;
    }, { message: 'A data de término deve ser maior que a data atual' })
    .transform(parseDateString),
    active: z.boolean().default(true),
    product_id: z.string({ message: 'O id do produto não pode ser vazio' }),
    })

export const UpdatePromotion = Promotion.partial();