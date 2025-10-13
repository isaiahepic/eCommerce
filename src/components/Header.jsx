import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import sweetAlert from "sweetalert";
// import axios from "axios";
import { clearCart, removeFromCart } from "@/store/cartSlice";
import { X } from "lucide-react";
import cartIcon from "@/assets/cart.png";
import logo from "@/assets/logo.png";
import user1 from "@assets/user.png";
import user2 from "@assets/user1.png";
import { initEpicPay, openPaymentSheet } from "epic-pay-sdk";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // Initialize Epic Pay SDK
  useEffect(() => {
    initEpicPay({
      merchantId: "demo_merchant_123",
      environment: "sandbox",
      onEvent: (e) => console.log("[EpicPay]", e),
    });
  }, []);

  // Navigate to Home
  const goHome = () => {
    navigate("/", { replace: true });
    window.history.replaceState({}, "", "/");
    window.scrollTo(0, 0);
  };

  // Handle Checkout with Paystack
  // const handleCheckout = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3000/api/paystack/initialize",
  //       {
  //         email: "user@gmail.com", // To replace with actual user email
  //         amount: total,
  //       }
  //     );
  //     const { data } = response.data;
  //     console.log("Paystack response data:", data);
  //     if (data && data.authorization_url) {
  //       window.open(data.authorization_url, "_blank");
  //     } else {
  //       console.error("Invalid Paystack response:", response.data);
  //     }
  //   } catch (error) {
  //     console.error("Checkout error:", error);
  //   } finally {
  //     setShowCart(false);
  //   }
  // };

  // Handle Checkout with Epic Pay
  const handleCheckout = async () => {
    console.log("Initiating Epic Pay checkout for amount:", total);
    try {
      const result = await openPaymentSheet({
        amount: total,
        currency: "NGN",
        customer: {
          email: "user@gmail.com",
        },
        paymentMethods: ["card", "bank", "epic"],
      });

      if (result.status === "succeeded") {
        sweetAlert({
          title: "PAYMENT SUCCESS",
          text: `Transaction ID: ${result.transactionId}`,
          icon: "success",
          button: "OK",
        });
        // alert(`✅ Payment Success! Transaction ID: ${result.transactionId}`);
        dispatch(clearCart());
        setShowCart(false);
      } else {
        // alert("⚠️ Payment not completed.");
        sweetAlert({
          title: "PAYMENT NOT COMPLETED",
          icon: "warning",
          button: "OK",
        });
      }
    } catch (err) {
      console.error("[EpicPay Error]", err);
      // alert("❌ Payment failed. Please try again.");
      sweetAlert({
        title: "PAYMENT FAILED",
        icon: "failure",
        button: "OK",
      });
    }
  };

  return (
    <div className="absolute fixed top-0 z-20 w-full bg-white flex justify-between items-center py-4 px-8 h-[6rem] border-b border-gray-200">
      {/* Logo */}
      <div className="flex items-center gap-[1rem]">
        <img
          src={logo}
          alt="Logo"
          className="h-[4rem] w-auto cursor-pointer"
          onClick={goHome}
        />

        <p
          onClick={() => navigate("about")}
          className="text-bodyText text-[1rem] cursor-pointer hover:font-semibold hover:underline"
        >
          About us
        </p>
      </div>

      {/* Nav */}
      <div className="flex items-center gap-[1rem] font-medium">
        {/* Cart */}
        <div
          onClick={() => setShowCart(true)}
          className="relative flex items-center gap-[0.5rem] bg-bodyText hover:bg-black py-2 px-4 rounded-full cursor-pointer hover:scale-105 transition"
        >
          <img src={cartIcon} alt="Cart" className="w-[1.5rem] h-[1.5rem]" />
          <p className="text-white text-[1rem]">Cart</p>

          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          )}
        </div>

        {/* Auth buttons */}
        <div className="flex items-center gap-[0.5rem] bg-bodyText hover:bg-black py-2 px-4 rounded-full cursor-pointer hover:scale-105 transition">
          <img src={user1} alt="Cart" className="w-[1.5rem] h-[1.5rem]" />
          <p className="text-white text-[1rem]">Sign In</p>
        </div>

        <div className="flex items-center gap-[0.5rem] bg-bodyText hover:bg-black py-2 px-4 rounded-full cursor-pointer hover:scale-105 transition">
          <img src={user2} alt="Cart" className="w-[1.5rem] h-[1.5rem]" />
          <p className="text-white text-[1rem]">Create Account</p>
        </div>
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-end">
          <div className="bg-white w-[25rem] h-full p-6 flex flex-col">
            <div className="flex items-center justify-between pb-[1.5rem]">
              <h2 className="font-bold text-xl">Your Cart</h2>
              <button onClick={() => setShowCart(false)}>
                <X className="h-[1.5rem] w-[1.5rem] hover:text-red-500 cursor-pointer" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {cart.length > 0 ? (
                cart.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center mb-4 border-b pb-2"
                  >
                    <p>{item.name}</p>

                    <div className="flex items-center justify-end gap-4">
                      <p>
                        {item.quantity} × ₦{item.price}
                      </p>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-gray-500 underline cursor-pointer"
                      >
                        <X className="h-[1.5rem] w-[1.5rem] border border-gray-400 rounded-full hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <p className="text-gray-400 text-[0.9rem] font-normal">
                    No items selected yet
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-[1.5rem] py-[1rem]">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-[1.2rem]">
                  Total: ₦{total.toFixed(2)}
                </p>
                <button
                  onClick={handleCheckout}
                  className="bg-gray-800 text-white px-[1.5rem] py-[0.5rem] rounded-full cursor-pointer hover:bg-black hover:scale-105 transition"
                >
                  Proceed to Pay Now
                </button>
              </div>

              <div className="flex items-center justify-center gap-[2rem]">
                <button
                  onClick={() => setShowCart(false)}
                  className="text-[1rem] text-gray-500 font-semibold underline cursor-pointer hover:text-red-500"
                >
                  Close
                </button>

                <button
                  onClick={() => dispatch(clearCart())}
                  className="text-[1rem] text-gray-500 font-semibold underline cursor-pointer hover:text-red-500"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
