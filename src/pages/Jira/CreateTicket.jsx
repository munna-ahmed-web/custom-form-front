import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserInfoById } from "../../api/userRequest";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { createTicket } from "../../api/jiraRequest";
import { getData } from "../../utils/apiService";

const initialState = {
  name: "",
  title: "",
  description: "",
  priority: "",
  status: "",
  link: window.location.href,
};
const CreateTicket = () => {
  const [jiraState, setJiraState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [priorityList, setPriorityList] = useState([]);
  const [ticketUrl, setTicketUrl] = useState("");
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
      setTicketUrl("");
      setLoading(true);
      const response = await createTicket(jiraState);
      toast.success("Successfully created");
      setLoading(false);
      setTicketUrl(response.data.data.self);
      setJiraState((prev) => {
        return {
          ...prev,
          title: "",
          description: "",
        };
      });
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const { data } = await getUserInfoById(userId);
      setJiraState((prev) => {
        return {
          ...prev,
          name: data.name || "",
          email: data.email || "",
        };
      });
    } catch (error) {
      toast.error("Can not get data. Please provide data manually");
      console.log("error", error);
    }
  };

  const fetchPriorityList = async () => {
    try {
      const res = await getData("/priority");
      setPriorityList(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchPriorityList();
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="flex justify-center">
        <h1 className="text-center mt-4 text-xl">Create Ticket</h1>
      </div>
      <div className="py-3 w-9/12 mx-auto ">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="w-full mx-auto lg:w-[50%]">
            <div>
              <label className="block p-1">Summary</label>
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
                {priorityList.length &&
                  priorityList.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div>
              <BeatLoader size={17} loading={loading} />
            </div>
            <div className="mt-4">
              <button
                className="bg-primary px-4 py-2 rounded-md text-white hover:bg-[#39339e]"
                type="submit"
              >
                Create
              </button>
            </div>
          </div>
        </form>
        {ticketUrl && (
          <div class="p-4 mt-5 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
            <p class="text-gray-700 font-semibold mb-2">Your ticket link:</p>
            <a
              href={ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 font-medium underline break-all cursor-pointer"
            >
              {ticketUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTicket;
