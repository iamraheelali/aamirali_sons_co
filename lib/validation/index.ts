import { z } from "zod";

export const checkoutSchema = z.object({
  customerName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(6, "Enter a valid phone number"),
  address: z.string().min(5, "Enter your address"),
  city: z.string().min(2, "Enter your city"),
  emirate: z.string().min(2, "Select your emirate"),
  paymentMethod: z.enum(["card", "cod"]),
  cardName: z.string().optional(),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

export const EMIRATES = [
  "Abu Dhabi",
  "Dubai",
  "Sharjah",
  "Ajman",
  "Umm Al Quwain",
  "Ras Al Khaimah",
  "Fujairah",
  "Al Ain",
];

/** Mock card validation — never stores real card data. */
export function validateMockCard(input: CheckoutInput): string | null {
  if (input.paymentMethod !== "card") return null;
  if (!input.cardNumber || input.cardNumber.replace(/\s/g, "").length < 12) {
    return "Enter a valid card number";
  }
  if (!input.cardExpiry || !input.cardExpiry.includes("/")) {
    return "Enter a valid expiry (MM/YY)";
  }
  if (!input.cardCvc || input.cardCvc.length < 3) {
    return "Enter a valid CVC";
  }
  return null;
}
