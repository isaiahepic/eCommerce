import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from "@/store/cartSlice";
import person from "@assets/ladyWithDrink.jpg";
import data from "../../Data.json";

const Home = () => {
  const products = data.Items;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const shopSectionRef = useRef(null);

  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get("page") || "1", 10);
  const cart = useSelector((state) => state.cart.items);

  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    if (location.pathname === "/" && !location.search) {
      setCurrentPage(1);
    }
  }, [location.pathname, location.search]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (currentPage === 1) {
      navigate("/", { replace: true });
    } else {
      params.set("page", currentPage);
      navigate(`/?${params.toString()}`, { replace: true });
    }

    if (currentPage !== 1 && shopSectionRef.current) {
      shopSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage, navigate]);

  // pagination
  const itemsPerPage = 6;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Calculate current pagination block (5 pages each)
  const blockSize = 5;
  const currentBlock = Math.floor((currentPage - 1) / blockSize);
  const startPage = currentBlock * blockSize + 1;
  const endPage = Math.min(startPage + blockSize - 1, totalPages);

  // Handle scroll to shop section
  const handleScrollToShopSection = () => {
    if (shopSectionRef.current) {
      shopSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="pb-[3rem]">
      {/* HERO SECTION */}
      <div className="h-[calc(100vh-6rem)] mt-[6rem] bg-custom-black flex justify-between items-center text-white">
        <div className="flex flex-col justify-center gap-[2rem] w-1/2 pl-[3rem] py-[2rem] bg-[url('./assets/drink-pouring.gif')] bg-no-repeat bg-center bg-cover h-full">
          <h1 className="font-semibold text-[3rem] tracking-[-0.02em] leading-[3.5rem]">
            Drinks That Define Your Taste
          </h1>
          <p className="font-normal text-[1.2rem] w-[80%]">
            Handpicked beverages crafted for every mood, every moment. Chill,
            celebrate, or simply refresh - we've got you covered.
          </p>
          <button
            onClick={handleScrollToShopSection}
            className="border border-white w-max py-[1rem] px-[3rem] rounded-full hover:bg-white hover:text-black transition font-semibold cursor-pointer"
          >
            Shop Now
          </button>
        </div>

        <div className="w-1/2 h-full flex items-center justify-center bg-[#2a9444]/70">
          <img
            src={person}
            alt="Person"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* WHY CHOOSE US SECTION */}
      <div className="relative h-screen flex items-center justify-center">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('./assets/party.jpg')] bg-cover bg-center"></div>

        {/* Overlay to dim the background */}
        <div className="absolute inset-0 bg-[#2a9444]/60"></div>

        <div className="relative z-10 p-[4rem] flex flex-col items-center justify-center gap-[2rem]">
          <h2 className="text-center text-[2.5rem] font-semibold mb-4 text-white">
            Why Choose Us?
          </h2>
          <p className="text-center text-gray-100 mb-12">
            We're not just about drinks - we're about delivering an experience
            that keeps you coming back.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-[#2a9444] backdrop-blur-sm rounded-2xl text-white">
              <h3 className="text-[1.2rem] font-bold mb-3">Premium Quality</h3>
              <p className="text-[0.9rem]">
                Every product in our catalog is carefully selected to ensure
                freshness, flavor, and satisfaction.
              </p>
            </div>

            <div className="p-6 bg-[#2a9444] backdrop-blur-sm rounded-2xl text-white">
              <h3 className="text-[1.2rem] font-bold mb-3">Fast Delivery</h3>
              <p className="text-[0.9rem]">
                Your favorite drinks, delivered right to your doorstep in no
                time.
              </p>
            </div>

            <div className="p-6 bg-[#2a9444] backdrop-blur-sm rounded-2xl text-white">
              <h3 className="text-[1.2rem] font-bold mb-3">
                Affordable Prices
              </h3>
              <p className="text-[0.9rem]">
                Enjoy premium beverages without breaking the bank—taste luxury
                at everyday prices.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SHOPPING SECTION */}
      <div
        ref={shopSectionRef}
        className="flex flex-col gap-[1rem] pt-[6rem] bg-[#2a9444]/40"
      >
        <div className="flex flex-col justify-center items-center gap-[0.5rem]">
          <h2 className="font-semibold text-[2.5rem] mb-2 ">
            Shop Our Products
          </h2>
          <p className="text-gray-600 text-[1rem] font-normal">
            Explore our diverse range of beverages, from classic favorites to
            unique blends. Find your perfect drink today!
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 justify-items-center">
          {paginatedProducts.map((product, index) => {
            const inCart = cart.find((p) => p.id === product.id);

            return (
              <div
                key={index}
                className="flex flex-col items-center justify-between h-auto m-8 bg-light-blue p-8 rounded-xl shadow-[2px_4px_18px_4px_rgba(0,0,0,0.09)] transition"
              >
                <div
                  onClick={() =>
                    navigate(`/details/${product.id}?page=${currentPage}`)
                  }
                  className="cursor-pointer overflow-hidden"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-[12rem] w-auto object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 mt-4 mb-2 w-full">
                  <h2 className="font-semibold text-[1.2rem]">
                    {product.name}
                  </h2>
                  <p className="text-[0.9rem] text-gray-600 font-semibold border border-gray-500 p-1 rounded-lg">
                    ₦{product.price}
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
                      className="w-full px-[2rem] py-[1rem] bg-[#2a9444]/80 hover:bg-[#2a9444] text-white text-[0.9rem] font-medium hover:font-semibold rounded-full cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center justify-center gap-4 w-full">
                      <button
                        onClick={() => dispatch(decrementQuantity(product.id))}
                        className="h-[2rem] w-[2rem] bg-gray-300 text-[1.5rem] rounded-full leading-none cursor-pointer "
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

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-[2rem] mt-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 border rounded disabled:opacity-50 ${
            currentPage === 1
              ? "cursor-not-allowed"
              : "cursor-pointer hover:bg-[#2a9444] hover:text-white"
          }`}
        >
          Prev
        </button>

        <div className="flex items-center gap-[0.5rem]">
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
            const pageNum = startPage + i;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 border rounded-full cursor-pointer ${
                  currentPage === pageNum ? "bg-[#2a9444] text-white" : ""
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <span className="ml-2 text-[1.2rem] font-medium">
            of {totalPages}
          </span>
        </div>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`px-3 py-1 border rounded disabled:opacity-50 ${
            currentPage === totalPages
              ? "cursor-not-allowed"
              : "cursor-pointer hover:bg-[#2a9444] hover:text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
