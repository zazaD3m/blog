import NavItem from "./NavItem";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import { images } from "../constants";

const navItemsInfo = [
  { name: "Home", type: "link" },
  { name: "Articles", type: "link" },
  { name: "Pages", type: "dropdown", items: ["About us", "Contact us"] },
  { name: "Pricing", type: "link" },
  { name: "Faq", type: "link" },
];

const Header = () => {
  // state to open and close navbar in mobile view
  const [navIsVisible, setNavIsVisible] = useState(false);
  // state to dropdown pages item in nav
  const [dropDown, setDropDown] = useState(false);

  const navVisibilityHandler = () => {
    setNavIsVisible((curState) => !curState);
    if (dropDown) setDropDown(false);
  };

  const toggleDropDownHandler = () => {
    setDropDown((curState) => !curState);
  };

  return (
    <section className="sticky top-0 left-0 right-0 z-50">
      <header className="container mx-auto px-5 flex justify-between py-4 items-center">
        <div>
          <img className="w-16" src={images.Logo} alt="logo" />
        </div>
        <div className="lg:hidden z-50">
          {navIsVisible ? (
            <AiOutlineClose
              className="w-6 h-6"
              onClick={navVisibilityHandler}
            />
          ) : (
            <AiOutlineMenu className="w-6 h-6" onClick={navVisibilityHandler} />
          )}
        </div>
        <div
          className={`${
            navIsVisible ? "right-0" : "-right-full"
          } transition-all duration-300  mt-[56px] lg:mt-0 bg-dark-hard lg:bg-transparent z-[49] flex flex-col w-full lg:w-auto justify-center lg:justify-end lg:flex-row fixed  top-0 bottom-0 lg:static gap-x-9 items-center`}
        >
          <ul className="text-white lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold items-center gap-y-5 ">
            {navItemsInfo.map((item, i) => (
              <NavItem
                key={item.name + i}
                item={item}
                dropDown={dropDown}
                toggleDropDownHandler={toggleDropDownHandler}
              />
            ))}
          </ul>
          <button className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300">
            Sign in
          </button>
        </div>
      </header>
    </section>
  );
};
export default Header;
