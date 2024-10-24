import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaToggleOn } from "react-icons/fa6";
import { FaToggleOff } from "react-icons/fa6";
import { deleteTemplate, updateTemplate } from "../../api/templateRequest";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

//icons
import { FaExternalLinkAlt } from "react-icons/fa";

const TemplateTableList = ({ templateList = [], fetchTemplate }) => {
  const navigate = useNavigate();
  const handleStatusChange = async (template) => {
    const currentStatus = template.isPublic;
    const payload = { isPublic: !currentStatus };
    const id = template._id;
    const loadId = toast.loading("Updating...");
    try {
      const res = await updateTemplate(id, payload);
      toast.dismiss(loadId);
      toast.success("Success");
      fetchTemplate();
    } catch (error) {
      toast.dismiss(loadId);
      console.log(error);
    }
  };
  const handleDelete = async (template) => {
    const id = template._id;
    const loadId = toast.loading("deleting...");
    try {
      await deleteTemplate(id);
      toast.dismiss(loadId);
      toast.success("deleted successfully");
      fetchTemplate();
    } catch (error) {
      toast.dismiss(loadId);
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  const handleEdit = (template) => {
    const id = template._id;
    navigate(`/template/create/${id}`);
  };
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-2">
        <div className="flex gap-x-3 py-3 w-9/12 mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 "></div>
        <table className="w-9/12 mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Total Question
              </th>
              <th scope="col" className="px-6 py-3">
                Form
              </th>
              <th scope="col" className="px-6 py-3">
                Public
              </th>

              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {templateList.length > 0 &&
              templateList.map((template) => (
                <tr
                  key={template.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {template.title}
                  </th>
                  <td className="px-6 py-4">
                    {template.description.length > 30
                      ? `${template.description.slice(0, 30)}...`
                      : template.description}
                  </td>
                  <th
                    scope="row"
                    className="py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {template.questions.length}
                  </th>
                  <th
                    scope="row"
                    className="py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Link
                      to={`/answer/${template._id}`}
                      className="flex items-center gap-2"
                    >
                      Answers
                      <FaExternalLinkAlt />
                    </Link>
                  </th>
                  <td className="px-6 py-4 cursor-pointer">
                    {template.isPublic ? (
                      <FaToggleOn
                        onClick={() => handleStatusChange(template)}
                        className="text-green-400"
                        size={25}
                      />
                    ) : (
                      <FaToggleOff
                        onClick={() => handleStatusChange(template)}
                        className="text-red-500"
                        size={25}
                      />
                    )}
                  </td>

                  <td className="px-6 py-4 flex items-center space-x-4">
                    <MdDelete
                      className="cursor-pointer text-red-500"
                      size={25}
                      onClick={() => handleDelete(template)}
                    />
                    <FaEdit
                      className="cursor-pointer "
                      size={22}
                      onClick={() => handleEdit(template)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* <div className="flex justify-center items-center my-4">
          <BeatLoader loading={dataState.loading} size={12} />
        </div> */}
      </div>
    </div>
  );
};

export default TemplateTableList;
