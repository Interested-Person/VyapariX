import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

const Account = () => {
  const { user, isLoggedIn, logOut } = useAuth();
  const navigate = useNavigate();




  if (!isLoggedIn) {
    navigate(-1);
  }




  return (
    <div className="flex items-center justify-center min-h-screen bg-teal-900 text-white px-4">
      <div className="bg-teal-800 p-6 rounded-2xl shadow-xl w-full max-w-md text-center space-y-4">
        <h1 className="text-2xl font-semibold">Your Account</h1>

        <img
          src={user?.pfpUrl || "/default-avatar.png"}
          referrerPolicy="no-referrer"
          loading="lazy"
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-teal-500 shadow-lg"
        />

        <div className="text-lg font-medium">{user?.username || "Anonymous"}</div>
        <div className="">
          {user?.isMerchant ? (
            <button
              onClick={() => navigate("/merchant")}
              className="mt-4 bg-teal-600 hover:bg-teal-500 text-white font-medium py-2 px-6 rounded-full transition-transform hover:scale-105"
            >
              Merchant Portal
            </button>
          ) : "Customer"}
        </div>

        {isLoggedIn && (
          <button
            onClick={() => logOut()}
            className="mt-4 bg-teal-600 hover:bg-teal-500 text-white font-light py-2 px-6 rounded-full transition-transform hover:scale-105"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Account;
