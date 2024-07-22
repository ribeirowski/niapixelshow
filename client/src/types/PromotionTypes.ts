import { z } from "zod";

export interface UsePromotionReturn<T = any> {
  promotionData: T | null;
  createPromotion: (promotionData: PromotionSchema) => Promise<void>;
  updatePromotion: (
    promotionId: string,
    promotionData: Partial<PromotionSchema>
  ) => Promise<void>;
  getPromotionById: (promotionId: string) => Promise<void>;
  deletePromotion: (promotionId: string) => Promise<void>;
  getAllPromotions: () => Promise<void>;
  loading: boolean;
  error: string | null;
  resetError: () => void;
}

const dateValidation = z.
  string().
  refine((val) => {
    const date = val.split("/");
    return (
      date.length === 3 &&
      date[0].length === 2 &&
      date[1].length === 2 &&
      date[2].length === 4
    );
  });

const discountValidation = z
  .string()
  .refine(
    (val) => !isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 100,
    {
      message: "O desconto deve ser um número de 1 até 100",
    }
  )
  .transform((val) => Number(val));

export const promotionSchema = z.object({
  name: z.string({ message: "O nome não pode ser vazio" }),
  discount: discountValidation,
  //string em formato de dd/mm/yyyy e que seja uma data válida
  start_date: dateValidation,
  end_date: dateValidation,
  active: z.boolean().default(true),
  product_id: z.string({ message: "O id do produto não pode ser vazio" }),
});

export const UpdatePromotion = promotionSchema.partial();

export type PromotionSchema = z.infer<typeof promotionSchema>;