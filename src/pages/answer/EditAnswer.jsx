import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getFormById, updateForm } from "../../api/formRequest";

const EditAnswer = () => {
  const { id } = useParams();
  const [answersList, setAnswersList] = useState([]);

  const fetchAnswersList = async () => {
    const loadId = toast.loading("Loading...");
    try {
      const res = await getFormById(id);
      toast.dismiss(loadId);
      setAnswersList(res.data);
    } catch (error) {
      toast.dismiss(loadId);
      toast.error("Something wrong while fetching forms");
      console.log(error);
    }
  };
  useEffect(() => {
    if (id) {
      fetchAnswersList();
    }
  }, [id]);

  const handleChange = (e, id, field) => {
    setAnswersList((prev) => ({
      ...prev,
      answers: prev.answers.map((ans) =>
        ans._id === id ? { ...ans, [field]: e.target.value } : ans
      ),
    }));
  };

  const handleSubmit = async () => {
    if (!id) {
      return toast.error("There is not form id");
    }
    const payload = { answers: [...answersList.answers] };
    const loadId = toast.loading("updating...");
    try {
      const res = await updateForm(id, payload);
      toast.dismiss(loadId);
      toast.success("Updated successfully");
      fetchAnswersList();
    } catch (error) {
      toast.dismiss(loadId);
      toast.error("Something wrong to update answer");
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-center">
        <h1 className="text-center mt-4 text-xl">Edit Answers</h1>
      </div>
      <div className=" py-3 w-9/12 mx-auto">
        {answersList?.answers?.length > 0 && (
          <div className="w-[85%] mx-auto border-2 p-2 mb-2">
            <div>
              {answersList?.answers?.map((singleAns) => (
                <div
                  key={singleAns._id}
                  className="border-2 p-2 mb-2 flex flex-col gap-2"
                >
                  <div>
                    <label className="block">Question:</label>
                    <input
                      className="w-full p-1"
                      name={`${singleAns._id}-question`}
                      value={singleAns.question}
                      disabled
                      onChange={(e) =>
                        handleChange(e, singleAns._id, "question")
                      }
                    />
                  </div>
                  <div>
                    <label className="block">Answer:</label>
                    <input
                      className="w-full p-1"
                      name={`${singleAns._id}-answer`}
                      value={singleAns.answer}
                      onChange={(e) => handleChange(e, singleAns._id, "answer")}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div>
              <button
                onClick={handleSubmit}
                className="bg-primary px-3 py-2 text-white rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditAnswer;
