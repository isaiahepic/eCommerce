import { useNavigate } from "react-router-dom";
import cart from "@/assets/cart.png";
import logo from "@/assets/logo.png";
import user1 from "@assets/user.png";
import user2 from "@assets/user1.png";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute fixed top-0 index-20 w-full bg-white flex justify-between items-center py-4 px-8 h-[6rem]">
      <div className="cursor-pointer">
        <img
          src={logo}
          alt="Logo"
          className="h-[4rem] w-auto"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>

      <div className="flex items-center gap-[1rem] font-medium">
        <div className="flex items-center gap-[0.5rem] bg-black py-2 px-4 rounded-full cursor-pointer hover:scale-105 transition">
          <img src={cart} alt="Cart" className="w-[1.5rem] h-[1.5rem]" />
          <p className="text-white text-[1rem]">Shop Now</p>
        </div>

        <div className="flex items-center gap-[0.5rem] bg-black py-2 px-4 rounded-full cursor-pointer hover:scale-105 transition">
          <img src={user1} alt="Cart" className="w-[1.5rem] h-[1.5rem]" />
          <p className="text-white text-[1rem]">Sign In</p>
        </div>

        <div className="flex items-center gap-[0.5rem] bg-black py-2 px-4 rounded-full cursor-pointer hover:scale-105 transition">
          <img src={user2} alt="Cart" className="w-[1.5rem] h-[1.5rem]" />
          <p className="text-white text-[1rem]">Create Account</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
