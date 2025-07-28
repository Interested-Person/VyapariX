import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useProducts } from "../hooks/useProducts";
import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid"; // for cross icon

const Navbar = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { searchProducts, isSearch, setIsSearch } = useProducts();
  const [searchText, setSearchText] = useState("");

  // Debounced search effect
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchText.trim() !== "") {
        setIsSearch(true);
        searchProducts(searchText);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchText]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (e.target.value.trim() === "") {
      setIsSearch(false);
    }
  };

  const clearSearch = () => {
    setSearchText("");
    setIsSearch(false);
  };

  return (
    <>
      <nav className="select-none bg-teal-900 h-16 flex items-center justify-between text-white px-3">
        <span
          className="hover:scale-105 cursor-pointer mr-4 flex items-center gap-2 text-teal-100 text-xs"
          onClick={() => navigate("/")}
        >
          <img src={Logo} className="h-18 md:h-16" alt="" />
          <span className="absolute hidden md:block top-12  text-xs font-bold">
            {user?.isMerchant ? "for Merchants" : ""}
          </span>
        </span> {/* logo */}

        <div className="relative w-40 sm:w-60 md:w-80 ">

          <input
            type="text"
            value={searchText}
            onChange={handleChange}
            className="rounded-md bg-white w-40 h-12 md:w-full text-gray-700 outline-0 p-2 px-5"
            placeholder="What's on your mind today?"
          />
          {isSearch && (
            <XMarkIcon
              onClick={clearSearch}
              className="h-5 w-5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:text-red-500"
            />
          )}
        </div> {/*search bar*/}

        <div className="flex items-center justify-between">
          {!isLoggedIn && (
            <span
              className="mx-2 bg-teal-600 p-2 cursor-pointer hover:scale-105 rounded-md"
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>
          )}

          {isLoggedIn && <div className=" hidden md:block mx-2">{user?.username}</div>}
          {isLoggedIn && (
            <img
              className="rounded-full mx-2 w-12 h-12 cursor-pointer hover:scale-105 hover:outline-1"
              referrerPolicy="no-referrer"
              loading="lazy"
              src={user?.pfpUrl}
              onClick={() => navigate("/account")}
            />
          )}

          <ShoppingCartIcon
            className="text-teal-400 h-10 mx-2 cursor-pointer hover:scale-105"
            onClick={() => navigate("/cart")}
          /> {/* cart icon */}
        </div> {/*profile pic and cart icon*/}

      </nav>
      <nav className="bg-teal-700 w-full h-8"></nav>
    </>
  );
};

export default Navbar;
