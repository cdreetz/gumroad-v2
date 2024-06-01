"use client";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation"; // Correct import for useRouter
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/client";

export default function NewProduct() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) {
      console.error('User ID is not set. Cannot insert product.');
      return;
    }

    const supabase = createClient();
    const { error } = await supabase
      .from('products')
      .insert([{
        id: crypto.randomUUID(),
        seller: userId, // Include the userId when adding the product
        name: productName,
        description: productDescription,
        price: productPrice,
      }]);

    if (error) {
      console.error('Error inserting product:', error);
    } else {
      console.log('Product added successfully');
      router.push('/dashboard/my-products'); // Redirect to products page on success
    }
  };

  return (
    <div className="flex flex-col text-white w-full my-10">
      <div className="flex flex-1 justify-center items-center">
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
          <div>
            <Label htmlFor="productName" className="block text-sm font-medium text-white">Name</Label>
            <Input type="text" id="productName" name="productName" placeholder="Name of product" value={productName} onChange={(e) => setProductName(e.target.value)} className="mt-1 block w-full rounded-md bg-black text-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
          </div>
          <div>
            <Label htmlFor="description" className="block text-sm font-medium text-white">Description</Label>
            <Textarea id="description" name="description" placeholder="Product description" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className="mt-1 block w-full rounded-md bg-black text-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
          </div>
          <div>
            <Label htmlFor="price" className="block text-sm font-medium text-white">Price</Label>
            <Input type="text" id="price" name="price" placeholder="Price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} className="mt-1 block w-full rounded-md bg-black text-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
          </div>
          <div>
            <button type="submit" className="w-full bg-[#ff90e8] text-black rounded-md py-2">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

