"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/dashboard/new-product");
  };

  return (
    <div className="flex flex-col text-white w-full h-full">
      <div className="flex flex-1">
        <div className="w-5/6 space-y-4 p-8">
          <Card className="p-4 shadow-md bg-black flex flex-col items-center space-y-4">
            <img src="/create-product-img.jpeg" alt="Descriptive Alt Text" className="w-full" />
            <div className="text-white flex flex-col items-center space-y-1 gap-4">
              <p className="text-md">We're here to help you get paid for your work.</p>
              <Button className="bg-[#ff90e8] text-black" onClick={handleButtonClick}>
                Create your first product
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
