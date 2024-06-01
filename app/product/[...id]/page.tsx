"use client"

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

interface Params {
  id: any;
}

import { useState, useEffect } from 'react';

export default function ProductPage({ params }: { params: Params }) {
  const { id } = params;
  const supabase = createClient();
  const [product, setProduct] = useState({ name: '', price: '', description: '' });

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('products')
        .select()
        .eq('id', id)
        .single();
      if (error) {
        console.error('Error fetching product:', error);
      } else {
        setProduct({
          name: data.name,
          price: data.price,
          description: data.description,
        });
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="bg-white h-full w-full p-4">
      <div className="grid grid-rows-2 gap-4 border border-black">
        <div className="top-section pt-8">
          <h1 className="text-2xl font-bold px-4 pb-4">{product.name}</h1>
          <hr className="border-black" />
          <div className="flex flex-row justify-between items-center my-4 px-4 w-full">
            <div className="price flex-1 border-r border-black flex justify-center items-center">
              <span className="text-xl font-semibold">{product.price}</span>
            </div>
            <div className="seller-name flex-1 border-r border-black flex justify-center items-center">
              <span className="text-md">Seller: John Doe</span>
            </div>
            <div className="ratings flex-1 flex justify-center items-center">
              <span className="text-md">★★★★☆</span>
            </div>
          </div>
          <hr className="border-black" />
          <div className="product-description mt-4 px-4">
            <p>{product.description}</p>
          </div>
        </div>
        <hr className="border-black" />
        <div className="bottom-section flex justify-center items-center w-full p-10">
          <Button className="bg-[#ff90e8] text-black rounded-md py-2 px-4 w-full">Add to cart</Button>
        </div>
      </div>
    </div>
  );
}
