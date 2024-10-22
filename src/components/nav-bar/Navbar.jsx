import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
// react icons
import { IoIosSearch } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";
import { IoIosArrowUp } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import { FaWpforms } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addUserInfo, logOutInfo } from "../../store/userInfoSlice";
import { navLinkData } from "../../data/data";
import { Link, NavLink, useNavigate } from "react-router-dom";

const ResponsiveNavbar = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo);
  const navigate = useNavigate();

  const logOut = () => {
    logOutInfo();
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      dispatch(addUserInfo(decodedToken));
    }
  }, []);

  return (
    <nav className="flex items-center justify-between w-full relative mt-3 px-6 mb-3">
      <Link to="/">
        <h1 className="font-bold h-8 cursor-pointer">Custom Form</h1>
      </Link>
      <ul className="items-center gap-[20px] text-[1rem] text-text lg:flex hidden">
        {navLinkData.map((item, idx) => {
          return (
            <li key={idx}>
              <NavLink
                to={item.link}
                className={({ isActive }) => {
                  return isActive
                    ? "border-b-[2px] border-transparent text-primary border-b-primary transition-all duration-500 cursor-pointer hover:text-primary hover:border-b-primary capitalize"
                    : "border-b-[2px] border-transparent transition-all duration-500 cursor-pointer hover:text-primary hover:border-b-primary capitalize";
                }}
              >
                {item.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
      {!user.name && (
        <div className="bg-primary text-white px-4 py-2 rounded-md cursor-pointer">
          <Link to="/login">Log in</Link>
        </div>
      )}

      <div className="flex items-center gap-[10px]">
        <div>
          <div
            className="flex items-center gap-[10px] cursor-pointer relative"
            onClick={() => setAccountMenuOpen(!accountMenuOpen)}
          >
            {user?.name && (
              <div className="relative">
                <img
                  src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?t=st=1724605498~exp=1724609098~hmac=7f6fc106bae2c17b0c93af1b2e5483d9d8368f3e51284aaec7c7d50590d2bae5&w=740"
                  alt="avatar"
                  className="w-[35px] h-[35px] rounded-full object-cover"
                />
                <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-[0px] right-0 border-2 border-white"></div>
              </div>
            )}
            <h1 className="text-[1rem] font-[400] text-gray-600 sm:block hidden">
              {user.name && user.name}
            </h1>

            <div
              className={`${
                accountMenuOpen
                  ? "translate-y-0 opacity-100 z-[1]"
                  : "translate-y-[10px] opacity-0 z-[-1]"
              } bg-white w-max rounded-md boxShadow absolute top-[45px] right-0 p-[10px] flex flex-col transition-all duration-300 gap-[5px]`}
            >
              <Link to={`/template/user/${user.id}`}>
                <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                  <FaWpforms />
                  Templates
                </p>
              </Link>
              <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                <IoSettingsOutline />
                Settings
              </p>
              <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                <FiUser />
                View Profile
              </p>

              <div className="mt-3 border-t border-gray-200 pt-[5px]">
                <p
                  onClick={logOut}
                  className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-red-500 hover:bg-red-50"
                >
                  <TbLogout2 />
                  Logout
                </p>
              </div>
            </div>

            <IoIosArrowUp
              className={`${
                accountMenuOpen ? "rotate-0" : "rotate-[180deg]"
              } transition-all duration-300 text-gray-600 sm:block hidden`}
            />
          </div>
        </div>

        <CiMenuFries
          className="text-[1.6rem] text-textc cursor-pointer lg:hidden flex"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />
      </div>

      <aside
        className={` ${
          mobileSidebarOpen
            ? "translate-x-0 opacity-100 z-20"
            : "translate-x-[200px] opacity-0 z-[-1]"
        } lg:hidden bg-primary p-4 text-center absolute top-[60px] right-0 w-full sm:w-[300px] rounded-md transition-all duration-300`}
      >
        <div className="w-full relative mb-5">
          <input
            className="py-1.5 pr-4 pl-12 w-full rounded-full outline-none focus:border-primary"
            placeholder="Search..."
          />
          <IoIosSearch className="absolute top-[9px] left-5 text-text text-[1.3rem]" />
        </div>
        <ul className="items-center gap-[20px] text-[1rem] text-white flex flex-col">
          {navLinkData.map((item, idx) => {
            return (
              <li key={idx + 11}>
                <NavLink
                  to={item.link}
                  className="hover:border-b-primary border-b-[2px] border-transparent transition-all duration-500 cursor-pointer capitalize"
                >
                  {item.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </aside>
    </nav>
  );
};

export default ResponsiveNavbar;
