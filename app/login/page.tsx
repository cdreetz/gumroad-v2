"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/loginaction";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    login(form)
      .then(() => {
        console.log("Login successful");
        router.push("/dashboard");
      })
      .catch((error) => {
        console.error("Login failed", error);
      });
  };

  return (
    <div className="w-full lg:w-auto mx-4 lg:mx-16 2xl:mx-12 lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <form onSubmit={handleSubmit} className="mx-auto grid w-full max-w-[540px] gap-14 border border-gray-500 shadow-2xl rounded-lg p-20 sm:p-16 items-center bg-black text-white">
          <div className="grid gap-4 text-center">
            <h1 className="text-3xl font-bold">Login to Your Account</h1>
            <p className="text-balance">
              Enter your credentials below to access your account
            </p>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-4">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="bg-gray-700 text-white"
              />
            </div>
            <div className="grid gap-4">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Link href="/resetpassword" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required className="bg-gray-700 text-white" />
            </div>
            <Button type="submit" className="w-full bg-blue-500 text-white">
              Log in
            </Button>
          </div>
          <div className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="underline text-blue-500">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
