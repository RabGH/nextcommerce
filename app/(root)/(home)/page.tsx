import Image from "next/image";

import Hero from "@/components/hero";
import Newest from "@/components/newest";

export const revalidate = 60;

export default function Home() {
  return (
    <main className="bg-white pb-6 sm:pb-8 lg:pb-12">
      <Hero />
      <Newest />
    </main>
  );
}
