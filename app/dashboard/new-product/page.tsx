"use client";
import { z } from "zod";
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"; // Correct import for useRouter
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(3).max(20),
  description: z.string().min(5).max(100),
  price: z.string().min(1).max(10),
  productfile: z.instanceof(File).optional(),
})

export default function NewProduct() {
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      productfile: undefined,
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
        router.push('/login'); // Redirect to login if unable to fetch user
      } else {
        setUserId(data.user.id);
      }
    };

    fetchUser();
  }, [router]);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!userId) {
      console.error('User ID is not set. Cannot insert product.');
      return;
    }

    setUploading(true);
    let productFileUrl = null;

    if (data.productfile) {
      const file = data.productfile;
      const fileExtension = file.name.split('.').pop();
      const filePath = `public/${data.name}_image.${fileExtension}`;
      const { error: uploadError } = await createClient()
        .storage
        .from('product_files')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Error uploading file', uploadError);
        setUploading(false);
        return;
      }

      productFileUrl = filePath;
    }

    const { error } = await createClient()
      .from('products')
      .insert([{
        id: crypto.randomUUID(),
        seller: userId,
        name: data.name,
        description: data.description,
        price: data.price,
        image_url: productFileUrl,
      }]);

    if (error) {
      console.error('Error inserting product:', error);
      setUploading(false);
    } else {
      console.log('Product added successfully');
      router.push('/dashboard/my-products'); // Redirect to products page on success
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col w-full my-10">
      <div className="flex flex-1 justify-center items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full max-w-md">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name of product" {...field} className="mt-1 block w-full rounded-md bg-black text-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Product description" {...field} className="mt-1 block w-full rounded-md bg-black text-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Price" {...field} className="mt-1 block w-full rounded-md bg-black text-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productfile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Image</FormLabel>
                  <FormControl className="text-white">
                    <Input
                      type="file"
                      accept="image/*"
                      disabled={uploading}
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          field.onChange(e.target.files[0]);
                        }
                      }}
                      className="bg-black text-white file:text-white"
                    />
                  </FormControl>
                  <FormDescription>
                    Please upload an image of the product.
                  </FormDescription>
                </FormItem>
              )}
            />
            <button type="submit" disabled={uploading} className="w-full bg-[#ff90e8] text-black rounded-md py-2">
              {uploading ? 'Uploading...' : 'Submit'}
            </button>
          </form>
        </Form>
      </div>
    </div>
  )
}



