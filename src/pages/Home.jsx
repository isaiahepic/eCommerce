import person from "@assets/person.png";
import data from "../../Data.json";
import coke from "@assets/coke.jpg";

const Home = () => {
  const products = data.Items;

  return (
    <div>
      {/* HERO SECTION */}
      <div className="min-h-[calc(100vh-6rem)] my-[6rem] rounded-lg mx-8 bg-custom-black flex justify-between items-center text-white">
        <div className="">
          <img src={person} alt="Person" className="h-[35rem] w-[60rem]" />
        </div>

        <div className="flex flex-col gap-[2rem]">
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
      </div>

      {/* SHOPPING SECTION */}
      <div className="grid grid-cols-3 gap-4 justify-items-center">
        {products.map((product, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-between h-auto m-8 bg-light-blue p-8 rounded-xl hover:shadow-xl transition cursor-pointer"
            >
              <div>
                <img
                  // src={product.image}
                  src={coke}
                  alt={product.name}
                  className="h-[20rem] w-[15rem] object-cover"
                />
              </div>

              <div className="flex items-center justify-between gap-4 mt-4 mb-2 w-full">
                <h2 className="font-semibold text-[1.2rem]">{product.name}</h2>
                <p className="text-[0.9rem] text-gray-600 border border-gray-500 p-1 rounded-lg">
                  ${product.price}
                </p>
              </div>

              <div className=" mb-4">
                <p className="text-[1rem] text-gray-600">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center gap-4 mt-4 w-full">
                <button className="w-full px-[2rem] py-[1rem] bg-custom-black text-white text-[0.9rem] font-medium hover:font-semibold rounded-full cursor-pointer">
                  Buy Now
                </button>
                <button className="w-full px-[2rem] py-[1rem] bg-bodyText text-white text-[0.9rem] font-medium hover:font-semibold rounded-full cursor-pointer">
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
