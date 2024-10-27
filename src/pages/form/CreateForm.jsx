import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getTemplateById } from "../../api/templateRequest";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createForm, getFormById } from "../../api/formRequest";
import { createComment, getComment } from "../../api/commentRequest";
//icons
import { FaExternalLinkAlt } from "react-icons/fa";
import { hoursAgo } from "../../utils/utils";

const initialFormState = {
  template: "",
  user: "",
  answers: [],
};
const CreateForm = () => {
  const user = useSelector((state) => state.userInfo);
  const navigate = useNavigate();
  const [template, setTemplate] = useState("");
  const [formState, setFormState] = useState(initialFormState);
  const [answerList, setAnswerList] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentList, setCommentList] = useState([]);
  const { templateId } = useParams();

  const fetchComment = async () => {
    try {
      const res = await getComment(templateId);
      setCommentList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await getTemplateById(templateId);
        setTemplate(res.data);
        setFormState((prev) => {
          return {
            ...prev,
            template: res.data._id,
          };
        });
        fetchComment();
      } catch (error) {
        console.log(error);
      }
    };
    if (templateId) {
      fetchTemplate();
    }
  }, []);

  const handleFormChange = (e) => {
    const { name: question, value: answer } = e.target;

    setAnswerList((prev) => {
      // Check if the question already exists in the state
      const updatedAnswers = prev.map((item) =>
        item.question === question ? { ...item, answer } : item
      );

      // If the question is not found, add it to the list
      if (!updatedAnswers.find((item) => item.question === question)) {
        return [...prev, { question, answer }];
      }

      return updatedAnswers;
    });
  };

  const handleSubmit = async () => {
    if (!user.id) {
      return toast.error("You are not logged in user, Please log in");
    }
    if (!formState.template) {
      return toast.error("Invalid Template");
    }
    if (!answerList.length) {
      return toast.error("Please provide at least on answer");
    }
    const payload = {
      template: formState.template,
      user: user.id,
      answers: answerList,
    };
    try {
      await createForm(payload);
      toast.success("Thank you for fill up forms", { duration: 3000 });
      navigate("/");
    } catch (error) {
      toast.error("Something wrong. Try again later");
      console.log(error);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!user.id) {
      return toast.error("Please log in first");
    }
    if (!templateId) {
      return toast.error("Template is not available");
    }
    const payload = {
      template: templateId,
      user: user.id,
      text: commentText,
    };
    try {
      const res = await createComment(payload);
      setCommentText("");
      toast.success("Success");
      fetchComment();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div>
        <div className="flex justify-center">
          <h1 className="text-center mt-4 text-xl">Form Fill Up</h1>
        </div>
      </div>

      <div className="flex gap-x-3 py-3 w-9/12 mx-auto ">
        <div className="w-[85%] mx-auto">
          {template?._id && (
            <div className="flex justify-end items-center cursor-pointer hover:text-gray-500">
              <Link
                to={`/answer/${template._id}`}
                className="flex items-center gap-2"
              >
                Answers
                <FaExternalLinkAlt />
              </Link>
            </div>
          )}
          <div className="mt-3 bg-gray-200 p-5 rounded-md shadow-md">
            {template?.title && (
              <h1 className="text-lg font-bold pb-1">{template.title}</h1>
            )}
            {template?.description && <p>{template.description}</p>}
          </div>

          <div className="mt-3 bg-gray-200 p-5 rounded-md shadow-md">
            {template?.questions?.length &&
              template?.questions
                .filter((item) => item.isActive)
                .map((item) => {
                  return (
                    <div
                      className="border-2 p-2 border-gray-300 my-2 rounded-md"
                      key={item._id}
                    >
                      <label className="block p-1">{item.question}</label>
                      <input
                        name={item.question}
                        className="border w-full p-2 rounded"
                        type={item.type == "string" ? "text" : "number"}
                        onChange={handleFormChange}
                      />
                    </div>
                  );
                })}
            <div className="pt-2">
              <button
                className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>

          {/* -----------------------------comment section--------------------------------  */}
          <div className="mt-3 bg-gray-200 p-5 rounded-md shadow-md">
            <form onSubmit={handleSubmitComment}>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Leave a Comment
              </label>
              <div className="flex  items-center gap-4">
                <textarea
                  rows="3"
                  className="w-[70%] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                  placeholder="Type your comment..."
                  value={commentText}
                  required
                  onChange={(e) => setCommentText(e.target.value)}
                />

                <div>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
            {/* -------------------Comment list------------------------- */}
            <div className="mt-2">
              {commentList.length ? (
                commentList.map((item) => {
                  return (
                    <div class="max-w-full border px-6 py-2 rounded-lg bg-gray-100 mb-1">
                      <div class="flex items-center mb-2">
                        <img
                          src="https://randomuser.me/api/portraits/men/97.jpg"
                          alt="Avatar"
                          class="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                          <div class="text-lg font-medium text-gray-800">
                            {item.user.name}
                          </div>
                          <div class="text-gray-500">
                            {hoursAgo(item.createdAt)}
                          </div>
                        </div>
                      </div>
                      <p class="text-lg leading-relaxed">{item.text}</p>
                    </div>
                  );
                })
              ) : (
                <p class="text-lg leading-relaxed">
                  Comments are not available for this template
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
