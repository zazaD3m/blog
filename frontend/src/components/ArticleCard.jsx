import { BsCheckLg } from "react-icons/bs";

import { images } from "../constants";

const ArticleCard = ({ className }) => {
  return (
    <div
      className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className}`}
    >
      <img
        className="w-full object-cover object-center h-auto"
        src={images.Post1Image}
        alt="title"
      />
      <div className="p-5">
        <h2 className="font-roboto font-bold text-xl text-dark-soft">
          Future of Work
        </h2>
        <p className="text-dark-light mt-3 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing.
        </p>
        <div className="flex justify-between flex-nowrap items-center mt-6">
          <div className="flex items-center gap-x-2">
            <img src={images.Post1ProfileImage} alt="" />
            <div className="flex flex-col">
              <h4 className="font-bold italic text-dark-soft text-sm">
                Lorem, ipsum.
              </h4>
              <div className="flex items-center gap-x-2">
                <span className="bg-[#36B37E] w-fit bg-opacity-20 p-1.5 rounded-full">
                  <BsCheckLg className="w-1.5 h-1.5 text-[#36B37E]" />
                </span>
                <span className="italic text-dark-light text-xs ">
                  Verified writer
                </span>
              </div>
            </div>
          </div>
          <span className="font-bold text-dark-light italic text-sm">
            02 May
          </span>
        </div>
      </div>
    </div>
  );
};
export default ArticleCard;
