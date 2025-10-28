import drinks from "@/assets/drinks.jpg";

const About = () => {
  return (
    <div className="w-full h-screen mt-[6rem] flex items-center text-left text-[#2a9444]">
      <div className="h-full w-3/5 flex flex-col justify-center items-start px-[3rem]">
        <h1 className="text-[3rem] font-bold mb-6">About Us</h1>
        <p className="text-[1rem] leading-relaxed mb-6">
          At <span className="font-semibold">Drink Factory</span>, we believe
          that every drink tells a story. From the refreshing chill of a
          sparkling soda to the bold richness of a crafted cocktail, beverages
          are more than thirst-quenchers - they're experiences that bring people
          together.
        </p>
        <p className="text-[1rem] leading-relaxed mb-6">
          Our mission is simple: to handpick and deliver drinks that fit every
          mood, every occasion, and every lifestyle. Whether you're celebrating
          a milestone, hosting friends, or simply unwinding after a long day,
          our collection is designed to be as versatile and vibrant as you are.
        </p>
        <p className="text-[1rem] leading-relaxed">
          We're more than just a shop. We're a community of drink enthusiasts
          dedicated to making your moments unforgettable. Thank you for choosing
          us to be part of your story. Here's to great taste, great company, and
          great memories.
        </p>
      </div>

      <div className=" h-full w-2/5">
        <img src={drinks} alt="drinks" className="object-cover w-full h-full" />
      </div>
    </div>
  );
};

export default About;
