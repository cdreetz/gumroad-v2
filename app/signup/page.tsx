// app/signup/page.tsx
"use client";
import Image from "next/image"
import Link from "next/link"
import React from "react";
import { useForm } from "react-hook-form";
import { signup } from "@/app/loginaction";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";

export default function SignUpPage() {
  const router = useRouter();
  const methods = useForm();
  const { register, handleSubmit, formState: { errors } } = methods;

  const onSubmit = (data: any) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    signup(formData).then(() => {
        console.log("Signup successful");
        router.push("/dashboard");
      }).catch((error) => {
        console.error("Signup failed", error);
      });
  };

  return (
    <div className="w-full lg:w-auto mx-4 lg:mx-16 2xl:mx-12 lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto grid w-full max-w-[540px] gap-14 border border-gray-500 shadow-2xl rounded-lg p-20 sm:p-16 items-center bg-black text-white">
            <div className="grid gap-4 text-center">
              <h1 className="text-3xl font-bold">Create your <span style={{ color: '#ff90e8' }}>Gumroad</span> account</h1>
              <p className="text-balance">
                Enter your email below to create to your account
              </p>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-4">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  {...register("email", { required: true })}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  className="bg-gray-700 text-white"
                />
                {errors.email && <span>This field is required</span>}
              </div>
              <div className="grid gap-4">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-white">Password</Label>
                </div>
                <Input 
                  {...register("password", { required: true })}
                  id="password" 
                  name="password"
                  type="password" 
                  className="bg-gray-700 text-white"
                />
                {errors.password && <span>This field is required</span>}
              </div>
              <Button 
                type="submit"
                name="signup"
                //formAction={signup}
                className="w-full bg-blue-500 text-white"
              >
                Create account
              </Button>
            </div>
            <div className="mt-6 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline text-blue-500">
                Login
              </Link>
            </div>
          </form>
        </Form>
      </div>
      <div className="hidden lg:block">
        <div className="flex h-full items-center justify-center">
          <div className="w-[600px] rounded-lg bg-black p-8 shadow-lg border border-gray-500">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold" style={{ color: '#ff90e8' }}>Gumroad</h2>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 text-white">
                    - 
                  </div>
                  <div>
                    <h3 className="font-medium text-white">We handle all the payment stuff</h3>
                    <p className="text-white">
                      You should be focused on creating awesome content.
                      We`ll deal with the rest.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 text-white">
                    - 
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Do what you already do.</h3>
                    <p className="text-white">
                      Use the channels you already have with your fans and followers.
                      You are the distribution. No store needed.  
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 text-white">
                    -
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Built for creators</h3>
                    <p className="text-white">
                      No matter whether you create designs or graphics, to educational courses, 
                      Gumroad gives you the power to monetize off your creations  
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
  