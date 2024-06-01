"use client";
import React from "react";
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation";
import { login } from "@/app/loginaction";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const methods = useForm();
  const { register, handleSubmit, formState: { errors } } = methods;

  const onSubmit = (data: any) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    login(formData).then(() => {
        router.push("/dashboard");
        console.log("Login successful");
      }).catch((error) => {
        console.error("Login failed", error);
      });
  };

  return (
    <div className="w-full lg:w-auto mx-4 lg:mx-16 2xl:mx-12 lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto grid w-full max-w-[540px] gap-14 border border-gray-500 shadow-2xl rounded-lg p-20 sm:p-16 items-center bg-black text-white">
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
                  {...register("email", { required: true })}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="bg-gray-700 text-white"
                />
                {errors.email && <span>This field is required</span>}
              </div>
              <div className="grid gap-4">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Link href="/resetpassword" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input 
                  {...register("password", { required: true })}
                  id="password"
                  type="password"
                  className="bg-gray-700 text-white"
                />
                {errors.password && <span>This field is required</span>}
              </div>
              <Button type="submit" name="login" className="w-full bg-blue-500 text-white">
                Log in
              </Button>
            </div>
            <div className="mt-6 text-center text-sm">
              Don`t have an account?{" "}
              <Link href="/signup" className="underline text-blue-500">
                Sign up
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
