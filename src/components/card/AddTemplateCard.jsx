import { Link } from "react-router-dom";

const AddTemplateCard = ({ imgUrl, title, description }) => {
  return (
    <div className="min-w-[60%] max-w-[100%] relative bg-white shadow-md rounded-xl">
      <img
        src={imgUrl}
        alt="image"
        className="w-full h-[200px] object-cover rounded-t-xl"
      />

      <Link to="/template/create">
        <div className="p-4 cursor-pointer">
          <h1 className="text-[1.1rem] text-gray-600 font-bold leading-[20px]">
            {title?.length > 20 ? `${title.slice(0, 20)}...` : title}
          </h1>
          <p className="text-[0.9rem] text-gray-600">
            {description?.length > 50
              ? `${description.slice(0, 65)}...`
              : description}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default AddTemplateCard;
