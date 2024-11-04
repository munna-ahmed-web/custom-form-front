import { useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import { useParams } from "react-router-dom";
import { getUserInfoById } from "../../api/userRequest";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { createTicket } from "../../api/jiraRequest";

const initialState = {
  reportBy: "",
  title: "",
  description: "",
  priority: "",
  status: "",
  link: window.location.href,
};
const CreateTicket = () => {
  const [jiraState, setJiraState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { userId } = useParams();

  const handleChange = (e) => {
    setJiraState((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const link = await createTicket(jiraState);
      toast.success("Success");
      console.log(link);
    } catch (error) {
      toast.error("error");
      console.log(error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const { data } = await getUserInfoById(userId);
      setJiraState((prev) => {
        return {
          ...prev,
          reportBy: data.name || "",
          email: data.email || "",
        };
      });
    } catch (error) {
      toast.error("Can not get data. Please provide data manually");
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="flex justify-center">
        <h1 className="text-center mt-4 text-xl">Create Ticket</h1>
      </div>
      <div className="flex gap-x-3 py-3 w-9/12 mx-auto ">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="w-[50%] mx-auto">
            <div>
              <label className="block p-1">Reported By:</label>
              <input
                required
                type="text"
                name="reportBy"
                value={jiraState.reportBy}
                onChange={handleChange}
                className="border w-full p-2 rounded"
              />
            </div>
            <div>
              <label className="block p-1">Title</label>
              <input
                required
                type="text"
                name="title"
                value={jiraState.title}
                onChange={handleChange}
                className="border w-full p-2 rounded"
              />
            </div>
            <div>
              <div>
                <label className="block p-1">Description</label>
                <textarea
                  required
                  name="description"
                  value={jiraState.description}
                  onChange={handleChange}
                  className="border w-full p-2 rounded"
                  rows="4"
                />
              </div>
              <label className="block p-1">Priority:</label>
              <select
                required
                name="priority"
                value={jiraState.priority}
                onChange={handleChange}
                className="border w-full p-2 rounded"
              >
                <option value="">--Select Priority--</option>
                <option value="High">High</option>
                <option value="Average">Average</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label className="block p-1">Status:</label>
              <select
                required
                name="status"
                value={jiraState.status}
                onChange={handleChange}
                className="border w-full p-2 rounded"
              >
                <option value="">--Select Status--</option>
                <option value="Opened">Opened</option>
                <option value="In progress">In progress</option>
                <option value="Rejected">Rejected</option>
                <option value="Fixed">Fixed</option>
              </select>
            </div>
            <div>
              <BeatLoader size={17} loading={loading} />
            </div>
            <div className="mt-4">
              <button
                className="bg-primary px-3 py-2 rounded-md text-white hover:bg-[#39339e]"
                type="submit"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;
