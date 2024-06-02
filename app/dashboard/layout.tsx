"use client"
import { useRouter } from "next/navigation"; // Correct import for useRouter
import { ReactNode, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

interface DashboardLayoutProps {
  children: ReactNode;
}

// Adjusted to use within useEffect directly
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const supabase = createClient();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const CheckUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        router.push('/login'); // Use useRouter for client-side redirect
        return;
      }
      setUserEmail(data.user.email || null);
    };

    CheckUser();
  }, [router]); // Include router in the dependency array

  const handleHomeButtonClick = () => {
    router.push("/dashboard");
  }

  const handleProductsButtonClick = () => {
    router.push("/dashboard/my-products");
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/login");
      router.refresh();
    } else {
      console.error("Logout failed:", error.message)
    }
  }

  return (
    <div className="flex flex-col text-white w-full h-full">
      <div className="flex w-full h-[100px] border-b border-gray-400">
        <div className="flex justify-center items-center w-1/6 bg-black">
          <h1 className="text-xl font-semibold">Gumroad</h1>
        </div>
        <div className="flex w-5/6 py-4 px-4 sm:px-6 lg:px-8 items-center">
          <h1 className="text-xl font-semibold">Welcome to Gumroad.</h1>
        </div>
      </div>
      <div className="flex flex-1">
        <nav className="h-full w-1/6 bg-black pt-2 flex flex-col justify-between">
          <div>
            <div className="flex flex-col space-y-2">
              <Button variant="ghost" onClick={handleHomeButtonClick}>Home</Button>
              <div className="h-px bg-gray-700"></div>
              <Button variant="ghost" onClick={handleProductsButtonClick}>Products</Button>
              <div className="h-px bg-gray-700"></div>
              <Button variant="ghost">Emails</Button>
              <div className="h-px bg-gray-700"></div>
              <Button variant="ghost">Sales</Button>
              <div className="h-px bg-gray-700"></div>
              <Button variant="ghost">Analytics</Button>
              <div className="h-px bg-gray-700"></div>
              <Button variant="ghost">Payouts</Button>
              <div className="h-px bg-gray-700"></div>
            </div>
          </div>
          <div className="mt-auto text-sm my-4 flex flex-col justify-center items-center">
            <Button onClick={handleLogout} className="my-2">Logout</Button>
            <div className="text-center w-full mt-1 border-t">{userEmail}</div>
          </div>
        </nav>
        <div className="w-5/6">
          {children}
        </div>
      </div>
    </div>
  );
}
