import { useParams } from "react-router-dom";
import data from "../../Data.json";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";

const Details = () => {
  const { id } = useParams();
  const product = data.Items[id];
  const dispatch = useDispatch();

  if (!product) return <div>Product not found</div>;

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <img
        src={product.image}
        alt={product.name}
        className="h-[25rem] w-auto object-cover"
      />
      <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
      <p className="text-lg text-gray-600 mt-2">{product.description}</p>
      <p className="text-xl font-semibold mt-2">${product.price}</p>
      <button
        onClick={() => dispatch(addToCart(product))}
        className="mt-6 px-6 py-3 bg-black text-white rounded-full hover:scale-105 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Details;
