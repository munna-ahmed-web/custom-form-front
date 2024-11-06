import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getData } from "../../utils/apiService";
import { BeatLoader } from "react-spinners";
import Pagination from "../../components/pagination/Pagination";

const Jira = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const [ticketList, setTicketList] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setitemsPerPage] = useState(5);
  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await getData(
        `/ticket?startAt=${currentPage * itemsPerPage}&max=${itemsPerPage}`
      );
      setTicketList(response.data.data.issues);
      setTotalItems(response.data.data.total);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page - 1);
  };

  return (
    <div className="">
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
          <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-2">
              <div className="flex gap-x-3 py-3 w-9/12 mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 "></div>
              <table className="w-full mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Summary
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Reporter
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Priority
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      User Link
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        <div className="flex justify-center items-center">
                          <BeatLoader loading={loading} />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    ticketList.length > 0 &&
                    ticketList.map((ticket) => (
                      <tr
                        key={ticket.id}
                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="min-w-[200px] px-6 py-4 font-medium text-gray-900 whitespace-normal dark:text-white"
                        >
                          {ticket.fields.summary}
                        </th>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-normal dark:text-white"
                        >
                          {ticket.fields.reporter.displayName}
                        </th>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-normal dark:text-white"
                        >
                          {ticket.fields.priority.name}
                        </th>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-normal dark:text-white"
                        >
                          {ticket.fields.status.name}
                        </th>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-normal dark:text-white"
                        >
                          {ticket.fields.customfield_10040}
                        </th>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <div className="sticky bottom-0  flex justify-center items-center bg-white py-4 shadow ">
                <Pagination
                  currentPage={currentPage + 1}
                  handleChange={handlePageChange}
                  itemsPerPage={itemsPerPage}
                  totalItems={totalItems}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jira;
