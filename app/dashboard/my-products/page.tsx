"use client"
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { createClient } from "@/utils/supabase/client"

interface ErrorState {
  message: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  status: string;
  sales: number;
  totalRevenue: number;
}

export default function TableDemo() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorState | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      const supabase = createClient();
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("Authentication error:", userError);
        setError(userError);
        setLoading(false);
        return;
      }
      if (userData?.user) {
        console.log("User authenticated");
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select()
          .eq('seller', userData.user.id);
        if (productsError) {
          console.error("Error retrieving products:", productsError);
          setError(productsError);
        } else {
          console.log("Products retrieved");
          // Calculate total revenue for each product
          const productsWithTotalRevenue = productsData.map(product => ({
            ...product,
            totalRevenue: parseFloat(product.price) * product.sales
          }));
          setProducts(productsWithTotalRevenue);
        }
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col justify-center my-10 mx-14">
      <h2 className="text-xl my-4">Products</h2>
      <div className="flex flex-col items-center justify-center pb-2 border border-gray-300">
        <Table>
          <TableCaption>A list of your products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sales</TableHead>
              <TableHead className="text-right">Total Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow className="bg-black" key={product.id}>
                <TableCell className="font-medium">
                  <button onClick={() => window.location.href = `/product/${product.id}`}>
                    {product.name}
                  </button>
                </TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.status}</TableCell>
                <TableCell>{product.sales}</TableCell>
                <TableCell className="text-right">${product.totalRevenue.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right">$00.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
