import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getFormsByTemplate } from "../../api/formRequest";

const Answers = () => {
  const { templateId } = useParams();
  const [answersList, setAnswersList] = useState([]);
  useEffect(() => {
    const fetchAnswersList = async () => {
      try {
        const res = await getFormsByTemplate(templateId);
        setAnswersList(res.data);
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    if (templateId) {
      fetchAnswersList();
    }
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-center">
        <h1 className="text-center mt-4 text-xl">Pre Filled Answers</h1>
      </div>
      <div className="flex gap-x-3 py-3 w-9/12 mx-auto">
        {answersList?.map((item) => {
          return (
            <div className="w-[85%] mx-auto border-2 p-2 mb-2">
              <p className="p-1 font-bold">Answered by: {item.user.name}</p>
              <hr />
              <div>
                {item.answers?.map((singleAns) => {
                  return (
                    <div>
                      <p>
                        Question:
                        <span className="ml-1">{singleAns.question}</span>
                      </p>
                      <p>
                        Answer:
                        <span className="ml-1">{singleAns.answer}</span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Answers;
