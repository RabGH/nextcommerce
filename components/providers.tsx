import React from "react";
import { CartProvider as USCProdiver } from "use-shopping-cart";

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <USCProdiver
      mode="payment"
      cartMode="client-only"
      stripe={process.env.NEXT_PUBLIC_STRIPE as string}
      successUrl="/"
      cancelUrl="/"
      currency="USD"
      billingAddressCollection={true}
      shouldPersist={true}
      language="en-US"
    >
      {children}
    </USCProdiver>
  );
}
