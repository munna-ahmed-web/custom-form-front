import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getTemplateById } from "../../api/templateRequest";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createForm } from "../../api/formRequest";

//icons
import { FaExternalLinkAlt } from "react-icons/fa";

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
  const { templateId } = useParams();

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
  console.log(template);
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-center">
        <h1 className="text-center mt-4 text-xl">Form Fill Up</h1>
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
              <h1 className="text-lg font-bold pb-1">{template?.title}</h1>
            )}
            {template?.description && <p>{template?.description}</p>}
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
                className="bg-gray-500 px-3 py-2 rounded-md text-white hover:bg-gray-400 mr-3"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
