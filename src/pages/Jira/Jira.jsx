import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Jira = () => {
  const userInfo = useSelector((state) => state.userInfo);
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-[70%] mx-auto">
        <div className="pt-5 flex justify-center items-center">
          <h1 className="font-bold">JIRA Management</h1>
        </div>
        <div className="pt-5 flex justify-end items-center">
          <Link
            to={`/ticket-create/${userInfo.id}`}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Create Ticket
          </Link>
        </div>
        <div>
          <h3>Ticket list will be shown here</h3>
        </div>
      </div>
    </div>
  );
};

export default Jira;
