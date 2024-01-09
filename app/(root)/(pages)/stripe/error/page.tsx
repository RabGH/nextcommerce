import React from "react";
import Link from "next/link";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

const StripeErrorPage = () => {
  return (
    <div className="h-screen">
      <div className="mt-32 md:max-w-[50vw] mx-auto">
        <X className="text-red-600 w-16 h-16 mx-auto my-6" />
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Failed
          </h3>
          <p className="text-sm text-gray-500 my-2">Something went wrong</p>

          <Button asChild className="mt-5">
            <Link href="/" aria-label="Go to home">
              Go Back
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StripeErrorPage;
