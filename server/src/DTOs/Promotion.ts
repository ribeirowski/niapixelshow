import { z } from 'zod'

export const Promotion = z.object({
    name: z.string({ message: 'O nome não pode ser vazio' }),
    discount: z
    .number({ message: 'O desconto deve ser um número'})
    .int({ message: 'O desconto deve ser um número de 1 até 100'})
    .min(1, { message: 'O desconto deve ser um número de 1 até 100'})
    .max(100, { message: 'O desconto deve ser um número de 1 até 100'}),
    start_date: z.string({ message: 'A data de início não pode ser vazia'}),
    end_date: z.string({ message: 'A data de término não pode ser vazia'}),
    active: z.boolean().default(false),
    product_id: z.string({ message: 'O id do produto não pode ser vazio' }),
    })

export const UpdatePromotion = Promotion.partial();