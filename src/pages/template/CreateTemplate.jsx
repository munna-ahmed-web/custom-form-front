import { useEffect, useState } from "react";
import { questionType, templateAccessTypes } from "../../data/data";
import { uploadImageToCloudinary } from "../../api/imageRequest";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  createTemplate,
  getTemplateById,
  updateTemplate,
} from "../../api/templateRequest";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { topics } from "../../data/topic";
const initialQuestion = {
  type: "",
  question: "",
  isActive: "",
};

const initialTempState = {
  userId: "",
  title: "",
  description: "",
  imageUrl: "",
  isPublic: true,
  questions: [],
  topic: [],
};
const CreateTemplate = () => {
  const user = useSelector((state) => state.userInfo);
  const [templateState, setTemplateState] = useState(initialTempState);
  const [image, setImage] = useState("");
  const [questionList, setQuestionList] = useState([initialQuestion]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const { id } = useParams();

  const handleAddQuestion = () => {
    const lastQs = questionList[questionList.length - 1];
    if (questionList.length >= 8) {
      toast.error("You can not add more than 8");
    } else {
      if (lastQs.question && lastQs.isActive) {
        setQuestionList((prev) => {
          return [...prev, initialQuestion];
        });
      } else {
        toast.error("Please fill up last question");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTemplateState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSelectChange = (selectedValues) => {
    setSelectedTopics(selectedValues);
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (image) {
      const url = await uploadImageToCloudinary(image);
      setTemplateState((prev) => {
        return {
          ...prev,
          imageUrl: url,
        };
      });
    }
  };

  const handleQuestionChange = (e) => {
    const serial = e.target.getAttribute("data-serial");
    setQuestionList((prev) => {
      // Create a new array by spreading the old one
      const updatedQuestions = [...prev];
      // Update the specific question at the 'serial' index
      updatedQuestions[serial] = {
        ...updatedQuestions[serial], // Spread the current question object
        [e.target.name]: e.target.value, // Update the specific field
      };
      return updatedQuestions;
    });
  };

  const handleSubmit = async () => {
    const topicsPayload = selectedTopics.map((item) => item.value);
    const payload = {
      ...templateState,
      questions: questionList,
      userId: user.id,
      topic: [...topicsPayload],
    };

    const patchPayload = {
      ...templateState,
      questions: questionList,
    };

    if (!payload.userId) {
      return toast.error("You are not a valid user");
    }
    const loadId = toast.loading("loading...");
    try {
      if (id) {
        await updateTemplate(id, patchPayload);
      } else {
        await createTemplate(payload);
      }
      toast.dismiss(loadId);
      toast.success("Success");
      setSelectedTopics([]);
      setTemplateState(initialTempState);
      setQuestionList([initialQuestion]);
    } catch (error) {
      toast.dismiss(loadId);
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const { data } = await getTemplateById(id);
        const questionsValue = data.questions;
        setTemplateState((prev) => {
          return {
            ...prev,
            title: data.title || prev.title,
            description: data.description || prev.description,
            userId: data.userId || prev.userId,
            imageUrl: data.imageUrl || prev.imageUrl,
            isPublic: data.isPublic ?? prev.isPublic,
          };
        });
        setQuestionList((prev) => {
          return questionsValue ? questionsValue : prev;
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      fetchTemplate();
    }
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="flex justify-center">
        <h1 className="text-center mt-4 text-xl">Template Creation</h1>
      </div>

      <div className="flex gap-x-3 py-3 w-9/12 mx-auto ">
        <div className="w-[70%] mx-auto">
          <div>
            <label className="block p-1">Title</label>
            <input
              type="text"
              name="title"
              value={templateState.title}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />
          </div>
          <div>
            <label className="block p-1">Description</label>
            <textarea
              rows={4}
              name="description"
              value={templateState.description}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            ></textarea>
          </div>
          {!id && (
            <div>
              <label className="block p-1">Topic</label>
              <Select
                isMulti
                name="colors"
                options={topics}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleSelectChange}
                value={selectedTopics}
              />
            </div>
          )}

          <div className="mb-5">
            <label className="block p-1">Image</label>
            <input
              name="image"
              type="file"
              onChange={handleImage}
              className="border p-2 rounded"
            ></input>
            <button
              className="px-3 py-2 bg-gray-500 rounded-md text-white ml-3 hover:bg-gray-400"
              onClick={uploadImage}
            >
              Upload
            </button>
          </div>
          <div>
            <h3>Questions</h3>
            <hr className="mb-3" />
            <div>
              {questionList?.map((item, idx) => {
                return (
                  <div className="border-2 mb-3 p-3" key={idx + 1}>
                    <div>
                      <label className="block p-1">Accessibility:</label>
                      <select
                        data-serial={idx}
                        name="isActive"
                        className="border w-full p-2 rounded"
                        onChange={handleQuestionChange}
                      >
                        <option value="">Select an option</option>
                        {templateAccessTypes.map((item, idx) => {
                          return (
                            <option key={idx} value={item.value}>
                              {item.label}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div>
                      <label className="block p-1">Select Question Type:</label>
                      <select
                        data-serial={idx}
                        name="type"
                        className="border w-full p-2 rounded"
                        onChange={handleQuestionChange}
                      >
                        <option value="">Select an option</option>
                        {questionType.map((item) => {
                          return (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div>
                      <label className="block p-1">Question Title</label>
                      <input
                        data-serial={idx}
                        onChange={handleQuestionChange}
                        type="text"
                        name="question"
                        value={item.question}
                        className="border w-full p-2 rounded"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <button
              className="bg-gray-500 px-3 py-2 rounded-md text-white hover:bg-gray-400 mr-3"
              onClick={handleAddQuestion}
            >
              Add Question
            </button>
            <button
              className="bg-primary px-3 py-2 rounded-md text-white hover:bg-[#39339e]"
              onClick={handleSubmit}
            >
              {id ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTemplate;
