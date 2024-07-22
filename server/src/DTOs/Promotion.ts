import { z } from "zod";

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
  .number()
  .refine(
    (val) => !isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 100,
    {
      message: "O desconto deve ser um número de 1 até 100",
    }
  )
  .transform((val) => Number(val));

export const Promotion = z.object({
  name: z.string({ message: "O nome não pode ser vazio" }),
  discount: discountValidation,
  start_date: dateValidation,
  end_date: dateValidation,
  active: z.boolean().default(true),
  product_id: z.string({ message: "O id do produto não pode ser vazio" }),
});

export const UpdatePromotion = Promotion.partial();
