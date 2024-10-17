import { Link } from "react-router-dom";

const Card = ({ imgUrl, title, description, id }) => {
  return (
    <div className="min-w-[60%] max-w-[100%] relative bg-white shadow-md rounded-xl">
      <img
        src={imgUrl}
        alt="image"
        className="w-full h-[200px] object-cover rounded-t-xl"
      />

      <Link to={`/form/${id}`}>
        <div className="p-4 cursor-pointer">
          <h1 className="text-[1.3rem] text-primary font-bold leading-[34px]">
            {title?.length > 50 ? `${title.slice(0, 20)}...` : title}
          </h1>
          <p className="text-[0.9rem] text-primary">
            {description?.length > 50
              ? `${description.slice(0, 65)}...`
              : description}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
