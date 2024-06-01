import { Button } from "@/components/ui/button";

export default function ProductPage() {
  return (
    <div className="bg-white h-full w-full p-4">
      <div className="grid grid-rows-2 gap-4 border border-black">
        <div className="top-section pt-8">
          <h1 className="text-2xl font-bold px-4 pb-4">Product Name</h1>
          <hr className="border-black" />
          <div className="flex flex-row justify-between items-center my-4 px-4 w-full">
            <div className="price flex-1 border-r border-black flex justify-center items-center">
              <span className="text-xl font-semibold">$99.99</span>
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
            <p>This is a detailed description of the product. It covers all the features, benefits, and any other relevant information that the buyer should know.</p>
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
