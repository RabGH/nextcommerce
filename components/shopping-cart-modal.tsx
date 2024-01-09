"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const ShoppingCartModal = () => {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice,
    redirectToCheckout,
  } = useShoppingCart();

  async function handleCheckoutClick(event: any) {
    event.preventDefault();
    try {
      const result = await redirectToCheckout();
      if (result?.error) {
        console.log(result.error);
      }
    } catch (error: any) {
      console.log(error);
    } // use toast instead
  }

  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto">
            <ul className="-my-6 divide-y divide-gray-200">
              {cartCount === 0 ? (
                <h2 className="py-6">You don&apos;t have any items</h2>
              ) : (
                <>
                  {Object.values(cartDetails ?? {}).map((entry) => (
                    <li key={entry.id} className="flex py-6 group">
                      <div className="w-[100px] h-[120px] flex-shrink-0 overflow-hidden rounded-md border border-gray-200 group-hover:border-primary/50 transition300">
                        <Image
                          src={entry.image as string}
                          alt="Product Image"
                          width={100}
                          height={100}
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link
                                href={`/product/${entry.slug}`}
                                className="group-hover:text-primary transition300"
                                onClick={() => handleCartClick()}
                              >
                                {entry.name}
                              </Link>
                            </h3>
                            <p className="ml-4">${entry.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                            {entry.description}
                          </p>
                        </div>

                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">QTY: {entry.quantity}</p>
                          <div className="flex">
                            <Button
                              variant={"link"}
                              type="button"
                              onClick={() => removeItem(entry.id)}
                              className="font-medium text-primary hover:text-primary/80 hover:no-underline pt-5"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal:</p> <p>${totalPrice}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes are calculated at checkout.
            </p>

            <div className="mt-6">
              <Button onClick={handleCheckoutClick} className="w-full">
                Checkout
              </Button>
            </div>
            
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <Button
                onClick={() => handleCartClick()}
                variant={"link"}
                className="hover:no-underline"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartModal;
