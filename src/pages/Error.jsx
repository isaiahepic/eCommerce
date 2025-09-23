import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-xl mt-4">Oops! Page not found.</p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-black text-white rounded-full hover:scale-105 transition"
      >
        Go Home
      </button>
    </div>
  );
};

export default Error;
