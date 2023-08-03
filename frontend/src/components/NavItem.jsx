import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

const NavItem = ({ item, toggleDropDownHandler, dropDown }) => {
  return (
    <li className="relative group">
      {item.type === "link" ? (
        <>
          <a href="/" className="px-4 py-2">
            {item.name}
          </a>
          <span className="cursor-pointer text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100">
            /
          </span>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <button
            className="px-4 py-2 flex gap-x-1 items-center"
            onClick={toggleDropDownHandler}
          >
            <span>{item.name}</span>
            {dropDown ? (
              <>
                <MdArrowDropUp className="lg:hidden" />
                <MdArrowDropDown className="hidden lg:block" />
              </>
            ) : (
              <MdArrowDropDown />
            )}
          </button>
          <div
            className={`${
              dropDown ? "block" : "hidden"
            } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max `}
          >
            <ul className="bg-dark-soft lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden ">
              {item.items.map((page, index) => (
                <a
                  key={page + index}
                  href="/"
                  className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft "
                >
                  {page}
                </a>
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
};
export default NavItem;
