import { Separator } from "@/components/ui/separator";

interface CheckoutItemProps {
  productName: string;
  price: number;
}

function CheckoutItem({ productName, price }: CheckoutItemProps) {
  return (
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="font-bold text-sm">{productName}</div>
        <div className="text-right text-sm">${price}</div>
        <div>Qty: 1</div>
        <div className="text-right underline cursor-pointer">Remove</div>
      </div>
  )
}

function CheckoutCart() {
  return (
    <div className="flex flex-col">

      <h2 className="text-lg font-semibold p-4">Your Cart</h2>
      <CheckoutItem productName="Eco-friendly Water Bottle" price={15} />
      <hr className="my-2" />
      <CheckoutItem productName="Organic Cotton T-shirt" price={25} />
      <hr className="my-1" />
      <div className="flex justify-between px-4 py-2">
        <div>Subtotal</div>
        <div className="text-right">US$40</div>
      </div>
      <hr className="my-1" />
      <div className="flex justify-between px-4 py-2">
        <div>Total</div>
        <div className="text-right">$TotalAmount</div>
      </div>
    </div>
  )
}

function PaymentColumn() {
  return (
      <div className="bg-black border border-gray-600 lg:w-[416px] flex flex-col">
        <h2 className="text-lg font-semibold mb-4 px-4 pt-4">Pay with</h2>
        {/* Payment options here */}
        <div className="space-y-2">
          <div className="px-4">
            <label className="block text-white">Card / Google Pay</label>
            {/* Toggle or select component for payment option */}
          </div>
          <div className="flex flex-col gap-2 p-4">
            <div>
              <label className="block text-white">Name on Card</label>
              <input type="text" placeholder="John Doe" className="w-full p-2 bg-black border border-gray-600 text-gray-400 placeholder-gray-400" />
            </div>
            <div>
              <label className="block text-white">Card Number</label>
              <input type="text" placeholder="1234 5678 9012 3456" className="w-full p-2 bg-black border border-gray-600 text-white placeholder-gray-400" />
            </div>
            <div>
              <label className="block text-white">Expiration Date</label>
              <input type="text" placeholder="MM/YY" className="w-full p-2 bg-black border border-gray-600 text-white placeholder-gray-400" />
            </div>
          </div>
          <hr />
          <div className="flex flex-col gap-2 p-4">
            <h3 className="text-md font-semibold ">Pay with</h3>
            <div>
              <label className="block text-white">Email</label>
              <input type="email" placeholder="example@gumroad.com" className="w-full p-2 bg-black border border-gray-600 text-white placeholder-gray-400" />
            </div>
            <div className="flex flex-row justify-between gap-1">
              <div>
                <label className="block text-white">Country</label>
                <input type="text" placeholder="United States" className="w-full p-2 bg-black border border-gray-600 text-white placeholder-gray-400" />
              </div>
              <div>
                <label className="block text-white">ZIP</label>
                <input type="text" placeholder="12345" className="w-full p-2 bg-black border border-gray-600 text-white placeholder-gray-400" />
              </div>
            </div>
          </div>
          <hr />
          <div className="px-8">
            <button className="w-full bg-blue-500 p-2 my-4 border border-gray-600">Pay</button>
          </div>
        </div>
      </div>
  )
}



export default function CheckoutPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-center text-white w-full  bg-[#242423] mx-auto p-[clamp(1rem,5vw,4rem)]">
      <div className="flex flex-col space-y-4 max-w-[660px] mx-auto">
        <div className="bg-black border border-gray-600">
          <CheckoutCart />
          {/* List items in cart here */}
        </div>
        <div className="bg-black border border-gray-600 p-4">
          <h2 className="text-md font-semibold">Customers who bought these items also bought</h2>
          {/* Recommendations list here */}
        </div>
      </div>
      <PaymentColumn />
    </div>
  )
}

