"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { OrderSummary } from "./OrderSummary";
import { useCart } from "@/components/cart/CartProvider";
import { createOrderFromCart } from "@/lib/orders";
import {
  checkoutSchema,
  EMIRATES,
  validateMockCard,
  type CheckoutInput,
} from "@/lib/validation";
import { cn } from "@/lib/utils";

export function CheckoutForm() {
  const { items, clear } = useCart();
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const input: CheckoutInput = {
      customerName: String(formData.get("customerName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      address: String(formData.get("address") ?? ""),
      city: String(formData.get("city") ?? ""),
      emirate: String(formData.get("emirate") ?? ""),
      paymentMethod: (String(formData.get("paymentMethod") ?? "cod")) as
        | "card"
        | "cod",
      cardName: String(formData.get("cardName") ?? "") || undefined,
      cardNumber: String(formData.get("cardNumber") ?? "") || undefined,
      cardExpiry: String(formData.get("cardExpiry") ?? "") || undefined,
      cardCvc: String(formData.get("cardCvc") ?? "") || undefined,
    };

    const parsed = checkoutSchema.safeParse(input);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    const cardError = validateMockCard(parsed.data);
    if (cardError) {
      setErrors({ cardNumber: cardError });
      return;
    }

    setSubmitting(true);
    const order = createOrderFromCart(items, parsed.data);
    clear();
    router.push(`/order-confirmation?id=${order.id}`);
  };

  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod">("cod");

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4">
          <Field
            label="Full name"
            name="customerName"
            error={errors.customerName}
          />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Email" name="email" type="email" error={errors.email} />
            <Field label="Phone" name="phone" error={errors.phone} />
          </div>
          <Field label="Address" name="address" error={errors.address} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="City" name="city" error={errors.city} />
            <div className="flex flex-col gap-2">
              <label htmlFor="emirate" className="text-label text-muted">
                Emirate
              </label>
              <select
                id="emirate"
                name="emirate"
                className="h-12 bg-transparent border border-border px-3 text-sm focus:border-accent"
              >
                <option value="">Select emirate</option>
                {EMIRATES.map((em) => (
                  <option key={em} value={em}>
                    {em}
                  </option>
                ))}
              </select>
              {errors.emirate && (
                <span className="text-[10px] text-accent">{errors.emirate}</span>
              )}
            </div>
          </div>
        </div>

        {/* Payment method */}
        <div className="space-y-3">
          <span className="text-label text-muted">Payment</span>
          <div className="grid grid-cols-2 gap-3">
            {(["card", "cod"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setPaymentMethod(m)}
                aria-pressed={paymentMethod === m}
                className={cn(
                  "h-12 border border-border text-label uppercase tracking-nav transition-colors",
                  paymentMethod === m
                    ? "bg-accent text-background"
                    : "text-muted hover:text-foreground",
                )}
              >
                {m === "card" ? "Credit / Debit Card" : "Cash on Delivery"}
              </button>
            ))}
          </div>
          <input type="hidden" name="paymentMethod" value={paymentMethod} />

          {paymentMethod === "card" && (
            <div className="grid gap-4 pt-2 animate-fade">
              <Field label="Name on card" name="cardName" />
              <Field
                label="Card number"
                name="cardNumber"
                inputMode="numeric"
                placeholder="4242 4242 4242 4242"
                error={errors.cardNumber}
              />
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Expiry (MM/YY)"
                  name="cardExpiry"
                  placeholder="12/28"
                />
                <Field label="CVC" name="cardCvc" inputMode="numeric" />
              </div>
              <p className="text-[10px] text-muted">
                Mock payment — no real card data is stored.
              </p>
            </div>
          )}
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? "Placing order…" : "Place order"}
        </Button>
      </form>

      <OrderSummary />
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  placeholder,
  inputMode,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  placeholder?: string;
  inputMode?: "numeric" | "text";
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-label text-muted">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        className="h-12 bg-transparent border border-border px-3 text-sm focus:border-accent outline-none"
      />
      {error && <span className="text-[10px] text-accent">{error}</span>}
    </div>
  );
}
