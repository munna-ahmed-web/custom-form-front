import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getFormsByTemplate, getFormsByUserId } from "../../api/formRequest";

const Answers = () => {
  const { templateId, userId } = useParams();
  const [answersList, setAnswersList] = useState([]);
  useEffect(() => {
    const fetchAnswersList = async () => {
      const loadId = toast.loading("Loading...");
      try {
        if (userId) {
          const res = await getFormsByUserId(userId);
          toast.dismiss(loadId);
          return setAnswersList(res.data);
        }
        const res = await getFormsByTemplate(templateId);
        toast.dismiss(loadId);
        setAnswersList(res.data);
      } catch (error) {
        toast.dismiss(loadId);
        toast.error("Something wrong while fetching forms");
        console.log(error);
      }
    };

    fetchAnswersList();
  }, [templateId, userId]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-center">
        <h1 className="text-center mt-4 text-xl">Pre Filled Answers</h1>
      </div>
      <div className=" py-3 w-9/12 mx-auto">
        {answersList.length ? (
          answersList?.map((item) => {
            return (
              <div className="w-[85%] mx-auto border-2 p-2 mb-2">
                {userId && (
                  <p className="p-1 font-bold">
                    Template: {item.template.title}
                  </p>
                )}
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
          })
        ) : (
          <div className="flex justify-center items-center mt-5 text-red-800 font-bold text-lg">
            <p>There is no prefilled answer. You can start</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Answers;
