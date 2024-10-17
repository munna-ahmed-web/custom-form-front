import { IoIosSearch } from "react-icons/io";
const SearchSection = ({ handleChange, value }) => {
  return (
    <div className=" flex justify-between items-center lg:flex mx-auto py-1">
      <div>
        <h1>Templates List</h1>
      </div>
      <div className="relative">
        <IoIosSearch className="absolute top-[9px] left-3 text-text text-[1.3rem]" />
        <input
          className="py-1.5 pr-4 border border-text pl-10 rounded-full outline-none focus:border-primary"
          placeholder="Search..."
          onChange={handleChange}
          value={value}
        />
      </div>
    </div>
  );
};

export default SearchSection;
