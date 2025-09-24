import { useLayoutEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from "@/store/cartSlice";
import data from "../../Data.json";
import { useDispatch, useSelector } from "react-redux";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const page = query.get("page") || 1;

  const cart = useSelector((state) => state.cart.items);
  const product = data.Items.find((item) => String(item.id) === String(id));

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product)
    return (
      <div className="text-center py-[7rem] min-h-[calc(100vh-6rem)] flex flex-col justify-center items-center gap-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(`/?page=${page}`)}
          className="mb-8 px-4 py-2 border border-gray-400 rounded-full hover:bg-gray-200 transition cursor-pointer"
        >
          ← Back
        </button>
        <div>
          <p>Product not found</p>
        </div>
      </div>
    );

  const inCart = cart.find((item) => item.id === product.id);

  return (
    <div className="px-8 lg:px-20 py-[7rem] min-h-[calc(100vh-6rem)]">
      <button
        onClick={() => navigate(`/?page=${page}`)}
        className="mb-8 px-4 py-2 border border-gray-400 rounded-full hover:bg-gray-200 transition cursor-pointer"
      >
        ← Back
      </button>

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
        <div className="flex-1 flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="h-[28rem] w-auto object-cover rounded-2xl shadow-[2px_4px_18px_4px_rgba(0,0,0,0.09)]"
          />
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-lg text-gray-600">{product.description}</p>
          <p className="text-2xl font-semibold text-black">${product.price}</p>

          {/* Add to Cart / Increment-Decrement */}
          {!inCart ? (
            <button
              onClick={() => dispatch(addToCart(product))}
              className="px-6 py-3 bg-bodyText hover:bg-black text-white rounded-full hover:scale-105 transition w-max cursor-pointer"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center gap-4 mt-2">
              <button
                onClick={() => dispatch(decrementQuantity(product.id))}
                className="h-[2.5rem] w-[2.5rem] bg-gray-300 text-[1.5rem] rounded-full leading-none flex items-center justify-center cursor-pointer hover:bg-gray-400"
              >
                -
              </button>
              <span className="text-lg font-semibold">{inCart.quantity}</span>
              <button
                onClick={() => dispatch(incrementQuantity(product.id))}
                className="h-[2.5rem] w-[2.5rem] bg-gray-300 text-[1.5rem] rounded-full leading-none flex items-center justify-center cursor-pointer hover:bg-gray-400"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
