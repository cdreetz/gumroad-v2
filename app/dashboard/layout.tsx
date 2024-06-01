import { useRouter } from "next/navigation"
import { ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/dashboard");
  }
  return (
    <div className="flex flex-col text-white w-full h-full">
      <div className="flex w-full h-[100px] border-b border-gray-200">
        <div className="flex justify-center items-center w-1/6 bg-black">
          <h1 className="text-xl font-semibold">Gumroad</h1>
        </div>
        <div className="flex w-5/6 py-4 px-4 sm:px-6 lg:px-8 items-center">
          <h1 className="text-xl font-semibold">Welcome to Gumroad.</h1>
        </div>
      </div>
      <div className="flex flex-1">
        <nav className="h-full w-1/6 bg-black pt-2">
          <div className="flex flex-col space-y-2">
            <Button variant="ghost" onClick={handleButtonClick}>Home</Button>
            <div className="h-px bg-gray-700"></div>
            <Button variant="ghost">Products</Button>
            <div className="h-px bg-gray-700"></div>
            <Button variant="ghost">Checkout</Button>
            <div className="h-px bg-gray-700"></div>
            <Button variant="ghost">Emails</Button>
            <div className="h-px bg-gray-700"></div>
            <Button variant="ghost">Workflows</Button>
            <div className="h-px bg-gray-700"></div>
            <Button variant="ghost">Sales</Button>
            <div className="h-px bg-gray-700"></div>
            <Button variant="ghost">Analytics</Button>
            <div className="h-px bg-gray-700"></div>
            <Button variant="ghost">Payouts</Button>
          </div>
        </nav>
        <div className="w-5/6 p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
