import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from "@/store/cartSlice";
import { useNavigate } from "react-router-dom";
import person from "@assets/lady.jpg";
import data from "../../Data.json";

const Home = () => {
  const products = data.Items;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  return (
    <div>
      {/* HERO SECTION */}
      <div className="h-[calc(100vh-6rem)] my-[6rem] mx-8 bg-custom-black flex justify-between items-center text-white rounded-2xl">
        <div className="flex flex-col justify-center gap-[2rem] w-1/2 pl-[3rem] py-[2rem] bg-[url('./assets/drink-pouring.gif')] bg-no-repeat bg-center bg-cover h-full rounded-l-2xl">
          <h1 className="font-semibold text-[3rem] tracking-[-0.02em] leading-[3.5rem]">
            Drinks That Define Your Taste
          </h1>
          <p className="font-normal text-[1.2rem] w-[80%]">
            Handpicked beverages crafted for every mood, every moment. Chill,
            celebrate, or simply refresh - we've got you covered.
          </p>
          <button className="border border-white w-max py-[1rem] px-[3rem] rounded-full hover:bg-white hover:text-black transition font-semibold cursor-pointer">
            Shop Now
          </button>
        </div>

        <div className="w-1/2 h-full flex items-center justify-center rounded-2xl">
          <img
            src={person}
            alt="Person"
            className="w-full h-full object-cover rounded-r-2xl"
          />
        </div>
      </div>

      {/* SHOPPING SECTION */}
      <div className="grid grid-cols-3 gap-4 justify-items-center">
        {products.map((product, index) => {
          const inCart = cart.find((p) => p.name === product.name);

          return (
            <div
              key={index}
              className="flex flex-col items-center justify-between h-auto m-8 bg-light-blue p-8 rounded-xl shadow-[2px_4px_18px_4px_rgba(0,0,0,0.09)] transition"
            >
              <div
                onClick={() => navigate(`/details/${index}`)}
                className="cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[20rem] w-[15rem] object-cover"
                />
              </div>

              <div className="flex items-center justify-between gap-4 mt-4 mb-2 w-full">
                <h2 className="font-semibold text-[1.2rem]">{product.name}</h2>
                <p className="text-[0.9rem] text-gray-600 font-semibold border border-gray-500 p-1 rounded-lg">
                  ${product.price}
                </p>
              </div>

              <div className=" mb-4">
                <p className="text-[1rem] text-gray-600">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center gap-4 mt-4 w-full">
                {!inCart ? (
                  <button
                    onClick={() => dispatch(addToCart(product))}
                    className="w-full px-[2rem] py-[1rem] bg-bodyText text-white text-[0.9rem] font-medium hover:font-semibold hover:bg-black rounded-full cursor-pointer"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-4 w-full">
                    <button
                      onClick={() => dispatch(decrementQuantity(product.id))}
                      className="h-[2rem] w-[2rem] bg-gray-300 text-[1.5rem] rounded-full leading-none cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-semibold">{inCart.quantity}</span>
                    <button
                      onClick={() => dispatch(incrementQuantity(product.id))}
                      className="h-[2rem] w-[2rem] bg-gray-300 text-[1.5rem] rounded-full leading-none cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
