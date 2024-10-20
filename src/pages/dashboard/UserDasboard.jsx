import React, { useEffect, useState } from "react";
import useFetchState from "../../hooks/useFetchState";
import { BeatLoader } from "react-spinners";
import { MdDelete } from "react-icons/md";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import useDelete from "../../hooks/useDelete";
import toast from "react-hot-toast";
import http from "../../utils/http";

const UserDasboard = () => {
  const [usersList, setUsersList] = useState([]);
  const { dataState, getDataHandler } = useFetchState();
  const { deleteHandler } = useDelete();

  const fetchUsers = async () => {
    try {
      const response = await getDataHandler("/users");
      console.log(response.data);
      setUsersList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (user) => {
    const id = user._id;
    const toastId = toast.loading("Deleting...");
    try {
      const response = await deleteHandler(`/users/${id}`);
      toast.dismiss(toastId);
      toast.success("Deleted successfully");
      console.log(response);
      fetchUsers();
    } catch (error) {
      toast.dismiss(toastId);
      console.log(error);
      toast.error("Something wrong! try again later");
    }
  };

  const changeAdmin = async (user) => {
    const id = user._id;
    const payload = {
      adminStatus: !user.isAdmin,
    };

    const toastId = toast.loading("Loading...");
    try {
      const { data } = await http.patch(`/users/${id}`, payload);
      toast.dismiss(toastId);
      toast.success("Updated successfully");
      fetchUsers();
    } catch (error) {
      toast.dismiss(toastId);
      console.log(error);
      toast.error("Something wrong! try again later");
    }
  };
  const changeStatus = async (user) => {
    const id = user._id;
    const payload = {
      activeStatus: !user.isActive,
    };

    const toastId = toast.loading("Loading...");
    try {
      const { data } = await http.patch(`/users/${id}`, payload);
      toast.dismiss(toastId);
      toast.success("Updated successfully");
      fetchUsers();
    } catch (error) {
      toast.dismiss(toastId);
      console.log(error);
      toast.error("Something wrong! try again later");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-2">
        <div className="flex gap-x-3 py-3 w-9/12 mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 "></div>
        <table className="w-9/12 mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Admin
              </th>
              <th scope="col" className="px-6 py-3">
                Disable
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {usersList.length > 0 &&
              usersList.map((user) => (
                <tr
                  key={user.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.name}
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    {user.isAdmin ? "Admin" : "User"}
                  </td>
                  <td className="px-6 py-4">
                    {user.isActive ? "Active" : "Disabled"}
                  </td>
                  <td className="px-6 py-4">
                    {user.isAdmin ? (
                      <button
                        className="cursor-pointer px-3"
                        onClick={() => changeAdmin(user)}
                      >
                        <FaToggleOn size={25} className=" text-green-400" />
                      </button>
                    ) : (
                      <button
                        className="cursor-pointer px-3"
                        onClick={() => changeAdmin(user)}
                      >
                        <FaToggleOff size={25} />
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {user.isActive ? (
                      <button
                        className="cursor-pointer px-3"
                        onClick={() => changeStatus(user)}
                      >
                        <FaToggleOff size={25} />
                      </button>
                    ) : (
                      <button
                        className="cursor-pointer px-3"
                        onClick={() => changeStatus(user)}
                      >
                        <FaToggleOn size={25} className="text-red-400" />
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="cursor-pointer px-3"
                      onClick={(e) => handleDelete(user)}
                    >
                      <MdDelete size={25} className="text-red-500 " />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center my-4">
          <BeatLoader loading={dataState.loading} size={12} />
        </div>
      </div>
    </div>
  );
};

export default UserDasboard;
