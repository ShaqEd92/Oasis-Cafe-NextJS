import { useRouter, usePathname } from "next/navigation";
import { FaShoppingCart, FaShippingFast, FaCreditCard } from "react-icons/fa";

const CheckoutNavigation = () => {

  const router = useRouter();
  const pathname = usePathname()

  //ToDo Conditional formatting based on URL 

  return (
    <nav className="checkout-steps">

      <div className="cursor-pointer" onClick={() => router.push("/cart")}>
        <div className={`flex items-center text-sm px-4 py-2 rounded-l-lg ${pathname === "/cart"
          ? "bg-blue-500 text-white"
          : "bg-white"
          }`}>
          <span className="icon text-gray"><FaShoppingCart size={25} /></span>
          <div className="md:inline hidden ml-2">
            <div className="font-semibold">Cart</div>
            <div className="text-xs text-gray-600">Edit your cart</div>
          </div>
        </div>
      </div>

      {/* //ToDo Routing */}
      <div
        className="cursor-pointer"
        onClick={() => {
          if (pathname !== "/checkout")
            router.push("/checkout")
        }}>
        <div className={`flex items-center text-sm px-4 py-2 border border-t-0 border-b-0 border-r-lighter border-l-lighter 
        ${pathname === "/checkout"
            ? "bg-blue-500 text-white"
            : "bg-white"
          }`}>
          <span className="icon text-gray"><FaShippingFast size={25} /></span>
          <div className="md:inline hidden ml-2">
            <div className="font-semibold">Delivery</div>
            <div className="text-xs">Enter your details</div>
          </div>
        </div>
      </div>

      <div className="">
        <div className={`flex items-center text-sm px-4 py-2 rounded-r-lg ${pathname === "/checkout/payment"
          ? "bg-blue-500 text-white"
          : "bg-white"
          }`}>
          <span className="icon text-gray"><FaCreditCard size={25} /></span>
          <div className="md:inline hidden ml-2">
            <div className="font-semibold">Payment</div>
            <div className="text-xs text-gray-600">Enter payment info</div>
          </div>
        </div>
      </div>

    </nav>
  );
};

export default CheckoutNavigation;
