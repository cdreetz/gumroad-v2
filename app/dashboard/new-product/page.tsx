"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


export default function NewProduct() {
  return (
    <div className="flex flex-col text-white w-full h-full">
      <div className="flex flex-1 justify-center items-center">
        <form className="space-y-6 w-full max-w-md">
          <div>
            <Label htmlFor="productName" className="block text-sm font-medium text-white">Name</Label>
            <Input type="text" id="productName" name="productName" placeholder="Name of product" className="mt-1 block w-full rounded-md bg-black text-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
          </div>
          <div>
            <Label htmlFor="productType" className="block text-sm font-medium text-white">Product Type</Label>
            <select id="productType" name="productType" className="mt-1 block w-full rounded-md bg-black text-white border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              <option>Digital product</option>
              <option>Course or tutorial</option>
              <option>E-book</option>
              <option>Membership</option>
              <option>Physical good</option>
              <option>Bundle</option>
            </select>
          </div>
          <div>
            <Label htmlFor="description" className="block text-sm font-medium text-white">Description</Label>
            <Textarea id="description" name="description" placeholder="Product description" className="mt-1 block w-full rounded-md bg-black text-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
          </div>
          <div>
            <Label htmlFor="price" className="block text-sm font-medium text-white">Price</Label>
            <Input type="text" id="price" name="price" placeholder="price" className="mt-1 block w-full rounded-md bg-black text-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
          </div>
          <div>
            <button type="submit" className="w-full bg-[#ff90e8] text-black rounded-md py-2">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}
