import { Product, Category } from "./ProductTypes";
import { userSchema, UserSchema, UseUserReturn, UpdateUser } from "./UserTypes";
import { forgotPasswordSchema } from "./ForgotPasswordTypes";
import { loginSchema } from "./AuthTypes";
import {
  promotionSchema,
  PromotionSchema,
  UsePromotionReturn,
  UpdatePromotion,
} from "./PromotionTypes";

export {
  Product,
  Category,
  userSchema,
  forgotPasswordSchema,
  loginSchema,
  UpdateUser,
  promotionSchema,
  UpdatePromotion,
};

export type { UserSchema, UseUserReturn, PromotionSchema, UsePromotionReturn };
